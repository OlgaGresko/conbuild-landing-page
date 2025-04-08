const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  on: {
    slideChange: function () {
      updateCentralSlide(this);
    },
  },
});

function updateCentralSlide(swiperInstance) {
    const slides = swiperInstance.slides;
  
    slides.forEach((slide, index) => {
      const img = slide.querySelector('.slide-img');
      const text = slide.querySelector('.slide-text');
      
      img.classList.remove('slide-visible');
      text.classList.remove('slide-visible');
      slide.classList.remove('swiper-slide-gradient');
  
      if (index === swiperInstance.activeIndex) {
        img.classList.add('slide-visible');
        text.classList.add('slide-visible');
        slide.classList.add('swiper-slide-gradient');
      }
    });
  }