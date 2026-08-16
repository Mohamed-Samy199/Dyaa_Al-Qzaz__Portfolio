import React, { useEffect, useRef } from 'react';

const PixelParticles = ({ targetRef, isVideoOpen }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const createParticles = (rect) => {
      const count = isVideoOpen ? 120 : 60; // زيادة الكثافة لو فيديو
      const newParticles = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: rect.left + Math.random() * rect.width,
          y: rect.top + Math.random() * rect.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: Math.random() * 0.5 + 0.5,
          color: isVideoOpen ? '#a855f7' : '#a855f7', // تيل للفيديو وبنفسجي للكروت
        });
      }
      return newParticles;
    };

    const render = () => {
      // ✅ التأمين المزدوج: التأكد من وجود الـ Ref والعنصر داخل الـ DOM
      if (!targetRef || !targetRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      const rect = targetRef.current.getBoundingClientRect();
      
      // إذا كان العنصر مخفياً أو أبعاده صفر (لتجنب أخطاء الحساب)
      if (rect.width === 0 || rect.height === 0) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // إنشاء جزيئات جديدة باستمرار حول الحواف
      if (particles.current.length < (isVideoOpen ? 100 : 50)) {
        particles.current.push(...createParticles(rect));
      }

      particles.current.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.01;

        // رسم الجزيء (مربع بستايل بيكسل)
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (p.life <= 0) {
          particles.current.splice(index, 1);
        }
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId.current);
      particles.current = [];
    };
  }, [targetRef, isVideoOpen]); // إعادة التشغيل عند تغيير الهدف

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[200]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default PixelParticles;