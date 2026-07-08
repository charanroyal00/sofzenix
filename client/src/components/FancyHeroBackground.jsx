import { useEffect, useRef, useState } from 'react';

const FancyHeroBackground = ({ mouseX, mouseY }) => {
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
    const isTablet = width >= 768 && width < 1024;

    // Ultra-dense grid for maximum visual impact
    const meshCols = isMobile ? 48 : isTablet ? 72 : 96;
    const meshRows = isMobile ? 32 : isTablet ? 48 : 64;

    let time = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    let isTabActive = true;
    const handleVisibilityChange = () => { isTabActive = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Floating particles for extra fancy effect
    const particles = [];
    const particleCount = isMobile ? 30 : 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        hue: Math.random() * 60 + 200 // Blue to purple range
      });
    }

    // ─── RENDER LOOP ───
    const render = () => {
      if (!isTabActive) { rafId = requestAnimationFrame(render); return; }

      time += reducedMotion ? 0.0005 : 0.004;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      const targetParallaxX = mouseX && typeof mouseX.get === 'function' ? (mouseX.get() / (width || 1)) * 18 : 0;
      const targetParallaxY = mouseY && typeof mouseY.get === 'function' ? (mouseY.get() / (height || 1)) * 18 : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.08;
      parallaxY += (targetParallaxY - parallaxY) * 0.08;

      // ── LAYER 1: Gradient base matching sofzenix.in (light blue to peach) ──
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#E8F1FF');    // Light blue (left)
      baseGrad.addColorStop(0.4, '#F5F5FF');  // Almost white (center-left)
      baseGrad.addColorStop(0.6, '#FFFAF5');  // Warm white (center-right)
      baseGrad.addColorStop(1, '#FFE8E0');    // Light peach/orange (right)
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── LAYER 2: Radial glow overlays for depth ──
      const drawGlow = (gx, gy, radius, color) => {
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(gx, gy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      const breathe = Math.sin(time * 0.4) * 60;
      const pulse = Math.cos(time * 0.6) * 40;

      // Blue glow - LEFT SIDE (matching sofzenix.in)
      drawGlow(
        width * 0.05 + parallaxX * 2,
        height * 0.70 + parallaxY * 2,
        620 + breathe,
        'rgba(59, 130, 246, 0.40)'  // Stronger blue
      );
      drawGlow(
        width * 0.12 + parallaxX * 1.5,
        height * 0.50 + parallaxY * 1.5,
        460 + pulse,
        'rgba(96, 165, 250, 0.30)'
      );
      // Additional blue glow for depth
      drawGlow(
        width * 0.02,
        height * 0.85,
        500,
        'rgba(37, 99, 235, 0.25)'
      );

      // Orange/Peach glow - RIGHT SIDE (matching sofzenix.in)
      drawGlow(
        width * 0.95 + parallaxX * 2,
        height * 0.70 + parallaxY * 2,
        620 + breathe,
        'rgba(251, 146, 60, 0.40)'  // Stronger orange
      );
      drawGlow(
        width * 0.88 + parallaxX * 1.5,
        height * 0.50 + parallaxY * 1.5,
        460 + pulse,
        'rgba(254, 215, 170, 0.30)'
      );
      // Additional peach glow for depth
      drawGlow(
        width * 0.98,
        height * 0.85,
        500,
        'rgba(249, 115, 22, 0.25)'
      );

      // ── LAYER 3: Floating particles ──
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 65%, 0.6)`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── LAYER 4: Ultra-fancy 3D wave mesh ──
      const fov = 650;
      const camDist = 420;

      const drawWaveMesh = (isFg) => {
        const baseY   = isFg ? height * 0.68 : height * 0.58;
        const offsetZ = isFg ? 0 : 110;
        const maxA    = isFg ? 0.92 : 0.58;
        const tiltX   = isFg ? -0.58 : -0.54;
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);

        const xSpan = width  * (isFg ? 1.95 : 2.2);
        const ySpan = height * (isFg ? 1.2 : 1.4);
        const colSp = xSpan / meshCols;
        const rowSp = ySpan / meshRows;

        const pts = [];
        for (let r = 0; r <= meshRows; r++) {
          const row = [];
          const pY  = r / meshRows;
          const lY  = (r - meshRows / 2) * rowSp;
          for (let c = 0; c <= meshCols; c++) {
            const pX = c / meshCols;
            const lX = (c - meshCols / 2) * colSp;

            // Enhanced wave with multiple frequencies
            const dist  = Math.abs(pX - 0.5) * 2;
            const peak  = Math.pow(dist, 1.8) * (isFg ? 180 : 150);

            const wX = pX * 6.5 - time * (isFg ? 0.65 : 0.45);
            const wY = pY * 4.2 + (isFg ? time * 0.75 : -time * 0.60);
            const ripple = Math.sin(wX) * Math.cos(wY) * (isFg ? 35 : 25)
                         + Math.sin(pX * 20 + time * 2.2) * 8
                         + Math.cos(pY * 12 + time * 1.6) * 6
                         + Math.sin(pX * 8 + pY * 8 + time) * 4;

            const lZ = peak + ripple;
            const y1 = lY * cosX - lZ * sinX;
            const z1 = lY * sinX + lZ * cosX;

            const wXfinal = lX + parallaxX * (isFg ? 3.5 : 1.8);
            const wYfinal = y1 + baseY + parallaxY * (isFg ? 3.5 : 1.8);
            const wZfinal = z1 + offsetZ + camDist;

            const sx = width / 2  + (wXfinal * fov) / wZfinal;
            const sy = height / 2.2 + (wYfinal * fov) / wZfinal;

            const depthFade = Math.max(0, 1 - (wZfinal - 100) / 950);
            const edgeFade  = Math.sin(pX * Math.PI);
            const alpha     = Math.pow(pY, 0.6) * edgeFade * depthFade * maxA;

            row.push({ x: sx, y: sy, z: wZfinal, alpha, pX, pY });
          }
          pts.push(row);
        }

        // ── Enhanced colored surface with vibrant gradients ──
        for (let r = 0; r < meshRows; r++) {
          for (let c = 0; c < meshCols; c++) {
            const p1 = pts[r][c], p2 = pts[r][c+1];
            const p3 = pts[r+1][c+1], p4 = pts[r+1][c];
            const avgA = (p1.alpha + p2.alpha + p3.alpha + p4.alpha) / 4;
            if (avgA < 0.01) continue;

            const midX = (p1.x + p2.x + p3.x + p4.x) / 4;
            const midY = (p1.y + p2.y + p3.y + p4.y) / 4;
            const t = midX / width;
            const tY = midY / height;

            let r_, g_, b_;
            if (t < 0.40) {
              // Strong blue zone (LEFT - matching sofzenix.in)
              const w = 1 - t / 0.40;
              r_ = Math.round(59  + (255 - 59)  * (1 - w * 0.8));
              g_ = Math.round(130 + (255 - 130) * (1 - w * 0.7));
              b_ = Math.round(246 + (255 - 246) * (1 - w * 0.5));
            } else if (t > 0.60) {
              // Strong orange zone (RIGHT - matching sofzenix.in)
              const w = (t - 0.60) / 0.40;
              r_ = Math.round(255 - (255 - 251) * (1 - w));
              g_ = Math.round(255 - (255 - 146) * w * 0.9);
              b_ = Math.round(255 - (255 - 60)  * w * 0.95);
            } else {
              // Bright white center (smooth transition zone)
              r_ = 255;
              g_ = 255;
              b_ = 255;
            }

            ctx.fillStyle = `rgba(${r_},${g_},${b_},${avgA * 0.65})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();
            ctx.fill();
          }
        }

        // ── Enhanced wireframe with glow effect ──
        for (let r = 0; r <= meshRows; r++) {
          for (let c = 0; c <= meshCols; c++) {
            const p = pts[r][c];

            if (c < meshCols) {
              const pN = pts[r][c+1];
              const la = Math.min(p.alpha, pN.alpha);
              if (la > 0.015) {
                const t = p.pX;
                let lr, lg, lb;
                if (t < 0.40) {
                  // Blue lines on left
                  lr = 120; lg = 180; lb = 255;
                } else if (t > 0.60) {
                  // Orange lines on right
                  lr = 255; lg = 190; lb = 120;
                } else {
                  // White lines in center
                  lr = 245; lg = 245; lb = 255;
                }
                
                ctx.strokeStyle = `rgba(${lr},${lg},${lb},${la * 0.90})`;
                ctx.lineWidth = 0.7 + (1 - p.z / (camDist + 350)) * 0.9;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pN.x, pN.y);
                ctx.stroke();
              }
            }
            if (r < meshRows) {
              const pB = pts[r+1][c];
              const la = Math.min(p.alpha, pB.alpha);
              if (la > 0.015) {
                const t = p.pX;
                let lr, lg, lb;
                if (t < 0.40) {
                  // Blue lines on left
                  lr = 120; lg = 180; lb = 255;
                } else if (t > 0.60) {
                  // Orange lines on right
                  lr = 255; lg = 190; lb = 120;
                } else {
                  // White lines in center
                  lr = 245; lg = 245; lb = 255;
                }
                
                ctx.strokeStyle = `rgba(${lr},${lg},${lb},${la * 0.90})`;
                ctx.lineWidth = 0.7 + (1 - p.z / (camDist + 350)) * 0.9;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pB.x, pB.y);
                ctx.stroke();
              }
            }

            // Enhanced vertex dots with glow (matching sofzenix.in colors)
            if (p.alpha > 0.025) {
              const t = p.pX;
              let dr, dg, db;
              if (t < 0.42) {
                // Blue dots on left
                dr = 80; dg = 150; db = 255;
              } else if (t > 0.58) {
                // Orange dots on right
                dr = 255; dg = 160; db = 90;
              } else {
                // Light dots in center
                dr = 230; dg = 230; db = 255;
              }
              const ds = (isFg ? 1.5 : 1.1) + (1 - p.z / (camDist + 350)) * 1.4;
              
              // Glow effect
              const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, ds * 2);
              glowGrad.addColorStop(0, `rgba(${dr},${dg},${db},${p.alpha * 1.2})`);
              glowGrad.addColorStop(1, `rgba(${dr},${dg},${db},0)`);
              ctx.fillStyle = glowGrad;
              ctx.beginPath();
              ctx.arc(p.x, p.y, ds * 2, 0, Math.PI * 2);
              ctx.fill();
              
              // Core dot
              ctx.fillStyle = `rgba(${dr},${dg},${db},${p.alpha * 2})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, ds, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      };

      // Draw both wave layers
      drawWaveMesh(false);
      drawWaveMesh(true);

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
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none bg-noise opacity-[0.015]" />
      {/* Shimmer overlay for extra fancy effect */}
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-white/40 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-white/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>
    </>
  );
};

export default FancyHeroBackground;
