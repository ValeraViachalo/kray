const horizontalScroll = document.querySelector(".horizontal-scroll");
const horizontalScrollItem = gsap.utils.toArray(".horizontal-scroll .item");

if (horizontalScrollItem.length) {
  const cardWidth = horizontalScrollItem[0].offsetWidth;
  const viewportWidth = window.innerWidth;
  const containerWidth = horizontalScroll.scrollWidth;
  const parentWidth = document.querySelector(".horizontal-scroll-container").offsetWidth;

  const lastCard = horizontalScrollItem[horizontalScrollItem.length - 1];
  const lastCardOffset = lastCard.offsetLeft + cardWidth / 2;

  const scrollHorEnd = lastCardOffset - viewportWidth / 2;
  const scrollEnd = document.querySelector(".horizontal-scroll-container").offsetHeight - document.querySelector(".horizontal-scroll").offsetHeight;

  gsap.to(horizontalScroll, {
    x: () => -scrollHorEnd,
    ease: "none",
    scrollTrigger: {
      trigger: ".section_11",
      start: "top top",
      end: () => `+=${scrollEnd}`,
      pin: ".horizontal-scroll-container",
      scrub: true,
    },
  });
}