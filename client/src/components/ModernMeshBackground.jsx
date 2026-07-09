import { useEffect, useRef, useState } from 'react';

/**
 * Clean, Simple & Minimalist Geometric Tech Network Background
 * Inspired by Swiss/Vercel minimalist aesthetic (matching image_3 reference).
 * Ultra-lightweight: zero heavy radial glows, zero complex auroras, 100% 60-FPS lag-free.
 */
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
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    let parallaxX = 0;
    let parallaxY = 0;

    // Localized mouse tracking for subtle interactive connection
    const localMouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      localMouse.x = e.clientX - rect.left;
      localMouse.y = e.clientY - rect.top;
      localMouse.active = true;
    };
    const handleMouseLeave = () => { localMouse.active = false; };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let isTabActive = true;
    const handleVisibilityChange = () => { isTabActive = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0 });
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    // ─── INITIALIZE MINIMALIST GEOMETRIC NODES (`Exact match to image_3.png`) ───
    const nodeCount = isMobile ? 12 : 24;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      // Cluster some on right & left, and ambient connectors in center
      let x, y;
      if (i < Math.floor(nodeCount * 0.40)) {
        x = width * (0.75 + (Math.random() - 0.5) * 0.24);
        y = height * (0.38 + (Math.random() - 0.5) * 0.45);
      } else if (i < Math.floor(nodeCount * 0.75)) {
        x = width * (0.22 + (Math.random() - 0.5) * 0.24);
        y = height * (0.58 + (Math.random() - 0.5) * 0.45);
      } else {
        x = width * (0.2 + Math.random() * 0.6);
        y = height * (0.15 + Math.random() * 0.7);
      }

      const isSquare = Math.random() > 0.35; // Most nodes are clean squares/blocks exactly like image_3.png
      const size = Math.random() * 3.2 + 3.2; // Crisp light-thick sizes (`3.2px to 6.4px`)

      // Light blue & Orange tones (`#38BDF8` / `#3B82F6` and `#F97316` / `#FB923C`) with clean 78% opacity (`light thick`)
      const isBlue = Math.random() < 0.60;
      const color = isBlue ? 'rgba(56, 189, 248, 0.78)' : 'rgba(249, 115, 22, 0.78)';
      const lineColor = isBlue ? 'rgba(56, 189, 248, ' : 'rgba(249, 115, 22, ';

      // Fast, dynamic brisk movement as requested
      const speedMult = isMobile ? 1.0 : 1.7;
      const vx = ((Math.random() - 0.5) * 1.5 + (Math.random() < 0.5 ? -0.4 : 0.4)) * speedMult;
      const vy = ((Math.random() - 0.5) * 1.5 + (Math.random() < 0.5 ? -0.4 : 0.4)) * speedMult;

      nodes.push({
        x: Math.max(30, Math.min(width - 30, x)),
        y: Math.max(30, Math.min(height - 30, y)),
        vx,
        vy,
        size,
        isSquare,
        color,
        lineColor,
        z: Math.random() * 0.5 + 0.5
      });
    }

    let lastFrameTime = 0;

    // ─── RENDER ENGINE ───
    const render = (timestamp) => {
      if (!isTabActive || !isIntersecting) { rafId = requestAnimationFrame(render); return; }
      if (timestamp - lastFrameTime < 33) { rafId = requestAnimationFrame(render); return; }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      // Smooth subtle mouse parallax
      const targetParallaxX = mouseX && typeof mouseX.get === 'function' ? (mouseX.get() / (width || 1)) * 15 : 0;
      const targetParallaxY = mouseY && typeof mouseY.get === 'function' ? (mouseY.get() / (height || 1)) * 15 : 0;
      parallaxX += (targetParallaxX - parallaxX) * 0.08;
      parallaxY += (targetParallaxY - parallaxY) * 0.08;

      // ── 1. CLEAN, MINIMALIST BRIGHT WHITE BASE (`Not heavy`) ──
      const baseGrad = ctx.createLinearGradient(0, 0, 0, height);
      baseGrad.addColorStop(0, '#FFFFFF');
      baseGrad.addColorStop(0.6, '#FAFBFC');
      baseGrad.addColorStop(1, '#F8FAFC');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // ── 2. UPDATE & RENDER MINIMALIST NETWORK (`image_3.png with fast movement & blue/orange`) ──
      nodes.forEach(node => {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 15 || node.x > width - 15) node.vx *= -1;
          if (node.y < 15 || node.y > height - 15) node.vy *= -1;
        }
      });

      // Draw crisp, light-thick connecting web lines (`1.3px width`) in light blue & orange
      ctx.lineWidth = 1.3;
      const maxDist = isMobile ? 140 : 190;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        const px1 = n1.x + parallaxX * n1.z;
        const py1 = n1.y + parallaxY * n1.z;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const px2 = n2.x + parallaxX * n2.z;
          const py2 = n2.y + parallaxY * n2.z;

          const dx = px1 - px2;
          const dy = py1 - py2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            // Clean, light-thick blue / orange connecting lines
            const alpha = (1 - dist / maxDist) * 0.38 * ((n1.z + n2.z) / 2);
            ctx.strokeStyle = `${n1.lineColor}${alpha})`;
            ctx.beginPath();
            ctx.moveTo(px1, py1);
            ctx.lineTo(px2, py2);
            ctx.stroke();
          }
        }

        // Subtle clean mouse connection
        if (localMouse.active && !isMobile) {
          const mdx = px1 - localMouse.x;
          const mdy = py1 - localMouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140) {
            const mAlpha = (1 - mDist / 140) * 0.35;
            ctx.strokeStyle = `rgba(37, 99, 235, ${mAlpha})`;
            ctx.beginPath();
            ctx.moveTo(px1, py1);
            ctx.lineTo(localMouse.x, localMouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw crisp minimalist geometric nodes (`Squares & Dots exactly like image_3.png`)
      nodes.forEach(node => {
        const px = node.x + parallaxX * node.z;
        const py = node.y + parallaxY * node.z;

        ctx.fillStyle = node.color;
        if (node.isSquare) {
          // Clean geometric square block
          ctx.fillRect(px - node.size / 2, py - node.size / 2, node.size, node.size);
        } else {
          // Crisp circular dot
          ctx.beginPath();
          ctx.arc(px, py, node.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rafId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mouseX, mouseY, reducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#FFFFFF] overflow-hidden translate-z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

export default ModernMeshBackground;
