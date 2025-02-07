// filepath: /Kray/Kray/js/components/faq.js

export function initFAQ() {
  document.querySelectorAll(".faq_item").forEach(item => {
    item.addEventListener("click", function() {
      this.classList.toggle("open");
    });
  });

  document.querySelectorAll(".burger").forEach(item => {
    item.addEventListener("click", function() {
      this.classList.toggle("open");
      document.querySelector(".mobile_menu").classList.toggle("open");
    });
  });
}