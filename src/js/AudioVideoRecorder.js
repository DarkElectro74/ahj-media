/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable padded-blocks */

import MessageGEO from './MessageGEO';

const messageGEO = new MessageGEO();
const popupInput = document.querySelector('#popup-input');

export default class AudioVideoRecorder {
  constructor(popup) {
    this.popup = popup;
  }

  init() {
    this.audio = document.querySelector('#audio');
    this.video = document.querySelector('#video');
    this.play = document.querySelector('#play');
    this.stop = document.querySelector('#stop');
    this.messageTimer = document.querySelector('#timer');
    this.recordStart = document.querySelector('.record-start');
    this.recordStop = document.querySelector('.record-stop');

    this.audio.addEventListener('click', () => {
      this.recordAudio();
    });

    this.video.addEventListener('click', () => {
      this.recordAudio(true);
    });
  }

  async recordAudio(recordVideo = false) {
    try {
      let stopSaved = true;
      let timerMM = 0;
      let timers = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: recordVideo,
      });

      if (recordVideo) {
        const videoREC = document.createElement('video');
        videoREC.controls = true;
        videoREC.muted = 'muted';
        videoREC.className = 'video';
        document.body.appendChild(videoREC);
        videoREC.srcObject = stream;
        videoREC.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.start();

      mediaRecorder.addEventListener('start', () => {
        timers = setInterval(() => {
          console.log('Timer count');
          this.messageTimer.innerText = this.timer((timerMM += 1));
        }, 1000);
        console.log('Record start');
      });

      mediaRecorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', async () => {
        clearInterval(timers);
        this.messageTimer.innerText = '00:00';
        if (stopSaved) {
          let mediaREC = 'audio';
          if (recordVideo) {
            mediaREC = 'video';
          }
          const media = document.createElement(mediaREC);
          console.log('Record stop');
          const blob = new Blob(chunks, { type: `${mediaREC}/mp4` });
          const fileReader = new FileReader();
          fileReader.readAsDataURL(blob);

          fileReader.onload = () => {
            media.src = fileReader.result;
            media.controls = true;
            messageGEO.addGEO(media.outerHTML, this.popup);
          };
        }
        if (recordVideo) {
          document.body.removeChild(document.querySelector('.video'));
        }
        this.recordStart.classList.remove('hidden');
        this.recordStop.classList.add('hidden');
      });

      this.play.addEventListener('click', () => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        stopSaved = true;
      });

      this.stop.addEventListener('click', () => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        stopSaved = false;
      });

    } catch (e) {
      const title = 'Что-то пошло не так';
      const message = 'Браузеру необходимо разрешение для записи звука / видео. Очистите кэш для повторения запроса браузером: Ctrl + R.';
      this.popup.showPopup('', title, message);
      popupInput.classList.add('hidden');
      this.recordStart.classList.remove('hidden');
      this.recordStop.classList.add('hidden');
    }

    this.recordStart.classList.add('hidden');
    this.recordStop.classList.remove('hidden');
  }

  timer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = seconds - minutes * 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      second < 10 ? `0${second}` : second
    }`;
  }
}