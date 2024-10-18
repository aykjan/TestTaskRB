const sliderModule = (() => {
    let slider;
    let dotsContainer;
    let dots;
    let slides;
    let currentSlideIndex = 0;
    const totalSlides = 2; // Устанавливаем количество слайдов (2)
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
  
    const init = () => {
      slider = document.querySelector('.products-slider__container');
      dotsContainer = document.querySelector('.slider-dots');
      slides = document.querySelectorAll('.product-card--slider');
  
      // Создание дотов
      createDots(totalSlides);
      updateActiveDot(0);
      updateSlideOpacity();
  
      // Добавляем события для свайпа
      slider.addEventListener('touchstart', touchStart);
      slider.addEventListener('touchend', touchEnd);
      slider.addEventListener('touchmove', touchMove);
    };
  
    const createDots = (total) => {
      dotsContainer.innerHTML = ''; // Очищаем доты перед созданием новых
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active'); // Активная первая точка
        dotsContainer.appendChild(dot);
      }
      dots = document.querySelectorAll('.slider-dot');
    };
  
    const updateActiveDot = (index) => {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    };
  
    const updateSlideOpacity = () => {
      slides.forEach((slide, index) => {
        if (index === currentSlideIndex) {
          slide.classList.remove('inactive');
        } else {
          slide.classList.add('inactive');
        }
      });
    };
  
    const touchStart = (event) => {
      isDragging = true;
      startPosition = event.touches[0].clientX;
      slider.style.transition = 'none'; // Отключаем анимацию
    };
  
    const touchEnd = () => {
      isDragging = false;
      slider.style.transition = 'transform 0.3s ease-out'; // Включаем анимацию
  
      const movedBy = currentTranslate - prevTranslate;
  
      if (movedBy < -50 && currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
      } else if (movedBy > 50 && currentSlideIndex > 0) {
        currentSlideIndex--;
      }
  
      updateActiveDot(currentSlideIndex);
      updateSlideOpacity(); // Обновляем эффект прозрачности
      setSliderPositionByIndex();
    };
  
    const touchMove = (event) => {
      if (isDragging) {
        const currentPosition = event.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPosition;
        slider.style.transform = `translateX(${currentTranslate}px)`;
      }
    };
  
    const setSliderPositionByIndex = () => {
      currentTranslate = currentSlideIndex * -slider.offsetWidth;
      prevTranslate = currentTranslate;
      slider.style.transform = `translateX(${currentTranslate}px)`;
    };
  
    return {
      init,
    };
  })();
  
  export default sliderModule;
  