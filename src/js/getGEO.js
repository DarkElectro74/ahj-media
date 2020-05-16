/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
function callPopup(message, popup) {
  const title = 'Что-то пошло не так';
  popup.showPopup('get', title, message);
}

export default function getGEO(popup) {
  console.log('getGeo');
  const popupInput = document.querySelector('.popup-input');
  const popupCancel = document.querySelector('.popup-cancel');
  const popupOk = document.querySelector('.popup-ok');

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        resolve(`${latitude}, ${longitude}`);
      }, (error) => {
        const message = 'К сожалению, нам не удалось определить ваше местоположение. Пожалуйста, дайте разрешение на использование геолакации, либо введите координаты вручную. Введите широту и долготу через запятую. Например: 183.12345, 80.54321.';
        callPopup(message, popup);
        popupOk.addEventListener('click', () => {
          console.log('Invalid GEO', error);
          if (popup.validate()) {
            resolve(popupInput.value);
          }
        });
        popupCancel.addEventListener('click', () => {
          reject('cancel');
        });
      });
    } else {
      const message = 'Браузер не поддерживает автоопределение геолокации. Введите широту и долготу через запятую. Например: 183.12345, 80.54321.';
      callPopup(message, popup);

      popupOk.addEventListener('click', () => {
        console.log('Invalid GEO');
        if (popup.validate()) {
          resolve(popupInput.value);
        }
      });
      popupCancel.addEventListener('click', () => {
        reject('cancel');
      });
    }
  });
}