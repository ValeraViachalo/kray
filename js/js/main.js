// filepath: /Kray/Kray/js/main.js
import { initVideo } from './components/video.js';
import { initSlider } from './components/slider.js';
import { initHorizontalScroll } from './components/horizontalScroll.js';
import { initTyped } from './components/typed.js';
import { initCanvasAnimation } from './components/canvasAnimation.js';
import { initScrollText } from './components/scrollText.js';
import { initFAQ } from './components/faq.js';

document.addEventListener("DOMContentLoaded", () => {
    initVideo();
    initSlider();
    initHorizontalScroll();
    initTyped();
    initCanvasAnimation();
    initScrollText();
    initFAQ();
});