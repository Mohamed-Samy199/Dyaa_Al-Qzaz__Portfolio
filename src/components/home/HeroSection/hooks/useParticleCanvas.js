import { useEffect, useRef } from "react";

export const useParticleCanvas = ({ isVideoOpen, imageRef, videoModalRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    class Pixel {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.life = 1;
        this.color = Math.random() > 0.5 ? "#A855F7" : "#3B82F6";
        this.vX = (Math.random() - 0.5) * 2;
        this.vY = (Math.random() - 0.5) * 2;
      }
      draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
      update() {
        this.x += this.vX;
        this.y += this.vY;
        this.life -= 0.01;
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetRef = isVideoOpen ? videoModalRef : imageRef;

      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();

        if (Math.random() > 0.6) {
          particles.push(
            new Pixel(
              rect.left + Math.random() * rect.width,
              rect.top + Math.random() * rect.height
            )
          );
        }

        ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
        ctx.lineWidth = 1;
        ctx.strokeRect(rect.left - 5, rect.top - 5, rect.width + 10, rect.height + 10);
      }

      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVideoOpen]);

  return { canvasRef };
};