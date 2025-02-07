// filepath: /Kray/Kray/js/components/typed.js
import Typed from 'typed.js';

export function initTyped() {
  const typedElement = document.getElementById("typed");
  if (typedElement) {
    new Typed('#typed', {
      stringsElement: '#typed-strings',
      typeSpeed: 60,
      backSpeed: 30,
      startDelay: 1000,
      backDelay: 2000,
      loop: true,
      loopCount: Infinity
    });
  }
}