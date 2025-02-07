// filepath: /Kray/Kray/js/components/slider.js

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const videos = document.querySelectorAll(".video");
const playIcons = document.querySelectorAll(".play-icon");

let currentIndex = 0;
const totalSlides = slides.length;

const slideWidth = slides[0].offsetWidth + 20;
const initialOffset = window.innerWidth > 1400 ? (track.offsetWidth * 0.29) : 0;
let visibleslides = window.innerWidth < 768 ? 1 : 3;

// Устанавливаем начальное смещение трека
gsap.set(track, { x: initialOffset });

// Функция для обновления классов кнопок
const updateButtonState = () => {
  if (currentIndex === 0) {
    prevButton.classList.add("not-active");
  } else {
    prevButton.classList.remove("not-active");
  }

  if (currentIndex === totalSlides - visibleslides) {
    nextButton.classList.add("not-active");
  } else {
    nextButton.classList.remove("not-active");
  }
};

// Функция для перехода между слайдами
const moveSlider = (direction) => {
  currentIndex += direction;
  updateButtonState();

  gsap.to(track, {
    duration: 0.5,
    x: initialOffset - currentIndex * slideWidth,
    ease: "power2.out",
  });
};

// Обработчики кнопок
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) moveSlider(-1);
});
nextButton.addEventListener("click", () => {
  if (currentIndex < totalSlides - visibleslides) moveSlider(1);
});

// Первоначальная установка классов на кнопки
updateButtonState(); 

// Логика для каждого видео
slides.forEach((slide, index) => {
  const video = slide.querySelector(".video");
  const playIcon = slide.querySelector(".play-icon");

  slide.addEventListener("mouseenter", (e) => {
    const rect = slide.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(playIcon, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
    });
  });

  slide.addEventListener("mousemove", (e) => {
    const rect = slide.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(playIcon, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  slide.addEventListener("mouseleave", () => {
    gsap.to(playIcon, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  video.addEventListener("click", () => {
    videos.forEach((v, i) => {
      if (v !== video) {
        v.pause();
        playIcons[i].classList.remove("hidden");
      }
    });

    if (video.paused) {
      video.play();
      playIcon.classList.add("hidden");
    } else {
      video.pause();
      playIcon.classList.remove("hidden");
    }
  });

  video.addEventListener("ended", () => {
    playIcon.classList.remove("hidden");
  });
});

export { moveSlider, updateButtonState };