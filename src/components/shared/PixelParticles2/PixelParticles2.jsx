import { useEffect, useRef } from 'react';

const PixelParticles2 = ({ isVideoOpen }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      // الكانفاس بياخد حجم الـ parent مباشرة
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas.parentElement);

    const createParticles = () => {
      const count = isVideoOpen ? 120 : 60;
      const newParticles = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          // الإحداثيات بالنسبة للـ canvas نفسه مش للـ window
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: Math.random() * 0.5 + 0.5,
          color: '#a855f7',
        });
      }
      return newParticles;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.current.length < (isVideoOpen ? 100 : 50)) {
        particles.current.push(...createParticles());
      }

      particles.current.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.01;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (p.life <= 0) {
          particles.current.splice(index, 1);
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId.current);
      particles.current = [];
    };
  }, [isVideoOpen]);

  return (
    <canvas
      ref={canvasRef}
      // absolute بدل fixed + inset-0 عشان يتمسك بالـ parent
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 200,
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default PixelParticles2;