import { useEffect, useRef, useState } from 'react';

const FormalServiceBackground = ({ mouseX, mouseY }) => {
  const canvasRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;

    let time = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    let isTabActive = true;
    const handleVisibilityChange = () => { isTabActive = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Minimal floating particles for subtle movement
    const particles = [];
    const particleCount = isMobile ? 15 : 25;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    // ─── RENDER LOOP ───
    const render = () => {
      if (!isTabActive) { rafId = requestAnimationFrame(render); return; }

      time += reducedMotion ? 0.0002 : 0.002;
      ctx.clearRect(0, 0, width, height);

      // Very subtle mouse parallax
      const targetParallaxX = mouseX && typeof mouseX.get === 'function' ? (mouseX.get() / (width || 1)) * 8 : 0;
      const targetParallaxY = mouseY && typeof mouseY.get === 'function' ? (mouseY.get() / (height || 1)) * 8 : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.05;
      parallaxY += (targetParallaxY - parallaxY) * 0.05;

      // ── LAYER 1: Clean gradient base (professional gray-blue tones) ──
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#FAFBFF');    // Very light blue-gray
      baseGrad.addColorStop(0.5, '#FFFFFF');  // Pure white
      baseGrad.addColorStop(1, '#F8FAFC');    // Light slate
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── LAYER 2: Subtle accent glows (professional, not flashy) ──
      const drawGlow = (gx, gy, radius, color) => {
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(gx, gy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      const breathe = Math.sin(time * 0.3) * 30;

      // Subtle blue accent - top left
      drawGlow(
        width * 0.12 + parallaxX,
        height * 0.15 + parallaxY,
        400 + breathe,
        'rgba(37, 99, 235, 0.08)'
      );

      // Subtle slate accent - bottom right
      drawGlow(
        width * 0.88 + parallaxX,
        height * 0.85 + parallaxY,
        400 + breathe,
        'rgba(100, 116, 139, 0.06)'
      );

      // ── LAYER 3: Minimal floating particles ──
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = 'rgba(37, 99, 235, 0.15)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── LAYER 4: Subtle geometric grid pattern ──
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.04)';
      ctx.lineWidth = 0.5;
      
      const gridSize = isMobile ? 80 : 100;
      const offsetX = ((time * 20) % gridSize) + parallaxX * 0.5;
      const offsetY = ((time * 15) % gridSize) + parallaxY * 0.5;

      // Vertical lines
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── LAYER 5: Connecting lines between nearby particles (network effect) ──
      const connectionDistance = isMobile ? 120 : 150;
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // ── LAYER 6: Subtle wave accent at bottom ──
      ctx.fillStyle = 'rgba(37, 99, 235, 0.03)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let x = 0; x <= width; x += 10) {
        const y = height * 0.85 + Math.sin(x * 0.01 + time * 1.5) * 30 + Math.cos(x * 0.005 + time) * 15;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mouseX, mouseY, reducedMotion]);

  return (
    <>
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
      {/* Very subtle noise texture */}
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none bg-noise opacity-[0.008]" />
    </>
  );
};

export default FormalServiceBackground;
