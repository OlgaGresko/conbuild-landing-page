// HERO

const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  const scrollPos = window.scrollY + window.innerHeight / 2;

  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll);

// SERVICES

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

// ABOUT

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

// STATUS

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

// PROJECTS

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
    const button = slide.querySelector(".projects-item-button");

    if (content && button) {
      slide.addEventListener("mouseenter", () => {
        content.classList.remove("hidden");
      });

      slide.addEventListener("mouseleave", () => {
        content.classList.add("hidden");
        button.classList.remove("clicked");
      });

      slide.addEventListener("mousedown", () => {
        button.classList.add("clicked");
      });

      slide.addEventListener("mouseup", () => {
        button.classList.remove("clicked");
      });

      slide.addEventListener("mouseleave", () => {
        button.classList.remove("clicked");
      });
    }
  });
}

// PROCESS

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

// TESTIMONIALS

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

// TEAM

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

// PRICING

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

// FOOTER

const form = document.querySelector('.sigh-up-form');
  const input = document.querySelector('.sign-up-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = input.value;

    input.value = '';
  });