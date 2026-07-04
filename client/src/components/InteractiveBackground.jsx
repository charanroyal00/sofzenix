import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const path = location.pathname;
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track Mouse
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particles Setup (Page-specific parameters)
    const particleCount = 35;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -0.1 - Math.random() * 0.22,
        radius: 0.9 + Math.random() * 1.3,
        alpha: 0.08 + Math.random() * 0.12,
        pulseSpeed: 0.012 + Math.random() * 0.02,
        pulseVal: Math.random(),
        // For Services grid-tracing:
        gridX: Math.floor(Math.random() * 20) * 48,
        gridY: Math.floor(Math.random() * 15) * 48,
        gridSpeed: 0.8 + Math.random() * 1.2,
        direction: Math.floor(Math.random() * 4),
        // For Partners abstract shapes:
        size: 8 + Math.random() * 15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: 0.002 + Math.random() * 0.005,
        shapeType: idx => (idx % 3 === 0 ? 'circle' : idx % 3 === 1 ? 'square' : 'triangle')
      });
    }

    // Static Connected Nodes for About Page
    const staticNodes = [
      { x: width * 0.2, y: height * 0.3, radius: 4 },
      { x: width * 0.35, y: height * 0.25, radius: 5 },
      { x: width * 0.3, y: height * 0.5, radius: 3 },
      { x: width * 0.55, y: height * 0.35, radius: 6 },
      { x: width * 0.5, y: height * 0.6, radius: 4 },
      { x: width * 0.75, y: height * 0.45, radius: 5 },
      { x: width * 0.8, y: height * 0.25, radius: 4 },
      { x: width * 0.7, y: height * 0.7, radius: 3 },
      { x: width * 0.85, y: height * 0.65, radius: 5 }
    ];

    // Ambient Orbs (Standard Pastel setup)
    const orbs = [
      { x: width * 0.15, y: height * 0.25, baseRadius: 360, color: 'rgba(37, 99, 235, 0.04)', angle: 0, speed: 0.00018 },
      { x: width * 0.82, y: height * 0.2, baseRadius: 380, color: 'rgba(245, 158, 11, 0.03)', angle: Math.PI / 4, speed: 0.00013 },
      { x: width * 0.22, y: height * 0.82, baseRadius: 320, color: 'rgba(226, 92, 255, 0.03)', angle: Math.PI * 0.75, speed: 0.00022 }
    ];

    let time = 0;
    
    // Animation Loop
    const draw = () => {
      time += 0.01;
      const scrollY = window.scrollY;
      const parallaxFactor = 0.12;
      
      // Base Solid Fill (#F8FAFC)
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      // Slow Aurora Mesh Gradient
      const meshX = width / 2 + Math.sin(time * 0.025) * (width * 0.12);
      const meshY = height / 2 + Math.cos(time * 0.02) * (height * 0.12) - scrollY * parallaxFactor;
      
      const meshGrad = ctx.createRadialGradient(
        meshX, 
        meshY, 
        width * 0.15, 
        width / 2, 
        height / 2 - scrollY * parallaxFactor, 
        width * 0.85
      );
      meshGrad.addColorStop(0, '#EEF4FF');
      meshGrad.addColorStop(0.5, '#EAF4FF');
      meshGrad.addColorStop(1, '#F8FAFC');
      ctx.fillStyle = meshGrad;
      ctx.fillRect(0, 0, width, height);

      // Mouse Spotlight
      if (mouseRef.current.active) {
        const mouseGrad = ctx.createRadialGradient(
          mouseRef.current.x, 
          mouseRef.current.y, 
          0, 
          mouseRef.current.x, 
          mouseRef.current.y, 
          220
        );
        mouseGrad.addColorStop(0, 'rgba(37, 99, 235, 0.035)');
        mouseGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.008)');
        mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- PAGE-SPECIFIC RENDERING ENGINE ---
      
      if (path === '/' || path === '/home') {
        // --- 1. HOME: Animated technology network with floating blobs & grid ---
        
        // Grid
        ctx.fillStyle = 'rgba(37, 99, 235, 0.012)';
        const dotSpacing = 48;
        for (let x = (Math.sin(time * 0.01) * 3) % dotSpacing; x < width; x += dotSpacing) {
          for (let y = -scrollY % dotSpacing; y < height; y += dotSpacing) {
            ctx.fillRect(x, y, 1, 1);
          }
        }

        // Ambient Orbs
        orbs.forEach((orb) => {
          if (!reducedMotion) {
            orb.angle += orb.speed;
            orb.x += Math.sin(orb.angle) * 0.15;
            orb.y += Math.cos(orb.angle) * 0.15;
          }
          const currentY = orb.y - scrollY * parallaxFactor;
          const orbGrad = ctx.createRadialGradient(orb.x, currentY, 15, orb.x, currentY, orb.baseRadius);
          orbGrad.addColorStop(0, orb.color);
          orbGrad.addColorStop(1, 'rgba(248, 250, 252, 0)');
          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(orb.x, currentY, orb.baseRadius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Connections
        ctx.lineWidth = 0.35;
        particles.forEach((p, idx) => {
          if (!reducedMotion) {
            p.x += p.vx + Math.sin(time * 0.35 + p.pulseVal) * 0.035;
            p.y += p.vy;
            if (p.y < 0) { p.y = height; p.x = Math.random() * width; }
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
          }

          // Lines
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 115) {
              const lineAlpha = (1 - dist / 115) * 0.04;
              ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Nodes
          p.pulseVal += p.pulseSpeed;
          const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.025;
          ctx.fillStyle = `rgba(37, 99, 235, ${currentAlpha * 0.12})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(37, 99, 235, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (path === '/about') {
        // --- 2. ABOUT: Connected technology nodes (pulse node connections) ---
        ctx.lineWidth = 0.45;
        
        // Draw static connections
        for (let i = 0; i < staticNodes.length; i++) {
          const n1 = staticNodes[i];
          const adjY1 = n1.y - scrollY * parallaxFactor;
          
          for (let j = i + 1; j < staticNodes.length; j++) {
            const n2 = staticNodes[j];
            const adjY2 = n2.y - scrollY * parallaxFactor;
            const dist = Math.sqrt((n1.x - n2.x) ** 2 + (adjY1 - adjY2) ** 2);

            // Connect if reasonably close
            if (dist < 320) {
              const pulse = 0.02 + Math.sin(time * 0.8 + i * 0.5) * 0.02;
              ctx.strokeStyle = `rgba(37, 99, 235, ${pulse})`;
              ctx.beginPath();
              ctx.moveTo(n1.x, adjY1);
              ctx.lineTo(n2.x, adjY2);
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        staticNodes.forEach((node, idx) => {
          const adjY = node.y - scrollY * parallaxFactor;
          const pulseRadius = node.radius + Math.sin(time * 1.5 + idx) * 1.2;
          
          ctx.fillStyle = 'rgba(37, 99, 235, 0.03)';
          ctx.beginPath();
          ctx.arc(node.x, adjY, pulseRadius * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
          ctx.beginPath();
          ctx.arc(node.x, adjY, node.radius, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (path === '/services') {
        // --- 3. SERVICES: Animated grid with moving dots along grid lines ---
        const dotSpacing = 48;
        
        // Draw prominent light grid
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.015)';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < width; x += dotSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = -scrollY % dotSpacing; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Drifting dots along grid coordinates
        particles.forEach((p) => {
          if (!reducedMotion) {
            // Move dot along horizontal/vertical grids
            if (p.direction === 0) p.gridX += p.gridSpeed; // Right
            else if (p.direction === 1) p.gridX -= p.gridSpeed; // Left
            else if (p.direction === 2) p.gridY += p.gridSpeed; // Down
            else p.gridY -= p.gridSpeed; // Up

            // boundary warp
            if (p.gridX < 0) p.gridX = width;
            if (p.gridX > width) p.gridX = 0;
            if (p.gridY < 0) p.gridY = height;
            if (p.gridY > height) p.gridY = 0;

            // Randomly turn at intersections
            if (Math.random() < 0.005) {
              p.direction = Math.floor(Math.random() * 4);
              p.gridX = Math.round(p.gridX / dotSpacing) * dotSpacing;
              p.gridY = Math.round(p.gridY / dotSpacing) * dotSpacing;
            }
          }

          const adjGridY = p.gridY - scrollY * parallaxFactor;
          ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
          ctx.beginPath();
          ctx.arc(p.gridX, adjGridY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (path === '/portfolio') {
        // --- 4. PORTFOLIO: Soft flowing gradients ---
        const speed = time * 0.05;
        
        const flowOrbs = [
          { x: width / 2 + Math.sin(speed) * (width * 0.22), y: height / 2 + Math.cos(speed * 0.8) * (height * 0.2) },
          { x: width * 0.2 + Math.cos(speed * 0.7) * (width * 0.15), y: height * 0.7 + Math.sin(speed * 1.1) * (height * 0.15) },
          { x: width * 0.8 + Math.sin(speed * 1.2) * (width * 0.15), y: height * 0.3 + Math.cos(speed * 0.9) * (height * 0.15) }
        ];

        flowOrbs.forEach((orb, i) => {
          const adjY = orb.y - scrollY * parallaxFactor;
          const radius = 400 + Math.sin(time * 0.1 + i) * 60;
          const color = i === 0 ? 'rgba(37, 99, 235, 0.045)' : i === 1 ? 'rgba(226, 92, 255, 0.035)' : 'rgba(56, 189, 248, 0.04)';
          
          const grad = ctx.createRadialGradient(orb.x, adjY, 20, orb.x, adjY, radius);
          grad.addColorStop(0, color);
          grad.addColorStop(1, 'rgba(248, 250, 252, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(orb.x, adjY, radius, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (path === '/partners') {
        // --- 5. PARTNERS: Floating abstract geometric shapes slowly rotating ---
        particles.forEach((p, idx) => {
          if (!reducedMotion) {
            p.x += p.vx * 0.8;
            p.y += p.vy * 0.8;
            p.rotation += p.rotSpeed;

            if (p.y < 0) p.y = height;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
          }

          const adjY = p.y - scrollY * parallaxFactor;
          ctx.strokeStyle = 'rgba(37, 99, 235, 0.035)';
          ctx.lineWidth = 1;
          ctx.save();
          ctx.translate(p.x, adjY);
          ctx.rotate(p.rotation);

          const shape = p.shapeType(idx);
          ctx.beginPath();
          if (shape === 'circle') {
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          } else if (shape === 'square') {
            ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
          } else {
            // Triangle
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(p.size / 2, p.size / 2);
            ctx.lineTo(-p.size / 2, p.size / 2);
            ctx.closePath();
          }
          ctx.stroke();
          ctx.restore();
        });

      } else {
        // --- 6. CONTACT / HIRE / OTHER: Mesh gradient with subtle drifting particles ---
        particles.forEach((p) => {
          if (!reducedMotion) {
            p.x += p.vx * 0.5;
            p.y += p.vy * 0.6;
            if (p.y < 0) p.y = height;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
          }

          const adjY = p.y - scrollY * parallaxFactor;
          p.pulseVal += p.pulseSpeed;
          const alpha = p.alpha + Math.sin(p.pulseVal) * 0.03;
          ctx.fillStyle = `rgba(37, 99, 235, ${alpha * 0.2})`;
          ctx.beginPath();
          ctx.arc(p.x, adjY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Vignette Overlay (Soft light slate)
      const vignetteGrad = ctx.createRadialGradient(
        width / 2, 
        height / 2, 
        width * 0.35, 
        width / 2, 
        height / 2, 
        width * 0.95
      );
      vignetteGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignetteGrad.addColorStop(1, 'rgba(241, 245, 249, 0.45)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, path]);

  return (
    <>
      {/* Dynamic Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-[#F8FAFC]"
      />
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-noise opacity-[0.01]" />
    </>
  );
};

export default InteractiveBackground;
