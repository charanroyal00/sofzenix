import React, { useEffect, useRef } from 'react';

/**
 * WireframeLandscape - Ultra-Premium World-Class Enterprise SaaS Vector Landscape
 * 
 * Engineered with state-of-the-art modern enterprise aesthetics (Stripe, Vercel, OpenAI, Velo):
 * - Luminous Optical-Fiber Data Pulses: Glowing data streams traveling smoothly along wave contour lines!
 * - Glassmorphic Sheen & Bevel Highlights: Luminous edge highlights giving 2D vector waves rich 3D depth.
 * - Interactive Mouse Parallax & Neural Constellations: Floating particles connect into gossamer AI neural networks!
 * - Radar Pulse Sweep on Dot Matrix Grids: Dynamic light sweeps lighting up the 5x5 and 6x6 halftone matrices.
 * - Orbital Glassmorphic Rings: Dual-border glowing rings with hypnotic orbital floating animation.
 * - Breathing Aurora Bloom: Soft ambient luminescence radiating from the center valley.
 */
const WireframeLandscape = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    let height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;

    // Interactive Mouse Parallax State
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    // 1. Floating AI Neural Constellation Particles
    const particleCount = 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 1.2 + Math.random() * 2.2,
      color: Math.random() > 0.45 ? 'rgba(59, 130, 246, ' : 'rgba(249, 115, 22, ',
      alphaOffset: Math.random() * Math.PI * 2,
    }));

    // 2. Optical Fiber Data Pulses traveling along contour lines
    const pulses = Array.from({ length: 12 }, (_, i) => ({
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      layer: i % 2 === 0 ? 'blue' : 'orange',
      lineIndex: Math.floor(Math.random() * 10) + 1,
      length: 0.12 + Math.random() * 0.15,
    }));

    // ─── RENDER LOOP ───
    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      const parallaxX = (mouse.x - width / 2) * 0.03;
      const parallaxY = (mouse.y - height / 2) * 0.03;

      // ─── 0. BREATHING AURORA BLOOM IN CENTER VALLEY ───
      const auroraPulse = 0.12 + Math.sin(time * 0.8) * 0.04;
      const aurora = ctx.createRadialGradient(width * 0.5, height * 0.75, 50, width * 0.5, height * 0.75, width * 0.45);
      aurora.addColorStop(0, `rgba(96, 165, 250, ${auroraPulse})`);
      aurora.addColorStop(0.5, `rgba(249, 115, 22, ${auroraPulse * 0.6})`);
      aurora.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, width, height);

      // ─── 1. DOT MATRIX HALFTONE GRIDS WITH RADIAL RADAR PULSE ───
      // Top-Left Blue Dot Matrix (5x5 grid)
      const startXLeft = width * 0.04 + parallaxX * 0.5;
      const startYLeft = height * 0.05 + parallaxY * 0.5;
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          const dx = (startXLeft + c * 18) - (width * 0.08);
          const dy = (startYLeft + r * 18) - (height * 0.08);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radarSweep = Math.sin(dist * 0.05 - time * 3) * 0.5 + 0.5;
          const dotAlpha = 0.18 + radarSweep * 0.35;
          const dotRadius = 1.2 + radarSweep * 0.6;

          ctx.fillStyle = `rgba(59, 130, 246, ${dotAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(startXLeft + c * 18, startYLeft + r * 18, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Middle-Right Orange Dot Matrix (6x6 grid near trust pills)
      const startXRight = width * 0.86 - parallaxX * 0.5;
      const startYRight = height * 0.48 - parallaxY * 0.5;
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          const dx = (startXRight + c * 18) - (width * 0.90);
          const dy = (startYRight + r * 18) - (height * 0.55);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radarSweep = Math.sin(dist * 0.05 - time * 3 + 2) * 0.5 + 0.5;
          const dotAlpha = 0.18 + radarSweep * 0.35;
          const dotRadius = 1.2 + radarSweep * 0.6;

          ctx.fillStyle = `rgba(249, 115, 22, ${dotAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(startXRight + c * 18, startYRight + r * 18, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ─── 2. BOTTOM-LEFT LAYERED AZURE BLUE VECTOR WAVES & CONTOURS ───
      // Layer 1 (Back/Lightest Blue Wave)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.42 + Math.sin(time * 0.8) * 15);
      ctx.bezierCurveTo(
        width * 0.15, height * 0.38 + Math.cos(time * 0.6) * 15,
        width * 0.30, height * 0.65 + Math.sin(time * 0.7) * 15,
        width * 0.48, height
      );
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradBlue1 = ctx.createLinearGradient(0, height * 0.4, width * 0.4, height);
      gradBlue1.addColorStop(0, 'rgba(219, 234, 254, 0.50)');
      gradBlue1.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
      ctx.fillStyle = gradBlue1;
      ctx.fill();

      // Delicate contour lines with Glassmorphic Sheen
      ctx.lineWidth = 0.85;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
      for (let i = 1; i <= 14; i++) {
        const offset = i * 18;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.42 + Math.sin(time * 0.8) * 15 + offset);
        ctx.bezierCurveTo(
          width * 0.15, height * 0.38 + Math.cos(time * 0.6) * 15 + offset * 0.8,
          width * 0.30, height * 0.65 + Math.sin(time * 0.7) * 15 + offset * 0.6,
          width * 0.48 - offset * 0.8, height
        );
        ctx.stroke();
      }
      ctx.restore();

      // Layer 2 (Middle Blue Wave Blob with Luminous Edge Highlight)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.58 + Math.cos(time * 0.7) * 12);
      ctx.bezierCurveTo(
        width * 0.12, height * 0.55 + Math.sin(time * 0.5) * 12,
        width * 0.22, height * 0.78 + Math.cos(time * 0.8) * 12,
        width * 0.34, height
      );
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradBlue2 = ctx.createLinearGradient(0, height * 0.55, width * 0.3, height);
      gradBlue2.addColorStop(0, 'rgba(147, 197, 253, 0.65)');
      gradBlue2.addColorStop(1, 'rgba(37, 99, 235, 0.18)');
      ctx.fillStyle = gradBlue2;
      ctx.fill();

      // Luminous Glassmorphic Edge Highlight along top crest
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.58 + Math.cos(time * 0.7) * 12);
      ctx.bezierCurveTo(
        width * 0.12, height * 0.55 + Math.sin(time * 0.5) * 12,
        width * 0.22, height * 0.78 + Math.cos(time * 0.8) * 12,
        width * 0.34, height
      );
      ctx.stroke();

      // Contour lines for Layer 2
      ctx.lineWidth = 0.85;
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.32)';
      for (let i = 1; i <= 8; i++) {
        const offset = i * 16;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.58 + Math.cos(time * 0.7) * 12 + offset);
        ctx.bezierCurveTo(
          width * 0.12, height * 0.55 + Math.sin(time * 0.5) * 12 + offset * 0.8,
          width * 0.22, height * 0.78 + Math.cos(time * 0.8) * 12 + offset * 0.6,
          width * 0.34 - offset * 0.7, height
        );
        ctx.stroke();
      }
      ctx.restore();

      // Layer 3 (Foreground Deep Azure Wave Blob)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.75 + Math.sin(time * 0.9) * 10);
      ctx.bezierCurveTo(
        width * 0.08, height * 0.72 + Math.cos(time * 0.7) * 10,
        width * 0.15, height * 0.88 + Math.sin(time * 0.6) * 10,
        width * 0.22, height
      );
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradBlue3 = ctx.createLinearGradient(0, height * 0.7, width * 0.2, height);
      gradBlue3.addColorStop(0, 'rgba(96, 165, 250, 0.85)');
      gradBlue3.addColorStop(1, 'rgba(37, 99, 235, 0.90)');
      ctx.fillStyle = gradBlue3;
      ctx.fill();

      // Luminous Edge Highlight for Layer 3
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.90)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.75 + Math.sin(time * 0.9) * 10);
      ctx.bezierCurveTo(
        width * 0.08, height * 0.72 + Math.cos(time * 0.7) * 10,
        width * 0.15, height * 0.88 + Math.sin(time * 0.6) * 10,
        width * 0.22, height
      );
      ctx.stroke();
      ctx.restore();

      // ─── 3. BOTTOM-RIGHT LAYERED WARM ORANGE WAVES & MESH TEXTURE ───
      // Layer 1 (Back/Lightest Peach Wave)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(width * 0.52, height);
      ctx.bezierCurveTo(
        width * 0.70, height * 0.65 + Math.sin(time * 0.7) * 15,
        width * 0.85, height * 0.38 + Math.cos(time * 0.8) * 15,
        width, height * 0.32 + Math.sin(time * 0.6) * 15
      );
      ctx.lineTo(width, height);
      ctx.closePath();
      const gradOrange1 = ctx.createLinearGradient(width * 0.6, height, width, height * 0.3);
      gradOrange1.addColorStop(0, 'rgba(254, 215, 170, 0.50)');
      gradOrange1.addColorStop(1, 'rgba(249, 115, 22, 0.05)');
      ctx.fillStyle = gradOrange1;
      ctx.fill();

      // Delicate mesh grid texture
      ctx.lineWidth = 0.85;
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.22)';
      for (let i = 1; i <= 14; i++) {
        const offset = i * 18;
        ctx.beginPath();
        ctx.moveTo(width * 0.52 + offset * 0.8, height);
        ctx.bezierCurveTo(
          width * 0.70 + offset * 0.6, height * 0.65 + Math.sin(time * 0.7) * 15 + offset * 0.5,
          width * 0.85, height * 0.38 + Math.cos(time * 0.8) * 15 + offset,
          width, height * 0.32 + Math.sin(time * 0.6) * 15 + offset
        );
        ctx.stroke();
      }
      ctx.restore();

      // Layer 2 (Middle Warm Orange Wave Blob with Luminous Sheen)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(width * 0.66, height);
      ctx.bezierCurveTo(
        width * 0.78, height * 0.78 + Math.cos(time * 0.6) * 12,
        width * 0.88, height * 0.55 + Math.sin(time * 0.7) * 12,
        width, height * 0.50 + Math.cos(time * 0.5) * 12
      );
      ctx.lineTo(width, height);
      ctx.closePath();
      const gradOrange2 = ctx.createLinearGradient(width * 0.7, height, width, height * 0.5);
      gradOrange2.addColorStop(0, 'rgba(253, 186, 116, 0.70)');
      gradOrange2.addColorStop(1, 'rgba(249, 115, 22, 0.22)');
      ctx.fillStyle = gradOrange2;
      ctx.fill();

      // Luminous Edge Highlight along orange crest
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.80)';
      ctx.beginPath();
      ctx.moveTo(width * 0.66, height);
      ctx.bezierCurveTo(
        width * 0.78, height * 0.78 + Math.cos(time * 0.6) * 12,
        width * 0.88, height * 0.55 + Math.sin(time * 0.7) * 12,
        width, height * 0.50 + Math.cos(time * 0.5) * 12
      );
      ctx.stroke();
      ctx.restore();

      // Layer 3 (Foreground Deep Orange Wave Blob)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(width * 0.78, height);
      ctx.bezierCurveTo(
        width * 0.86, height * 0.88 + Math.sin(time * 0.8) * 10,
        width * 0.92, height * 0.72 + Math.cos(time * 0.6) * 10,
        width, height * 0.68 + Math.sin(time * 0.7) * 10
      );
      ctx.lineTo(width, height);
      ctx.closePath();
      const gradOrange3 = ctx.createLinearGradient(width * 0.8, height, width, height * 0.7);
      gradOrange3.addColorStop(0, 'rgba(251, 146, 60, 0.88)');
      gradOrange3.addColorStop(1, 'rgba(249, 115, 22, 0.95)');
      ctx.fillStyle = gradOrange3;
      ctx.fill();

      // Luminous Edge Highlight for Layer 3
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = 'rgba(255, 247, 237, 0.90)';
      ctx.beginPath();
      ctx.moveTo(width * 0.78, height);
      ctx.bezierCurveTo(
        width * 0.86, height * 0.88 + Math.sin(time * 0.8) * 10,
        width * 0.92, height * 0.72 + Math.cos(time * 0.6) * 10,
        width, height * 0.68 + Math.sin(time * 0.7) * 10
      );
      ctx.stroke();
      ctx.restore();

      // ─── 4. OPTICAL-FIBER DATA PULSES (Traveling along contour lines!) ───
      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const offset = p.lineIndex * 18;
        const t = p.progress;

        if (p.layer === 'blue') {
          // Approximate point along blue contour line
          const startX = 0;
          const startY = height * 0.42 + Math.sin(time * 0.8) * 15 + offset;
          const endX = width * 0.48 - offset * 0.8;
          const endY = height;
          
          const pulseX = startX + (endX - startX) * t;
          const pulseY = startY + (endY - startY) * Math.pow(t, 1.2);

          const pulseGrad = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 12);
          pulseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          pulseGrad.addColorStop(0.3, 'rgba(96, 165, 250, 0.75)');
          pulseGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = pulseGrad;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 12, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Approximate point along orange contour line
          const startX = width * 0.52 + offset * 0.8;
          const startY = height;
          const endX = width;
          const endY = height * 0.32 + Math.sin(time * 0.6) * 15 + offset;

          const pulseX = startX + (endX - startX) * t;
          const pulseY = startY - (startY - endY) * Math.pow(t, 0.8);

          const pulseGrad = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 12);
          pulseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          pulseGrad.addColorStop(0.3, 'rgba(253, 186, 116, 0.75)');
          pulseGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');
          ctx.fillStyle = pulseGrad;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ─── 5. ORBITAL GLASSMORPHIC ACCENT RINGS (`〇`) ───
      const drawGlassRing = (rx, ry, radius, color, glowColor, tilt) => {
        // Outer ambient glow halo
        ctx.fillStyle = glowColor;
        ctx.beginPath();
        ctx.arc(rx, ry, radius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Dual border ring
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(rx, ry, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 0.75;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(rx, ry, radius - 3, 0, Math.PI * 2);
        ctx.stroke();
      };

      // Top-Left Blue Ring
      drawGlassRing(
        width * 0.16 + parallaxX * 0.8,
        height * 0.07 + Math.sin(time * 1.2) * 6 + parallaxY * 0.8,
        17, 'rgba(59, 130, 246, 0.60)', 'rgba(59, 130, 246, 0.12)', time
      );

      // Bottom-Left Blue Ring
      drawGlassRing(
        width * 0.18 + parallaxX * 1.0,
        height * 0.68 + Math.cos(time * 1.0) * 8 + parallaxY * 1.0,
        19, 'rgba(96, 165, 250, 0.70)', 'rgba(59, 130, 246, 0.15)', -time
      );

      // Top-Right Orange Ring 1 (large)
      drawGlassRing(
        width * 0.82 - parallaxX * 0.8,
        height * 0.03 + Math.sin(time * 1.1) * 6 - parallaxY * 0.8,
        14, 'rgba(253, 186, 116, 0.70)', 'rgba(249, 115, 22, 0.12)', time * 1.5
      );

      // Top-Right Orange Ring 2 (small)
      drawGlassRing(
        width * 0.77 - parallaxX * 0.6,
        height * 0.12 + Math.cos(time * 1.3) * 5 - parallaxY * 0.6,
        9, 'rgba(249, 115, 22, 0.60)', 'rgba(249, 115, 22, 0.10)', -time * 1.2
      );

      // ─── 6. INTERACTIVE AI NEURAL CONSTELLATIONS ───
      particles.forEach((p, i) => {
        p.x += p.vx + Math.sin(time + p.alphaOffset) * 0.25;
        p.y += p.vy + Math.cos(time * 0.8 + p.alphaOffset) * 0.20;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        const pulseAlpha = 0.35 + Math.sin(time * 2 + p.alphaOffset) * 0.25;
        ctx.fillStyle = p.color + `${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles with gossamer neural lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.18;
            ctx.lineWidth = 0.65;
            ctx.strokeStyle = p.color + `${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particles near mouse cursor
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          const mouseAlpha = (1 - distMouse / 150) * 0.28;
          ctx.lineWidth = 0.85;
          ctx.strokeStyle = `rgba(147, 197, 253, ${mouseAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

export default WireframeLandscape;
