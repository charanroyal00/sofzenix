import { useEffect, useRef, useState } from 'react';

const ModernMeshBackground = ({ mouseX, mouseY }) => {
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

    // ─── RENDER LOOP ───
    const render = () => {
      if (!isTabActive) { rafId = requestAnimationFrame(render); return; }

      time += reducedMotion ? 0.0003 : 0.002;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      const targetParallaxX = mouseX && typeof mouseX.get === 'function' ? (mouseX.get() / (width || 1)) * 15 : 0;
      const targetParallaxY = mouseY && typeof mouseY.get === 'function' ? (mouseY.get() / (height || 1)) * 15 : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.08;
      parallaxY += (targetParallaxY - parallaxY) * 0.08;

      // ── BASE: Soft white/light gray background ──
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#FFFFFF');
      baseGrad.addColorStop(0.5, '#FAFBFC');
      baseGrad.addColorStop(1, '#F8F9FA');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── FLOWING WAVE LINES (Topographic/Contour Style) ──
      
      // Blue gradient wave (bottom-left)
      const drawFlowingWaves = (corner, colorStops, originX, originY) => {
        const numLines = isMobile ? 60 : 120; // Dense lines for fabric-like texture
        const lineSpacing = isMobile ? 8 : 6; // Close spacing
        
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.85;

        for (let i = 0; i < numLines; i++) {
          const progress = i / numLines;
          const distanceFromOrigin = i * lineSpacing;
          
          // Color interpolation through gradient
          let r, g, b, opacity;
          if (progress < 0.33) {
            const t = progress / 0.33;
            if (corner === 'blue') {
              // #4F7CFF → #6C5CE7
              r = Math.round(79 + (108 - 79) * t);
              g = Math.round(124 + (92 - 124) * t);
              b = Math.round(255 + (231 - 255) * t);
            } else {
              // #FF6B4A → #FF9068
              r = Math.round(255 + (255 - 255) * t);
              g = Math.round(107 + (144 - 107) * t);
              b = Math.round(74 + (104 - 74) * t);
            }
          } else if (progress < 0.67) {
            const t = (progress - 0.33) / 0.34;
            if (corner === 'blue') {
              // #6C5CE7 → #A78BFA
              r = Math.round(108 + (167 - 108) * t);
              g = Math.round(92 + (139 - 92) * t);
              b = Math.round(231 + (250 - 231) * t);
            } else {
              // #FF9068 → #FFC7A8
              r = Math.round(255 + (255 - 255) * t);
              g = Math.round(144 + (199 - 144) * t);
              b = Math.round(104 + (168 - 104) * t);
            }
          } else {
            const t = (progress - 0.67) / 0.33;
            if (corner === 'blue') {
              // #A78BFA → fade to transparent
              r = Math.round(167 + (200 - 167) * t);
              g = Math.round(139 + (180 - 139) * t);
              b = Math.round(250 + (255 - 250) * t);
            } else {
              // #FFC7A8 → fade to transparent
              r = Math.round(255 + (255 - 255) * t);
              g = Math.round(199 + (220 - 199) * t);
              b = Math.round(168 + (200 - 168) * t);
            }
          }

          // Fade opacity based on distance from origin
          opacity = (1 - progress * 0.8) * 0.35; // 20-40% opacity range

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();

          // Draw flowing sine/ripple wave
          const segments = isMobile ? 150 : 300;
          for (let j = 0; j <= segments; j++) {
            const t = j / segments;
            let x, y;

            if (corner === 'blue') {
              // Bottom-left origin, flowing upward/rightward
              x = originX + t * width * 0.7 + parallaxX;
              
              // Multiple sine waves for organic flow
              const wave1 = Math.sin(t * 8 + time * 0.8 + i * 0.15) * 40;
              const wave2 = Math.sin(t * 4 + time * 0.5 + i * 0.1) * 25;
              const wave3 = Math.cos(t * 12 + time * 0.3) * 15;
              
              y = originY - distanceFromOrigin - t * height * 0.5 + wave1 + wave2 + wave3 + parallaxY;
            } else {
              // Bottom-right origin, flowing upward/leftward
              x = originX - t * width * 0.7 + parallaxX;
              
              const wave1 = Math.sin(t * 8 - time * 0.7 + i * 0.15) * 40;
              const wave2 = Math.sin(t * 4 - time * 0.6 + i * 0.1) * 25;
              const wave3 = Math.cos(t * 12 - time * 0.4) * 15;
              
              y = originY - distanceFromOrigin - t * height * 0.5 + wave1 + wave2 + wave3 + parallaxY;
            }

            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.stroke();
        }

        ctx.restore();
      };

      // Draw blue wave from bottom-left
      drawFlowingWaves('blue', 
        ['#4F7CFF', '#6C5CE7', '#A78BFA'], 
        -width * 0.1, 
        height + 50
      );

      // Draw orange/peach wave from bottom-right
      drawFlowingWaves('orange', 
        ['#FF6B4A', '#FF9068', '#FFC7A8'], 
        width + width * 0.1, 
        height + 50
      );

      // Additional wave from top-right for more coverage
      const drawTopRightWave = () => {
        const numLines = isMobile ? 40 : 80;
        const lineSpacing = isMobile ? 10 : 8;
        
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.7;

        for (let i = 0; i < numLines; i++) {
          const progress = i / numLines;
          const distanceFromOrigin = i * lineSpacing;
          
          let r, g, b, opacity;
          if (progress < 0.5) {
            const t = progress / 0.5;
            // #FF9068 → #FFC7A8
            r = Math.round(255);
            g = Math.round(144 + (199 - 144) * t);
            b = Math.round(104 + (168 - 104) * t);
          } else {
            const t = (progress - 0.5) / 0.5;
            // #FFC7A8 → fade
            r = Math.round(255);
            g = Math.round(199 + (230 - 199) * t);
            b = Math.round(168 + (210 - 168) * t);
          }

          opacity = (1 - progress * 0.9) * 0.3;

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.lineCap = 'round';

          ctx.beginPath();

          const segments = isMobile ? 120 : 250;
          for (let j = 0; j <= segments; j++) {
            const t = j / segments;
            
            const x = width + 50 - t * width * 0.6 - parallaxX * 0.5;
            
            const wave1 = Math.sin(t * 6 - time * 0.5 + i * 0.12) * 35;
            const wave2 = Math.cos(t * 3 - time * 0.4) * 20;
            
            const y = -50 + distanceFromOrigin + t * height * 0.5 + wave1 + wave2 - parallaxY * 0.5;

            if (j === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.stroke();
        }

        ctx.restore();
      };

      drawTopRightWave();

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
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-white">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none bg-noise opacity-[0.012]" />
    </>
  );
};

export default ModernMeshBackground;
