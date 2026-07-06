import { useEffect, useRef, useState } from 'react';

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
    
    // High-density grid matching the fine detail of the reference image
    const meshCols = isMobile ? 30 : isTablet ? 42 : 58;
    const meshRows = isMobile ? 20 : isTablet ? 28 : 38;
    const particleCount = isMobile ? 50 : isTablet ? 65 : 80;

    // Background floating depth particles
    const particles = Array.from({ length: particleCount }, () => {
      const pZ = 50 + Math.random() * 450;
      return {
        x3d: (Math.random() - 0.5) * width * 1.5,
        y3d: (Math.random() - 0.5) * height * 1.3,
        z3d: pZ,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        vz: (Math.random() - 0.5) * 0.06,
        color: Math.random() > 0.5 ? 'rgba(37, 99, 235, 0.4)' : 'rgba(249, 115, 22, 0.4)',
        alpha: 0.15 + Math.random() * 0.35,
        fadeSpeed: 0.002 + Math.random() * 0.006,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      };
    });

    let time = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    let isTabActive = true;
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ─── RENDER LOOP ───
    const render = () => {
      if (!isTabActive) {
        rafId = requestAnimationFrame(render);
        return;
      }

      time += reducedMotion ? 0.0004 : 0.0028;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax interpolation (with safety checks for motion value loading)
      const targetParallaxX = mouseX && typeof mouseX.get === 'function' ? (mouseX.get() / (width || 1)) * 10 : 0;
      const targetParallaxY = mouseY && typeof mouseY.get === 'function' ? (mouseY.get() / (height || 1)) * 10 : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.08;
      parallaxY += (targetParallaxY - parallaxY) * 0.08;

      // ─── LAYER 1: Base Background Color ───
      ctx.fillStyle = '#FAFBFF';
      ctx.fillRect(0, 0, width, height);

      // ─── LAYER 2 & 3: Large Blurred Glows ───
      const drawGlow = (gx, gy, radius, color) => {
        const glowGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
        glowGrad.addColorStop(0, color);
        glowGrad.addColorStop(1, 'rgba(250, 251, 255, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(gx, gy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      // Breathing radial glows for soft ambient lighting
      const leftGlowRad = 550 + Math.sin(time * 0.4) * 45;
      const rightGlowRad = 550 + Math.cos(time * 0.35) * 50;

      // Layer 2: Soft Blue glow from bottom-left (Color: #2563EB, 20% Opacity)
      drawGlow(width * 0.08 + parallaxX * 1.5, height * 0.88 + parallaxY * 1.5, leftGlowRad, 'rgba(37, 99, 235, 0.20)');

      // Layer 3: Soft Orange glow from bottom-right (Color: #F97316, 20% Opacity)
      drawGlow(width * 0.92 + parallaxX * 1.5, height * 0.88 + parallaxY * 1.5, rightGlowRad, 'rgba(249, 115, 22, 0.20)');

      // ─── LAYER 4: Two overlapping High-Density 3D Wireframe Waves with Solid Shading ───
      const fov = 720;
      const cameraDistance = 390;

      const draw3DShadedMesh = (isForeground) => {
        const offsetY = isForeground ? height * 0.68 : height * 0.58;
        const offsetZ = isForeground ? 20 : 110;
        const maxAlphaMultiplier = isForeground ? 0.65 : 0.40; // Increased opacity for high visibility

        const tiltX = isForeground ? -0.58 : -0.55;
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);

        const gridPoints = [];

        // Grid sizing
        const xSpan = width * (isForeground ? 1.7 : 1.9);
        const ySpan = height * (isForeground ? 1.05 : 1.25);
        const colSpacing = xSpan / meshCols;
        const rowSpacing = ySpan / meshRows;

        // Generate coordinates
        for (let r = 0; r <= meshRows; r++) {
          const rowPoints = [];
          const progressY = r / meshRows;
          const localY = (r - meshRows / 2) * rowSpacing;

          for (let c = 0; c <= meshCols; c++) {
            const progressX = c / meshCols;
            const localX = (c - meshCols / 2) * colSpacing;

            // Mountainous height envelope shaping valley in the center
            const distFromCenter = Math.abs(progressX - 0.5) * 2;
            const peakHeight = Math.pow(distFromCenter, 1.75) * (isForeground ? 140 : 120);

            // Wave motion
            const waveX = progressX * 4.8 - time * 0.45;
            const waveY = progressY * 3.2 + (isForeground ? time * 0.55 : -time * 0.55);
            const ripple = Math.sin(waveX) * Math.cos(waveY) * (isForeground ? 24 : 18)
                         + Math.sin(progressX * 14 + time * 1.5) * 5;

            const localZ = peakHeight + ripple;

            // Rotate
            const y1 = localY * cosX - localZ * sinX;
            const z1 = localY * sinX + localZ * cosX;

            // Translate
            const wX = localX + parallaxX * (isForeground ? 2.8 : 1.4);
            const wY = y1 + offsetY + parallaxY * (isForeground ? 2.8 : 1.4);
            const wZ = z1 + offsetZ + cameraDistance;

            // Project
            const screenX = width / 2 + (wX * fov) / wZ;
            const screenY = height / 2.3 + (wY * fov) / wZ;

            // Opacity multipliers
            const depthFade = Math.max(0, 1 - (wZ - 100) / 850);
            const edgeFadeX = Math.sin(progressX * Math.PI); // Fades at extreme left/right edges
            const alpha = Math.pow(progressY, 0.75) * edgeFadeX * depthFade * maxAlphaMultiplier;

            rowPoints.push({ x: screenX, y: screenY, z: wZ, alpha });
          }
          gridPoints.push(rowPoints);
        }

        // Draw polygon face shading (surface fills)
        for (let r = 0; r < meshRows; r++) {
          for (let c = 0; c < meshCols; c++) {
            const p1 = gridPoints[r][c];
            const p2 = gridPoints[r][c + 1];
            const p3 = gridPoints[r + 1][c + 1];
            const p4 = gridPoints[r + 1][c];

            const avgAlpha = (p1.alpha + p2.alpha + p3.alpha + p4.alpha) / 4;

            if (avgAlpha > 0.015) {
              const segmentMidX = (p1.x + p2.x) / 2;
              
              // Blended color coordinates: Blue (#2563EB) left, Orange (#F97316) right, soft white center
              const blueWeight = Math.max(0, 1 - segmentMidX / (width * 0.44));
              const orangeWeight = Math.max(0, (segmentMidX - width * 0.56) / (width * 0.44));
              const whiteWeight = 1 - blueWeight - orangeWeight;

              // Shaded surface colors: richer blue/indigo and peach/orange tones
              const red = Math.round(59 * blueWeight + 251 * orangeWeight + 248 * whiteWeight);
              const green = Math.round(130 * blueWeight + 160 * orangeWeight + 250 * whiteWeight);
              const blue = Math.round(246 * blueWeight + 110 * orangeWeight + 255 * whiteWeight);

              // Surface fill with opacity
              ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${avgAlpha * 0.42})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.lineTo(p3.x, p3.y);
              ctx.lineTo(p4.x, p4.y);
              ctx.closePath();
              ctx.fill();
            }
          }
        }

        // Draw wireframe overlay lines and glowing nodes
        ctx.strokeStyle = '#FFFFFF';
        for (let r = 0; r <= meshRows; r++) {
          for (let c = 0; c <= meshCols; c++) {
            const p = gridPoints[r][c];

            // Setup color parameters based on position for the wireframe lines and dots
            const segmentMidX = p.x;
            const blueWeight = Math.max(0, 1 - segmentMidX / (width * 0.44));
            const orangeWeight = Math.max(0, (segmentMidX - width * 0.56) / (width * 0.44));
            const whiteWeight = 1 - blueWeight - orangeWeight;

            const red = Math.round(37 * blueWeight + 249 * orangeWeight + 255 * whiteWeight);
            const green = Math.round(99 * blueWeight + 115 * orangeWeight + 255 * whiteWeight);
            const blue = Math.round(235 * blueWeight + 22 * orangeWeight + 255 * whiteWeight);

            // Draw horizontal line segment
            if (c < meshCols) {
              const pNext = gridPoints[r][c + 1];
              const lineAlpha = Math.min(p.alpha, pNext.alpha);

              if (lineAlpha > 0.02) {
                // Lines are white on top of colored surface with low opacity (Reference style)
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * 0.70})`;
                ctx.lineWidth = 0.45 + (1 - p.z / (cameraDistance + 250)) * 0.45;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pNext.x, pNext.y);
                ctx.stroke();
              }
            }

            // Draw vertical line segment
            if (r < meshRows) {
              const pBelow = gridPoints[r + 1][c];
              const lineAlpha = Math.min(p.alpha, pBelow.alpha);

              if (lineAlpha > 0.02) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * 0.70})`;
                ctx.lineWidth = 0.45 + (1 - p.z / (cameraDistance + 250)) * 0.45;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(pBelow.x, pBelow.y);
                ctx.stroke();
              }
            }

            // Draw bright glowing particle dots at each vertex
            if (p.alpha > 0.03) {
              const dotSize = (isForeground ? 1.1 : 0.8) + (1 - p.z / (cameraDistance + 250)) * 1.0;
              
              // Dots glow with the underlying local color (blue/indigo or orange/peach)
              ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${p.alpha * 1.6})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      };

      // Draw background ridge (fainter), then foreground ridge
      draw3DShadedMesh(false);
      draw3DShadedMesh(true);

      // ─── FLOATING particles (60-80 dots in blue, orange, white) ───
      particles.forEach((p) => {
        if (!reducedMotion) {
          p.x3d += p.vx;
          p.y3d += p.vy;
          p.z3d += p.vz;

          p.alpha += p.fadeSpeed * p.fadeDir;
          if (p.alpha > 0.7) { p.alpha = 0.7; p.fadeDir = -1; }
          else if (p.alpha < 0.1) { p.alpha = 0.1; p.fadeDir = 1; }

          if (p.x3d < -width) p.x3d = width;
          if (p.x3d > width) p.x3d = -width;
          if (p.y3d < -height) p.y3d = height;
          if (p.y3d > height) p.y3d = -height;
          if (p.z3d < 10) p.z3d = 500;
          if (p.z3d > 500) p.z3d = 10;
        }

        const wX = p.x3d + parallaxX * 2.8;
        const wY = p.y3d + parallaxY * 2.8;
        const wZ = p.z3d + cameraDistance;

        const screenX = width / 2 + (wX * fov) / wZ;
        const screenY = height / 2 + (wY * fov) / wZ;

        const size = Math.max(0.4, (1 - p.z3d / 500) * 2.5);
        const depthAlpha = Math.max(0, 1 - p.z3d / 500) * p.alpha * 0.45;

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = depthAlpha;
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

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
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none bg-noise opacity-[0.015]" />
    </>
  );
};

export default PremiumHeroBackground;
