// filepath: /Kray/Kray/js/components/canvasAnimation.js
const canvasAnimation = (() => {
    const canvas = document.getElementById("animationCanvas");
    const spriteFolder = "./sprite2/";
    const totalFrames = 190;
    let currentFrame = 0;
    let images = {};
    let missingFrames = new Set();

    function preloadFrame(index) {
        if (index >= totalFrames || index < 0 || missingFrames.has(index)) return;
        const popravka = window.innerWidth < 768 ? '_mobile' : '';
        if (!images[index]) {
            const img = new Image();
            img.src = `${spriteFolder}${index + 1}${popravka}.webp`;

            img.onload = () => {
                images[index] = img;
                if (index === currentFrame) drawFrame();
            };

            img.onerror = () => {
                missingFrames.add(index);
            };
        }
    }

    function drawFrame() {
        if (images[currentFrame] && images[currentFrame].complete) {
            const ctx = canvas.getContext("2d");
            const dpr = 1;
            canvas.width = canvas.clientWidth * dpr;
            canvas.height = canvas.clientHeight * dpr;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height);
        }
    }

    function initScrollAnimation(stopBlock) {
        ScrollTrigger.create({
            trigger: document.body,
            pin: canvas.parentElement,
            start: "top top",
            end: () => stopBlock.offsetTop + stopBlock.clientHeight - canvas.parentElement.clientHeight,
            scrub: true,
            onUpdate: (self) => {
                let frame = Math.round(self.progress * (totalFrames - 1));
                while (missingFrames.has(frame) && frame < totalFrames - 1) {
                    frame++;
                }

                if (frame !== currentFrame) {
                    currentFrame = frame;
                    preloadFrame(frame);
                    preloadFrame(frame + 1);
                    preloadFrame(frame + 2);
                    drawFrame();
                }
            }
        });
    }

    return {
        preloadFrame,
        drawFrame,
        initScrollAnimation
    };
})();

export default canvasAnimation;