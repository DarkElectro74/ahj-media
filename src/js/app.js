/* eslint-disable no-console */
import Popup from './Popup';
import AudioVideoRecorder from './AudioVideoRecorder';
import MessageGEO from './MessageGEO';

const popup = new Popup();
popup.init();

const audioVideoRecorder = new AudioVideoRecorder(popup);
audioVideoRecorder.init();

const messageGEO = new MessageGEO();
const popupMessage = document.querySelector('.popup');
const popupInput = document.querySelector('.popup-input');
const popupCancel = document.querySelector('.popup-cancel');
const popupOk = document.querySelector('.popup-ok');

popupCancel.addEventListener('click', () => {
  popupMessage.classList.add('hidden');
  return false;
});

popupOk.addEventListener('click', () => {
  if (popupInput.classList.contains('hidden')) {
    popupMessage.classList.add('hidden');
  }
});

const inputText = document.querySelector('#input-text');

inputText.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    console.log(inputText.value);
    messageGEO.addGEO(`<p>${inputText.value}</p>`, popup);
  }
});

try {
  const loadStorage = JSON.parse(localStorage.history);
  for (const item of loadStorage) {
    messageGEO.loadMessage(item.message, item.geo, item.data);
  }
} catch (e) {
  console.log('error on Localstorage', e);
}