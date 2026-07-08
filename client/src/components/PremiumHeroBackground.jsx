import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const PremiumHeroBackground = ({ mouseX, mouseY }) => {
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

    // Dense grid for fine mesh detail like the reference image
    const meshCols = isMobile ? 32 : isTablet ? 48 : 64;
    const meshRows = isMobile ? 22 : isTablet ? 32 : 42;

    let time = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    let isTabActive = true;
    const handleVisibilityChange = () => { isTabActive = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibilityChange);


    // ─── RENDER LOOP ───
    const render = () => {
      if (!isTabActive) { rafId = requestAnimationFrame(render); return; }

      time += reducedMotion ? 0.0003 : 0.003;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      const targetParallaxX = mouseX && typeof mouseX.get === 'function' ? (mouseX.get() / (width || 1)) * 12 : 0;
      const targetParallaxY = mouseY && typeof mouseY.get === 'function' ? (mouseY.get() / (height || 1)) * 12 : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.07;
      parallaxY += (targetParallaxY - parallaxY) * 0.07;

      // ── LAYER 1: Pure white base ──
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // ── LAYER 2: Subtle light-blue tint in center-top area ──
      const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.5);
      topGrad.addColorStop(0, 'rgba(224, 234, 255, 0.55)');
      topGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, width, height * 0.5);

      // ── LAYER 3: Large ambient glows (blue left, orange right) ──
      const drawGlow = (gx, gy, radius, color) => {
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(gx, gy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      const breathe = Math.sin(time * 0.5) * 40;
      // Blue glow — bottom-left
      drawGlow(
        width * 0.05 + parallaxX,
        height * 0.82 + parallaxY,
        520 + breathe,
        'rgba(37, 99, 235, 0.28)'
      );
      // Lighter blue mid-left
      drawGlow(
        width * 0.12 + parallaxX,
        height * 0.65 + parallaxY,
        340,
        'rgba(99, 143, 255, 0.18)'
      );
      // Orange glow — bottom-right
      drawGlow(
        width * 0.95 + parallaxX,
        height * 0.82 + parallaxY,
        520 + breathe,
        'rgba(249, 115, 22, 0.28)'
      );
      // Peach mid-right
      drawGlow(
        width * 0.88 + parallaxX,
        height * 0.65 + parallaxY,
        340,
        'rgba(251, 170, 100, 0.18)'
      );


      // ── LAYER 4: 3D wave mesh ──
      const fov = 700;
      const camDist = 380;

      const drawWaveMesh = (isFg) => {
        // Foreground wave: larger, more visible; background: slightly behind
        const baseY   = isFg ? height * 0.70 : height * 0.60;
        const offsetZ = isFg ? 0 : 90;
        const maxA    = isFg ? 0.82 : 0.52;
        const tiltX   = isFg ? -0.60 : -0.56;
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);

        const xSpan = width  * (isFg ? 1.85 : 2.1);
        const ySpan = height * (isFg ? 1.15 : 1.35);
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

            // Side peaks with flat center valley (matches reference)
            const dist  = Math.abs(pX - 0.5) * 2;
            const peak  = Math.pow(dist, 1.6) * (isFg ? 160 : 135);

            // Layered wave motion
            const wX = pX * 5.5 - time * (isFg ? 0.50 : 0.38);
            const wY = pY * 3.8 + (isFg ? time * 0.60 : -time * 0.50);
            const ripple = Math.sin(wX) * Math.cos(wY) * (isFg ? 28 : 20)
                         + Math.sin(pX * 16 + time * 1.8) * 6
                         + Math.cos(pY * 10 + time * 1.2) * 4;

            const lZ = peak + ripple;
            const y1 = lY * cosX - lZ * sinX;
            const z1 = lY * sinX + lZ * cosX;

            const wXfinal = lX + parallaxX * (isFg ? 3.0 : 1.5);
            const wYfinal = y1 + baseY + parallaxY * (isFg ? 3.0 : 1.5);
            const wZfinal = z1 + offsetZ + camDist;

            const sx = width / 2  + (wXfinal * fov) / wZfinal;
            const sy = height / 2.2 + (wYfinal * fov) / wZfinal;

            const depthFade = Math.max(0, 1 - (wZfinal - 80) / 900);
            const edgeFade  = Math.sin(pX * Math.PI);
            const alpha     = Math.pow(pY, 0.65) * edgeFade * depthFade * maxA;

            row.push({ x: sx, y: sy, z: wZfinal, alpha, pX });
          }
          pts.push(row);
        }


        // ── Colored surface fills ──
        for (let r = 0; r < meshRows; r++) {
          for (let c = 0; c < meshCols; c++) {
            const p1 = pts[r][c], p2 = pts[r][c+1];
            const p3 = pts[r+1][c+1], p4 = pts[r+1][c];
            const avgA = (p1.alpha + p2.alpha + p3.alpha + p4.alpha) / 4;
            if (avgA < 0.01) continue;

            const midX = (p1.x + p2.x + p3.x + p4.x) / 4;
            // Normalized 0→1 across screen width
            const t = midX / width;

            // Blue side (#3B6FEE) → white center → Orange side (#F97316)
            let r_, g_, b_;
            if (t < 0.38) {
              // Blue zone
              const w = 1 - t / 0.38;
              r_ = Math.round(59  + (255 - 59)  * (1 - w));
              g_ = Math.round(111 + (255 - 111) * (1 - w));
              b_ = Math.round(238 + (255 - 238) * (1 - w));
            } else if (t > 0.62) {
              // Orange zone
              const w = (t - 0.62) / 0.38;
              r_ = Math.round(255 - (255 - 249) * (1 - w));
              g_ = Math.round(255 - (255 - 115) * w);
              b_ = Math.round(255 - (255 - 22)  * w);
            } else {
              // Pure white center
              r_ = 255; g_ = 255; b_ = 255;
            }

            ctx.fillStyle = `rgba(${r_},${g_},${b_},${avgA * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();
            ctx.fill();
          }
        }

        // ── White wireframe lines ──
        for (let r = 0; r <= meshRows; r++) {
          for (let c = 0; c <= meshCols; c++) {
            const p = pts[r][c];

            if (c < meshCols) {
              const pN = pts[r][c+1];
              const la = Math.min(p.alpha, pN.alpha);
              if (la > 0.015) {
                ctx.strokeStyle = `rgba(255,255,255,${la * 0.78})`;
                ctx.lineWidth = 0.5 + (1 - p.z / (camDist + 300)) * 0.5;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pN.x, pN.y); ctx.stroke();
              }
            }
            if (r < meshRows) {
              const pB = pts[r+1][c];
              const la = Math.min(p.alpha, pB.alpha);
              if (la > 0.015) {
                ctx.strokeStyle = `rgba(255,255,255,${la * 0.78})`;
                ctx.lineWidth = 0.5 + (1 - p.z / (camDist + 300)) * 0.5;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pB.x, pB.y); ctx.stroke();
              }
            }

            // Vertex dots
            if (p.alpha > 0.025) {
              const t = p.pX;
              let dr, dg, db;
              if (t < 0.4) {
                dr = 59; dg = 111; db = 238;
              } else if (t > 0.6) {
                dr = 249; dg = 115; db = 22;
              } else {
                dr = 200; dg = 210; db = 255;
              }
              const ds = (isFg ? 1.2 : 0.85) + (1 - p.z / (camDist + 300)) * 1.1;
              ctx.fillStyle = `rgba(${dr},${dg},${db},${p.alpha * 1.8})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, ds, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }; // end drawWaveMesh

      // Back wave first, then foreground
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
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none bg-noise opacity-[0.012]" />
    </>
  );
};

export default PremiumHeroBackground;
