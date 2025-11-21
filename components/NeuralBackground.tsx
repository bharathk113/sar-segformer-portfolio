import React, { useEffect, useRef } from 'react';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Track mouse position and activity state relative to the canvas
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    // Extended particle interface to support physics
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
    }

    const particles: Particle[] = [];
    const connectionDistance = 150;
    const mouseDistance = 200; // Radius of mouse influence
    const color = '34, 211, 238'; // RGB for Tailwind cyan-400

    const init = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      
      particles.length = 0;
      // Responsive particle count
      const particleCount = Math.min(Math.floor((width * height) / 12000), 100); 

      for (let i = 0; i < particleCount; i++) {
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        // Mouse Interaction Physics
        if (mouse.current.active) {
            const dx = mouse.current.x - p.x;
            const dy = mouse.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < mouseDistance) {
                // Calculate attraction force (stronger when closer)
                const force = (mouseDistance - dist) / mouseDistance;
                const angle = Math.atan2(dy, dx);
                const attractionStrength = 0.03;
                
                // Gently accelerate particle towards mouse
                p.vx += Math.cos(angle) * force * attractionStrength;
                p.vy += Math.sin(angle) * force * attractionStrength;
            }
        }

        // Drag/Friction - return to base velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary check (Bounce)
        if (p.x < 0 || p.x > width) { p.vx *= -1; p.baseVx *= -1; p.x = Math.max(0, p.x); }
        if (p.y < 0 || p.y > height) { p.vy *= -1; p.baseVy *= -1; p.y = Math.max(0, p.y); }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.fill();

        // Draw Connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - dist / connectionDistance;
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.2})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw Connections to Mouse
        if (mouse.current.active) {
            const dx = mouse.current.x - p.x;
            const dy = mouse.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseDistance) {
                ctx.beginPath();
                const opacity = 1 - dist / mouseDistance;
                // Mouse connections are slightly brighter/thicker
                ctx.strokeStyle = `rgba(${color}, ${opacity * 0.4})`; 
                ctx.lineWidth = 1.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.current.x, mouse.current.y);
                ctx.stroke();
            }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
        mouse.current.active = true;
    };

    const handleMouseLeave = () => {
        mouse.current.active = false;
    };

    // Attach listeners to window to ensure smooth tracking even if cursor moves fast
    window.addEventListener('mousemove', handleMouseMove);
    // Check if mouse leaves the window or specific area
    window.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget) {
            handleMouseLeave();
        }
    });
    window.addEventListener('resize', init);

    init();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0" 
    />
  );
};