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

function formatTextWithParagraphs(text) {
  return text
    .split('\n\n')
    .map(p => `<p>${p}</p>`)
    .join('');
}

const servicesListContainer = document.querySelector('.modal-services-list');
const serviceTemplate = document.getElementById('modal-services-template');
let allServices = [];

function renderFullServiceModal(service) {
  const modal = document.querySelector('#modal2');
  const formattedText = formatTextWithParagraphs(service.text);

  modal.querySelector('.full-service-title').textContent = service.title;
  modal.querySelector('.full-service-description').textContent = service.description;
  modal.querySelector('.full-service-img').src = service.image;
  modal.querySelector('.full-service-text').innerHTML = formattedText;
  modal.classList.add('show');
  document.body.classList.add('no-scroll');
}

document.querySelectorAll('.swiper-slide').forEach(slide => {
  slide.addEventListener('click', () => {
    const id = slide.dataset.serviceId;
    const service = allServices.find(s => s.id === id);
    if (service) renderFullServiceModal(service);
  });
});

function renderListServices(services) {
  services.forEach(service => {
    const clone = serviceTemplate.cloneNode(true);
    clone.removeAttribute('id');
    clone.style.display = '';

    clone.querySelector('.modal-services-title').textContent = service.title;
    clone.querySelector('.modal-services-descr').textContent = service.description;
    clone.querySelector('.modal-services-img').src = service.image;

    clone.dataset.serviceId = service.id;

    servicesListContainer.appendChild(clone);
    serviceTemplate.remove();
  });
}

fetch('./assets/data/services.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Can not fetch data');
    }
    return response.json();
  })
  .then(data => {
    allServices = data;
    renderListServices(allServices);
  })
  .catch(error => {
    console.error('Error loading articles:', error);
  });

function closeAllModals() {
  const openModals = document.querySelectorAll('.modal.show');
  openModals.forEach(modal => modal.classList.remove('show'));

  if (openModals.length > 0) {
    document.body.classList.remove('no-scroll');
  }
}

document.addEventListener('click', function (event) {
  const target = event.target.closest('[data-modal-target]');
  if (!target) return;

  closeAllModals();

  const modalSelector = target.dataset.modalTarget;
  const modalToOpen = document.querySelector(modalSelector);

  if (modalToOpen) {
    modalToOpen.classList.add('show');
    document.body.classList.add('no-scroll');

    const serviceId = target.dataset.serviceId;
    if (modalSelector === '#modal2' && serviceId) {
      const service = allServices.find(s => s.id === serviceId);
      if (service) renderFullServiceModal(service);
    }
  }
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

// BLOG

const mainTemplate = document.getElementById('main-article-template');
const articleTemplate = document.getElementById('article-template');
const mainContainer = document.querySelector('.blog-container');
const listContainer = document.querySelector('.blog-list');
const readMoreBtn = document.getElementById('read-more-btn');

let allArticles = [];
let currentIndex = 4;

function formatDate(dateString) {
  return dateString.replaceAll('/', ' ');
}

function renderModalContent(article) {
  const modal = document.querySelector('#modal5');
  const rawText = article.text;
  const formattedHTML = formatTextWithParagraphs(rawText);
  modal.querySelector('.modal-blog-article-date').textContent = formatDate(article.date);
  modal.querySelector('.blog-author').textContent = `By ${article.author}`;
  modal.querySelector('.blog-theme').textContent = article.category;
  modal.querySelector('.blog-article-title').textContent = article.title;
  modal.querySelector('.modal-blog-article-paragraph').textContent = article.excerpt;
  modal.querySelector('.blog-article-text').innerHTML = formattedHTML;
  modal.querySelector('.modal-blog-article-pic').src = article.coverImage;
  modal.classList.add('show');
  document.body.classList.add('no-scroll');
}

function renderMainArticle(article) {
  const clone = mainTemplate.cloneNode(true);
  clone.removeAttribute('id');
  clone.style.display = '';

  clone.querySelector('.blog-main-article-date').textContent = formatDate(article.date);
  clone.querySelector('.blog-author').textContent = `By ${article.author}`;
  clone.querySelector('.blog-theme').textContent = article.category;
  clone.querySelector('.blog-main-article-title').textContent = article.title;
  clone.querySelector('.blog-main-article-paragraph').textContent = article.excerpt;
  clone.querySelector('.blog-main-article-pic').src = article.coverImage;

  const modalButton = clone.querySelector('[data-modal-target]');
  if (modalButton) {
    modalButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const selected = allArticles.find(item => item.id === article.id);
      if (selected) renderModalContent(selected);
    });
  }

  mainTemplate.after(clone);
}

function renderListArticles(articles) {
  articles.forEach(article => {
    const clone = articleTemplate.cloneNode(true);
    clone.removeAttribute('id');
    clone.style.display = '';

    clone.querySelector('.blog-article-date').textContent = formatDate(article.date);
    clone.querySelector('.blog-author').textContent = `By ${article.author}`;
    clone.querySelector('.blog-theme').textContent = article.category;
    clone.querySelector('.blog-article-title').textContent = article.title;
    clone.querySelector('.blog-article-pic').src = article.coverImage;

    clone.dataset.articleId = article.id;

    clone.addEventListener('click', () => {
      const selected = allArticles.find(item => item.id === article.id);
      if (selected) renderModalContent(selected);
    });

    listContainer.appendChild(clone);
  });
}

function loadNextArticles() {
  const nextArticles = allArticles.slice(currentIndex, currentIndex + 3);
  renderListArticles(nextArticles);
  currentIndex += 3;

  if (currentIndex >= allArticles.length) {
    mainTemplate.remove();
    articleTemplate.remove();
    readMoreBtn.remove();
  }
}

fetch('./assets/data/blog-posts.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Can not fetch data');
    }
    return response.json();
  })
  .then(data => {
    allArticles = data;
    renderMainArticle(allArticles[0]);
    renderListArticles(allArticles.slice(1, 4));

    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', loadNextArticles);
    }
  })
  .catch(error => {
    console.error('Error loading articles:', error);
  });

// FOOTER

const form = document.querySelector('.sign-up-form');
const input = document.querySelector('.sign-up-input');
const button = document.querySelector('.sign-up-button');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (input.checkValidity()) {
    const modal = document.querySelector(button.dataset.modalTargetOnSubmit);

    if (modal) {
      modal.classList.add('show');
      document.body.classList.add('no-scroll');
    }

    input.value = '';
  } else {
    input.reportValidity();
  }
});

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.classList.remove('no-scroll');
    }
  });
});