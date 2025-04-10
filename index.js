const swiper = new Swiper(".swiper-1", {
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

const swiper2 = new Swiper(".swiper-2", {
  spaceBetween: 24,
  loop: true,
  slidesPerView: 3,
  slidesPerGroup: 1,
  simulateTouch: false,
  navigation: {
    nextEl: '.swiper-button-next.swiper-second',
    prevEl: '.swiper-button-prev.swiper-second',
  },
  on: {
    slideChange: function () {
      updateCentralSlide2(this);
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

  function updateCentralSlide2(swiperInstance) {
    const slides = swiperInstance.slides;
  
    slides.forEach((slide, index) => {
      const text = slide.querySelector('.about-swiper-content');
      
      text.classList.remove('points-visible');
  
      if (index === (swiperInstance.activeIndex + 1)) {
        text.classList.add('points-visible');
      }
    });
  }

const counters = document.querySelectorAll('.status-value');
const speed = 200;

const animateCounter = (counter) => {
  const animate = () => {
      const value = +counter.getAttribute('value');
      let data = +counter.innerText;

      const increment = value / speed;

      if (data < value) {
          data += increment;
          counter.innerText = Math.min(Math.ceil(data), value);
          requestAnimationFrame(animate);
      } else {
          counter.innerText = value;
      }
  };

  animate();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
      }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});

const swiper3 = new Swiper(".swiper-3", {
  spaceBetween: 24,
  loop: true,
  slidesPerView: 3,
  slidesPerGroup: 1,
  simulateTouch: false,
  navigation: {
    nextEl: '.swiper-button-next.projects-button',
    prevEl: '.swiper-button-prev.projects-button',
  },
  on: {
    slideChange: function () {
      updateHoverSlide(this);
    },
  },
});

function updateHoverSlide(swiper) {
  const slides = swiper.slides;
  
  slides.forEach(slide => {
    const content = slide.querySelector('.projects-item-content');
    
    if (content) {
      slide.addEventListener('mouseenter', () => {
        content.classList.remove('hidden');
      });
      
      slide.addEventListener('mouseleave', () => {
        content.classList.add('hidden');
      });
    }
  });
}