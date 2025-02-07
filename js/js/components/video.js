// filepath: /Kray/Kray/js/components/video.js
gsap.registerPlugin(ScrollTrigger);

const videoBlock = document.querySelector(".video-block");
const video = document.querySelector(".video");
const playIcon = document.querySelector(".play-icon");

ScrollTrigger.normalizeScroll(true);

export function initVideo() {
  if (videoBlock) {
    setupVideoAnimation();
    setupMouseEvents();
    setupVideoControls();
  }
}

function setupVideoAnimation() {
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
}

function setupMouseEvents() {
  videoBlock.addEventListener("mouseenter", (e) => {
    const rect = videoBlock.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(playIcon, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
    });
  });

  videoBlock.addEventListener("mousemove", (e) => {
    const rect = videoBlock.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(playIcon, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  videoBlock.addEventListener("mouseleave", () => {
    gsap.to(playIcon, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
}

function setupVideoControls() {
  if (video) {
    video.addEventListener("click", () => {
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
  }
}