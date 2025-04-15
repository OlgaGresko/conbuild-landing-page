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
    nextEl: ".swiper-button-next.swiper-second",
    prevEl: ".swiper-button-prev.swiper-second",
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
    const img = slide.querySelector(".slide-img");
    const text = slide.querySelector(".slide-text");

    img.classList.remove("slide-visible");
    text.classList.remove("slide-visible");
    slide.classList.remove("swiper-slide-gradient");

    if (index === swiperInstance.activeIndex) {
      img.classList.add("slide-visible");
      text.classList.add("slide-visible");
      slide.classList.add("swiper-slide-gradient");
    }
  });
}

function updateCentralSlide2(swiperInstance) {
  const slides = swiperInstance.slides;

  slides.forEach((slide, index) => {
    const text = slide.querySelector(".about-swiper-content");

    text.classList.remove("points-visible");

    if (index === swiperInstance.activeIndex + 1) {
      text.classList.add("points-visible");
    }
  });
}

const counters = document.querySelectorAll(".status-value");
const speed = 200;

const animateCounter = (counter) => {
  const animate = () => {
    const value = +counter.getAttribute("value");
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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  observer.observe(counter);
});

const swiper3 = new Swiper(".swiper-3", {
  spaceBetween: 24,
  loop: true,
  slidesPerView: 3,
  slidesPerGroup: 1,
  simulateTouch: false,
  navigation: {
    nextEl: ".swiper-button-next.projects-button",
    prevEl: ".swiper-button-prev.projects-button",
  },
  on: {
    slideChange: function () {
      updateHoverSlide(this);
    },
  },
});

function updateHoverSlide(swiper) {
  const slides = swiper.slides;

  slides.forEach((slide) => {
    const content = slide.querySelector(".projects-item-content");

    if (content) {
      slide.addEventListener("mouseenter", () => {
        content.classList.remove("hidden");
      });

      slide.addEventListener("mouseleave", () => {
        content.classList.add("hidden");
      });
    }
  });
}

const tabs = document.querySelectorAll(".process-button");
const iframe = document.getElementById("video-frame");
const playButton = document.querySelector(".custom-play-button");

let selectedVideoId = "HdW1-guocPA";

function setVideo(videoId) {
  selectedVideoId = videoId;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&enablejsapi=1`;
  playButton.style.display = "block";
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("process-active"));
    tab.classList.add("process-active");

    const videoId = tab.dataset.video;
    setVideo(videoId);
  });
});

playButton.addEventListener("click", () => {
  playButton.style.display = "none";

  iframe.src = `https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&enablejsapi=1`;
});

const photos = document.querySelectorAll(".testimonials-photo");
const reviews = document.querySelectorAll(".testimonials-review");
const names = document.querySelectorAll(".testimonials-name");
const roles = document.querySelectorAll(".testimonials-role");

photos.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    photos.forEach((p) => p.classList.remove("active"));
    reviews.forEach((r) => r.classList.remove("active"));
    names.forEach((n) => n.classList.remove("active"));
    roles.forEach((r) => r.classList.remove("active"));

    photo.classList.add("active");
    reviews[index].classList.add("active");
    names[index].classList.add("active");
    roles[index].classList.add("active");
  });
});

const teamPhotos = document.querySelectorAll(".team-image");
const teamNames = document.querySelectorAll(".team-member-name");

teamNames.forEach((teamName, index) => {
  teamName.addEventListener("click", () => {
    teamPhotos.forEach((p) => p.classList.remove("active"));
    teamNames.forEach((n) => n.classList.remove("active"));

    teamName.classList.add("active");
    teamPhotos[index].classList.add("active");
  });
});

const pricingItems = document.querySelectorAll(".pricing-item");

pricingItems.forEach((item) => {
  const button = item.querySelector(".pricing-button");
  const rectangle = item.querySelector(".pricing-rectangle");

  button.addEventListener("mouseenter", () => {
    rectangle.style.fill = "var(--accent)";
  });

  button.addEventListener("mouseleave", () => {
    rectangle.style.fill = "";
  });
});

const form = document.querySelector('.sigh-up-form');
  const input = document.querySelector('.sign-up-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = input.value;

    input.value = '';
  });