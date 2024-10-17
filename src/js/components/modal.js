const Modal = (() => {
    const modal = document.getElementById('modalForm');
    const closeButton = modal.querySelector('.modal__close');
  
    
    const open = () => {
      modal.classList.add('modal--open');
      document.body.style.overflow = 'hidden'; 
    };
  
    const close = () => {
      modal.classList.remove('modal--open');
      document.body.style.overflow = ''; 
    };
  
    
    const addEventListeners = () => {
      closeButton.addEventListener('click', close);
      
    };
  
    
    const init = () => {
      addEventListeners();
    };
  
    return {
      open,
      close,
      init
    };
  })();
  
  export default Modal;
  