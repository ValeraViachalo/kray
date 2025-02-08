gsap.registerPlugin(ScrollTrigger);

const videoBlock = document.querySelector(".video-block");
const video = document.querySelector(".video");
const playIcon = document.querySelector(".play-icon");

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Анимация ширины и масштаба видео при скролле
gsap.fromTo(
  video,
  {
    width: "872px",
    scale: 1,
  },
  {
    width: "100%",
    height: "713px",
    scale: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".video-block",
      start: "top center",
      end: "top top",
      scrub: 1,
    },
  }
);

if (typeof videoBlock != "undefined" && videoBlock != null) {
  videoBlock.addEventListener("mouseenter", (e) => {
    const rect = videoBlock.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Устанавливаем иконку на начальную позицию курсора
    gsap.set(playIcon, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
    });
  });

  videoBlock.addEventListener("mousemove", (e) => {
    const rect = videoBlock.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Двигаем иконку к курсору с небольшой задержкой
    gsap.to(playIcon, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  videoBlock.addEventListener("mouseleave", () => {
    // Возвращаем иконку в центр блока при уходе курсора
    gsap.to(playIcon, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
}

if (typeof video != "undefined" && video != null) {
  // Логика воспроизведения видео и скрытия/показа иконки
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playIcon.classList.add("hidden");
    } else {
      video.pause();
      playIcon.classList.remove("hidden");
    }
  });

  // Если видео завершилось, показываем иконку "Play"
  video.addEventListener("ended", () => {
    playIcon.classList.remove("hidden");
  });
}

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const videos = document.querySelectorAll(".video");
const playIcons = document.querySelectorAll(".play-icon");

let currentIndex = 0;
var popravka = 0.29;
const totalSlides = slides.length;

if (totalSlides) {
  const slideWidth = slides[0].offsetWidth + 20;
  const initialOffset = window.innerWidth > 1400 ? track.offsetWidth * 0.29 : 0;
  var visibleslides = 3;

  if (window.innerWidth < 768) {
    visibleslides = 1;
  }
  // Устанавливаем начальное смещение трека
  gsap.set(track, { x: initialOffset });

  // Функция для обновления классов кнопок
  const updateButtonState = () => {
    // Если текущий индекс 0, добавляем класс not-active на кнопку Prev
    if (currentIndex === 0) {
      prevButton.classList.add("not-active");
    } else {
      prevButton.classList.remove("not-active");
    }

    // Если текущий индекс последний возможный, добавляем класс not-active на кнопку Next
    if (currentIndex === totalSlides - visibleslides) {
      nextButton.classList.add("not-active");
    } else {
      nextButton.classList.remove("not-active");
    }
  };

  // Функция для перехода между слайдами
  const moveSlider = (direction) => {
    currentIndex += direction;

    // Обновляем состояние кнопок
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

    // Движение иконки "Play" за курсором
    slide.addEventListener("mouseenter", (e) => {
      const rect = slide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Устанавливаем иконку на начальную позицию
      gsap.set(playIcon, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
      });
    });

    slide.addEventListener("mousemove", (e) => {
      const rect = slide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Двигаем иконку к курсору
      gsap.to(playIcon, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    slide.addEventListener("mouseleave", () => {
      // Возвращаем иконку в центр
      gsap.to(playIcon, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Логика воспроизведения видео
    video.addEventListener("click", () => {
      // Ставим остальные видео на паузу и возвращаем иконки
      videos.forEach((v, i) => {
        if (v !== video) {
          v.pause();
          playIcons[i].classList.remove("hidden");
        }
      });

      // Управляем текущим видео
      if (video.paused) {
        video.play();
        playIcon.classList.add("hidden");
      } else {
        video.pause();
        playIcon.classList.remove("hidden");
      }
    });

    // Показываем иконку, если видео завершилось
    video.addEventListener("ended", () => {
      playIcon.classList.remove("hidden");
    });
  });
}

const horizontalScroll = document.querySelector(".horizontal-scroll");
const horizontalScrollItem = gsap.utils.toArray(".horizontal-scroll .item");
if (horizontalScrollItem.length) {
  const cardWidth = horizontalScrollItem[0].offsetWidth;
  const viewportWidth = window.innerWidth;
  const containerWidth = horizontalScroll.scrollWidth;
  const parentWidth = document.querySelector(
    ".horizontal-scroll-container"
  ).offsetWidth;

  const lastCard = horizontalScrollItem[horizontalScrollItem.length - 1];
  const lastCardOffset = lastCard.offsetLeft + cardWidth / 2;

  const scrollHorEnd = lastCardOffset - viewportWidth / 2;
  const scrollEnd =
    document.querySelector(".horizontal-scroll-container").offsetHeight -
    document.querySelector(".horizontal-scroll").offsetHeight;

  gsap.to(horizontalScroll, {
    x: () => -scrollHorEnd, // Двигаем контейнер влево, пока правый край не совпадёт с экраном
    ease: "none",
    scrollTrigger: {
      trigger: ".section_11",
      start: "top top",
      end: () => `+=${scrollEnd}`, // Длина анимации по скроллу равна ширине контейнера
      pin: ".horizontal-scroll-container",
      scrub: true,
    },
  });
}

if (
  typeof document.getElementById("typed") != "undefined" &&
  document.getElementById("typed") != null
) {
  var typed = new Typed("#typed", {
    stringsElement: "#typed-strings",
    typeSpeed: 60,
    backSpeed: 30,
    startDelay: 1000,
    backDelay: 2000,

    loop: true,
    loopCount: Infinity,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("animationCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const box = document.querySelector(".back_image canvas");
  const box_par = document.querySelector(".back_image");
  const spriteFolder = "./sprite2/";
  const stopBlock = document.querySelector(".stop-block");

  const totalFrames = 190;
  let currentFrame = 0;
  let images = new Array(totalFrames);

  function preloadImages() {
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `${spriteFolder}${i + 1}.webp`;

      img.onload = () => {
        images[i] = img;
        if (i === currentFrame) drawFrame();
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${spriteFolder}${i + 1}.webp`);
      };
    }
  }

  function drawFrame() {
    if (images[currentFrame] && images[currentFrame].complete) {
      const dpr = 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height);
    }
  }

  function calculateOffsets() {
    if (window.innerWidth >= 1200 && window.innerWidth < 1400) {
      return { offset_start: -250, offset_middle: 350, offset_y_start: 150, offset_y_end: 0 };
    } else if (window.innerWidth >= 960 && window.innerWidth < 1200) {
      return { offset_start: -40, offset_middle: 500, offset_y_start: 350, offset_y_end: 0 };
    } else if (window.innerWidth >= 768 && window.innerWidth < 960) {
      return { offset_start: -150, offset_middle: 0, offset_y_start: 420, offset_y_end: 150 };
    } else if (window.innerWidth < 768) {
      return { offset_start: 0, offset_middle: -20, offset_y_start: 0, offset_y_end: -200 };
    } else {
      return { offset_start: -40, offset_middle: 400, offset_y_start: 150, offset_y_end: 0 };
    }
  }

  function updateOffsets(self, offsets) {
    let offsetX, offsetY;

    if (self.progress < 0.075) {
      offsetX = gsap.utils.mapRange(0, 0.07, offsets.offset_start, offsets.offset_middle, self.progress);
      offsetY = gsap.utils.mapRange(0, 0.07, offsets.offset_y_start, offsets.offset_y_end, self.progress);
    } else if (self.progress >= 0.66) {
      offsetX = gsap.utils.mapRange(0.66, 1, offsets.offset_middle, 0, self.progress);
    } else {
      offsetX = offsets.offset_middle;
      offsetY = offsets.offset_y_end;
    }

    gsap.to(box.parentElement, {
      x: offsetX,
      y: offsetY,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  ScrollTrigger.create({
    trigger: document.body,
    pin: box_par,
    start: "top top",
    end: () => stopBlock.offsetTop + stopBlock.clientHeight - box_par.clientHeight,
    scrub: true,
    onUpdate: (self) => {
      let frame = Math.round(self.progress * (totalFrames - 1));
      if (frame !== currentFrame) {
        currentFrame = frame;
        drawFrame();
      }

      const offsets = calculateOffsets();
      updateOffsets(self, offsets);
    },
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Animation for screens wider than 768px
    gsap.fromTo(box, {
      scale: 2,
      yPercent: 20,
      xPercent: -10,
    }, {
      scale: 1,
      yPercent: 0,
      xPercent: 0,
      scrollTrigger: {
        trigger: '.section_block.section_1',
        start: "0% 0%",
        end: "40% 0%",
        scrub: true,
      }
    });
  });

  mm.add("(max-width: 768px)", () => {
    gsap.to(box, {
      scale: .5,
      scrollTrigger: {
        trigger: '.section_block.section_6',
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    })
  });
  
  preloadImages();
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".scroll_container").forEach((container, index) => {
    let textElement = container.querySelector(".scroll_text");

    let letters = textElement.innerText
      .split("")
      .map((char) => {
        return `<span>${char === " " ? "&nbsp;" : char}</span>`;
      })
      .join("");

    textElement.innerHTML = letters;
    var spans = textElement.querySelectorAll("span");

    if (index === 0) {
      gsap.set(textElement, { marginTop: "360px" });
    }

    if (window.innerWidth >= 960 && window.innerWidth < 1200) {
      var t_start = "top center";
      var t_end = `bottom-=15% center`;
    } else if (window.innerWidth >= 768 && window.innerWidth < 960) {
      var t_start = "top center+=20%";
      var t_end = `bottom center`;
    } else if (window.innerWidth < 768) {
      var t_start = "top top+=100px";
      var t_end = `bottom bottom`;
    } else {
      var t_start = "top center";
      var t_end = `bottom-=15% center`;
    }

    gsap.to(textElement, {
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: t_start,
        end: () => t_end,
        scrub: 1,
        pin: textElement,
        pinSpacing: true,
        onUpdate: (self) => {
          if (index === 0 && self.progress > 0) {
            gsap.set(textElement, { marginTop: "-360px" });
          }
        },
      },
    });

    gsap.fromTo(
      textElement,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 100%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      textElement,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "bottom 50%", // Начинает исчезать
          end: "bottom 15%", // Полностью исчезает
          scrub: 1,
        },
      }
    );

    gsap.to(spans, {
      color: "#fff",
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: () => `bottom-=20% center`,
        scrub: 1,
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".faq_item").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("open");
    });
  });
  document.querySelectorAll(".burger").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("open");
      document.querySelector(".mobile_menu").classList.toggle("open");
    });
  });

  const block = document.querySelector(".page_footer");
  const bloctarget = document.querySelector(".page_footer .container");

  function checkScroll() {
    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const blockHeight = rect.height;
    const delayOffset = window.innerWidth < 1400 ? 300 : 150;

    if (rect.top <= windowHeight + 94 && rect.bottom >= 0) {
      let progress =
        ((windowHeight - rect.top + delayOffset) / blockHeight) * 100;
      progress = Math.max(0, Math.min(100, progress)); // Ограничиваем от 0 до 100%
      var proc = 100 - progress.toFixed(2);
      bloctarget.style.transform = `translateY(-` + proc + `%)`;
    }
  }
  if (window.innerWidth >= 768 && document.querySelector(".faq_section")) {
    window.addEventListener("scroll", checkScroll);
  }

  document.querySelectorAll(".smoth_scroll").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Отменяем стандартный переход по ссылке

      const targetId = link.getAttribute("href"); // Получаем id блока из href
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
