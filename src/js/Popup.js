import validateGEO from './validateGEO';

export default class Popup {
  init() {
    this.popup = document.createElement('div');
    this.popup.className = 'popup hidden';
    this.popup.innerHTML = `
    <p class="popup-header"></p>
    <p class="popup-message"></p>
    <input type"text" class="popup-input hidden">
    <div class="popup-buttons">
      <div class="popup-ok button">Ok</div>
      <div class="popup-cancel button hidden">Отмена</div>
    </div>
    `;
    document.body.appendChild(this.popup);

    this.popupHeader = document.querySelector('.popup-header');
    this.popupMessage = document.querySelector('.popup-message');
    this.popupInput = document.querySelector('.popup-input');
    this.buttonCancel = document.querySelector('.popup-cancel');
  }

  showPopup(type, header, message) {
    this.popup.classList.remove('hidden');
    this.popupHeader.innerText = header;
    this.popupMessage.innerText = message;
    if (type === 'get') {
      this.popupInput.classList.remove('hidden');
      this.buttonCancel.classList.remove('hidden');
    }
  }

  validate() {
    if (validateGEO(this.popupInput.value)) {
      this.popup.classList.add('hidden');
      return true;
    }
    this.popupInput.classList.add('validate');
    this.popup.classList.remove('hidden');
    return false;
  }
}