/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import getGEO from './getGEO';

const recorderBlock = document.querySelector('.recorder-block');
const inputText = document.querySelector('#input-text');
let GEOtag = null;
const cashedMessages = [];

export default class MessageGEO {
  async addGEO(popupMessage, popup) {
    this.popup = document.querySelector('.popup');
    this.popupInput = document.querySelector('.popup-input');
    this.popupCancel = document.querySelector('.popup-cancel');
    if (!GEOtag) {
      try {
        GEOtag = await getGEO(popup);
        this.addMessage(popupMessage, GEOtag);

        this.elPopup.classList.add('hidden');
        this.popupInput.classList.add('hidden');
        this.popupCancel.classList.add('hidden');
      } catch (e) {
        console.log('error with GEO', e);
      }
    } else {
      this.addMessage(popupMessage, GEOtag);
    }
  }

  addMessage(fullMessage, tag) {
    const newDate = this.printData(new Date());
    const messageGEO = document.createElement('div');
    messageGEO.className = 'message';
    messageGEO.innerHTML = `
    <div class="message-tag">${fullMessage}
      <div class="geo-tag">${tag}</div>
    </div>
    <div class="data">${newDate}</div>
    `;
    recorderBlock.prepend(messageGEO);
    inputText.value = '';

    cashedMessages.push({ message: fullMessage, geo: tag, data: newDate });
    localStorage.setItem('history', JSON.stringify(cashedMessages));
  }

  addNullToDate(value) {
    const newValue = value < 10 ? `0${value}` : value;
    return newValue;
  }

  printData(valueDate) {
    const newDate = new Date(valueDate);
    const date = this.addNullToDate(newDate.getDate());
    const month = this.addNullToDate(newDate.getMonth() + 1);
    const year = this.addNullToDate(newDate.getFullYear());
    const hours = this.addNullToDate(newDate.getHours());
    const minutes = this.addNullToDate(newDate.getMinutes());
    const shownDate = `${date}.${month}.${year} ${hours}:${minutes}`;
    return shownDate;
  }

  loadMessage(message, geo, data) {
    const messageGEO = document.createElement('div');
    messageGEO.className = 'message';
    messageGEO.innerHTML = `
    <div class="message-tag">
    ${message}
    <div class="geo-tag">${geo}</div>
    </div>
    <div class="data">${data}</div>
    `;
    recorderBlock.prepend(messageGEO);
    inputText.value = '';

    cashedMessages.push({ message, geo, data });
  }
}