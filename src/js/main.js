import initVideoPlayer from './components/videoPlayer.js';
import Modal from './components/modal.js';
import sliderModule from './components/sliderModule.js';

// Инициализация видео-плеера
initVideoPlayer('https://www.youtube.com/embed/zyI3hAXTgFc?si=ZgoRmTSLAEuJzWnw');

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация модального окна
    Modal.init();

    // Ловим клик на кнопки "Оставить заявку"
    const buttons = document.querySelectorAll('.button--wide, .button--standart');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        Modal.open(); // Открываем модальное окно при клике
      });
    });

    sliderModule.init();
});
