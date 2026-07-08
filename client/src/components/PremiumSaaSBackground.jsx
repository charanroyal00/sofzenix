import { useEffect, useRef, useState } from 'react';

const PremiumSaaSBackground = ({ mouseX, mouseY }) => {
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

    // Ultra-dense mesh for premium feel
    const meshCols = isMobile ? 60 : 100;
    const meshRows = isMobile ? 40 : 65;

    let time = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    let isTabActive = true;
    const handleVisibilityChange = () => { isTabActive = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Microscopic floating particles
    const particles = [];
    const particleCount = isMobile ? 40 : 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    // Bokeh circles
    const bokeh = [];
    const bokehCount = isMobile ? 8 : 15;
    for (let i = 0; i < bokehCount; i++) {
      bokeh.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6,
        radius: Math.random() * 60 + 30,
        opacity: Math.random() * 0.03 + 0.01,
        speed: Math.random() * 0.02 + 0.01
      });
    }

    // ─── RENDER LOOP ───
    const render = () => {
      if (!isTabActive) { rafId = requestAnimationFrame(render); return; }

      time += reducedMotion ? 0.0002 : 0.0018;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      const targetParallaxX = mouseX && typeof mouseX.get === 'function' ? (mouseX.get() / (width || 1)) * 8 : 0;
      const targetParallaxY = mouseY && typeof mouseY.get === 'function' ? (mouseY.get() / (height || 1)) * 8 : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.06;
      parallaxY += (targetParallaxY - parallaxY) * 0.06;

      // ── LAYER 1: Elegant white-to-light-gray gradient ──
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, '#FFFFFF');     // Pure white top
      baseGrad.addColorStop(0.5, '#FAFBFC');   // Very light gray
      baseGrad.addColorStop(1, '#F5F6F7');     // Light gray bottom
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── LAYER 2: Large soft radial glow in center ──
      const centerGlow = ctx.createRadialGradient(
        width / 2, height * 0.35, 0,
        width / 2, height * 0.35, width * 0.5
      );
      centerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      centerGlow.addColorStop(0.5, 'rgba(250, 251, 252, 0.3)');
      centerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // ── LAYER 3: Subtle volumetric lighting (top-down) ──
      const volumetric = ctx.createLinearGradient(0, 0, 0, height * 0.4);
      volumetric.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      volumetric.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = volumetric;
      ctx.fillRect(0, 0, width, height * 0.4);

      // ── LAYER 4: Faint circular bokeh ──
      bokeh.forEach(b => {
        b.y += b.speed;
        if (b.y > height) b.y = -b.radius;

        const bokehGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        bokehGrad.addColorStop(0, `rgba(200, 210, 255, ${b.opacity})`);
        bokehGrad.addColorStop(0.7, `rgba(200, 210, 255, ${b.opacity * 0.5})`);
        bokehGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = bokehGrad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── LAYER 5: Microscopic floating particles ──
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = `rgba(180, 190, 200, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── LAYER 6: Premium wireframe mesh waves ──
      const fov = 700;
      const camDist = 450;

      const drawPremiumWave = (isBlue) => {
        // Blue wave starts bottom-left, Orange wave starts bottom-right
        const side = isBlue ? -1 : 1;
        const baseX = isBlue ? width * 0.08 : width * 0.92;
        const baseY = height * 0.65; // Move waves up significantly
        const tiltX = -0.55; // Less tilt for more coverage
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);

        const xSpan = width * 1.0; // Much wider coverage
        const ySpan = height * 0.85; // Much taller coverage
        const colSp = xSpan / meshCols;
        const rowSp = ySpan / meshRows;

        const pts = [];
        for (let r = 0; r <= meshRows; r++) {
          const row = [];
          const pY = r / meshRows;
          const lY = (r - meshRows / 2) * rowSp;
          for (let c = 0; c <= meshCols; c++) {
            const pX = c / meshCols;
            const lX = (c - meshCols / 2) * colSp * side;

            // Smooth flowing curves - much larger amplitude
            const wave1 = Math.sin(pX * 3.5 + time * (isBlue ? 0.8 : 0.7)) * 80;
            const wave2 = Math.cos(pY * 2.5 + time * (isBlue ? 0.6 : 0.5)) * 60;
            const wave3 = Math.sin((pX + pY) * 2 + time) * 30;

            const lZ = wave1 + wave2 + wave3 + pY * 150; // Much more depth
            const y1 = lY * cosX - lZ * sinX;
            const z1 = lY * sinX + lZ * cosX;

            const wXfinal = baseX + lX + parallaxX * 2;
            const wYfinal = baseY + y1 + parallaxY * 2;
            const wZfinal = z1 + camDist;

            const sx = wXfinal + ((lX * fov) / wZfinal) * 0.3;
            const sy = wYfinal + ((y1 * fov) / wZfinal) * 0.3;

            const depthFade = Math.max(0, 1 - (wZfinal - 200) / 800);
            const edgeFade = Math.pow(pY, 0.6); // Less aggressive fade
            const alpha = edgeFade * depthFade * 0.95; // Higher alpha for more visibility

            row.push({ x: sx, y: sy, z: wZfinal, alpha, pX, pY });
          }
          pts.push(row);
        }

        // Draw semi-transparent surface fill
        for (let r = 0; r < meshRows; r++) {
          for (let c = 0; c < meshCols; c++) {
            const p1 = pts[r][c], p2 = pts[r][c + 1];
            const p3 = pts[r + 1][c + 1], p4 = pts[r + 1][c];
            const avgA = (p1.alpha + p2.alpha + p3.alpha + p4.alpha) / 4;
            if (avgA < 0.01) continue;

            if (isBlue) {
              ctx.fillStyle = `rgba(100, 150, 255, ${avgA * 0.18})`; // More visible surface
            } else {
              ctx.fillStyle = `rgba(255, 160, 100, ${avgA * 0.18})`; // More visible surface
            }
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();
            ctx.fill();
          }
        }

        // Draw ultra-thin wireframe lines
        for (let r = 0; r <= meshRows; r++) {
          for (let c = 0; c <= meshCols; c++) {
            const p = pts[r][c];

            if (c < meshCols) {
              const pN = pts[r][c + 1];
              const la = Math.min(p.alpha, pN.alpha);
              if (la > 0.02) {
                if (isBlue) {
                  ctx.strokeStyle = `rgba(100, 150, 255, ${la * 0.60})`; // More visible lines
                } else {
                  ctx.strokeStyle = `rgba(255, 160, 100, ${la * 0.60})`; // More visible lines
                }
                ctx.lineWidth = 0.6 + (1 - p.z / (camDist + 400)) * 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pN.x, pN.y);
                ctx.stroke();
              }
            }
            if (r < meshRows) {
              const pB = pts[r + 1][c];
              const la = Math.min(p.alpha, pB.alpha);
              if (la > 0.02) {
                if (isBlue) {
                  ctx.strokeStyle = `rgba(100, 150, 255, ${la * 0.60})`; // More visible lines
                } else {
                  ctx.strokeStyle = `rgba(255, 160, 100, ${la * 0.60})`; // More visible lines
                }
                ctx.lineWidth = 0.6 + (1 - p.z / (camDist + 400)) * 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pB.x, pB.y);
                ctx.stroke();
              }
            }

            // Tiny glowing dots at vertices
            if (p.alpha > 0.03) {
              const ds = 1.2 + (1 - p.z / (camDist + 400)) * 0.8; // Larger dots
              
              // Glow
              const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, ds * 4);
              if (isBlue) {
                glowGrad.addColorStop(0, `rgba(100, 150, 255, ${p.alpha * 0.7})`); // Stronger glow
                glowGrad.addColorStop(1, 'rgba(100, 150, 255, 0)');
              } else {
                glowGrad.addColorStop(0, `rgba(255, 160, 100, ${p.alpha * 0.7})`); // Stronger glow
                glowGrad.addColorStop(1, 'rgba(255, 160, 100, 0)');
              }
              ctx.fillStyle = glowGrad;
              ctx.beginPath();
              ctx.arc(p.x, p.y, ds * 4, 0, Math.PI * 2);
              ctx.fill();

              // Core dot
              if (isBlue) {
                ctx.fillStyle = `rgba(120, 170, 255, ${p.alpha * 0.95})`; // More visible core
              } else {
                ctx.fillStyle = `rgba(255, 180, 120, ${p.alpha * 0.95})`; // More visible core
              }
              ctx.beginPath();
              ctx.arc(p.x, p.y, ds, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      };

      // Draw blue wave (bottom-left)
      drawPremiumWave(true);
      // Draw orange wave (bottom-right)
      drawPremiumWave(false);

      // ── LAYER 7: Delicate bloom effect ──
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(20px)';
      
      const bloomGrad = ctx.createRadialGradient(
        width / 2, height * 0.9, 0,
        width / 2, height * 0.9, width * 0.4
      );
      bloomGrad.addColorStop(0, 'rgba(180, 200, 255, 0.03)');
      bloomGrad.addColorStop(0.5, 'rgba(255, 180, 150, 0.02)');
      bloomGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = bloomGrad;
      ctx.fillRect(0, 0, width, height);
      
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';

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
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none bg-noise opacity-[0.015]" />
      {/* Minimal geometric accents - subtle corner lines */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
        <svg className="w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="10%" x2="15%" y2="10%" stroke="#6B7280" strokeWidth="1"/>
          <line x1="10%" y1="10%" x2="10%" y2="15%" stroke="#6B7280" strokeWidth="1"/>
          <line x1="90%" y1="10%" x2="85%" y2="10%" stroke="#6B7280" strokeWidth="1"/>
          <line x1="90%" y1="10%" x2="90%" y2="15%" stroke="#6B7280" strokeWidth="1"/>
        </svg>
      </div>
    </>
  );
};

export default PremiumSaaSBackground;
