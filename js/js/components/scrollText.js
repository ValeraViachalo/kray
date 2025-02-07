// filepath: /Kray/Kray/js/components/scrollText.js

export function initScrollText() {
  document.querySelectorAll(".scroll_container").forEach((container, index) => {
    let textElement = container.querySelector(".scroll_text");

    let letters = textElement.innerText.split("").map(char => {
      return `<span>${char === " " ? "&nbsp;" : char}</span>`;
    }).join("");

    textElement.innerHTML = letters;
    var spans = textElement.querySelectorAll("span");

    if (index === 0) {
      gsap.set(textElement, { marginTop: '360px' }); 
    }

    let t_start, t_end;
    if(window.innerWidth >= 960 && window.innerWidth < 1200){
      t_start = "top center";
      t_end = `bottom-=15% center`;
    } else if(window.innerWidth >= 768 && window.innerWidth < 960){  
      t_start = "top center+=20%";
      t_end = `bottom center`;
    } else if(window.innerWidth < 768){  
      t_start = "top top+=100px";
      t_end = `bottom bottom`;
    } else {
      t_start = "top center";
      t_end = `bottom-=15% center`;
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
        onUpdate: self => {
          if (index === 0 && self.progress > 0) {
            gsap.set(textElement, { marginTop: '-360px' });
          }
        }            
      }
    });

    gsap.fromTo(textElement, 
      { opacity: 0 }, 
      { opacity: 1, ease: "none", 
        scrollTrigger: {
          trigger: container,
          start: "top 100%",
          end: "top 50%", 
          scrub: 1
        }
      }
    );

    gsap.fromTo(textElement, 
      { opacity: 1 }, 
      { opacity: 0, ease: "none", 
        scrollTrigger: {
          trigger: container,
          start: "bottom 50%",
          end: "bottom 15%",
          scrub: 1
        }
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
        scrub: 1
      }
    });
  });
}