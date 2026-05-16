// src/components/NeuralBackground.jsx

import { useEffect, useRef } from "react";

export default function NeuralBackground({
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrameId;

    let width = 0;
    let height = 0;

    const devicePixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    let particles = [];

    // ================= CREATE PARTICLES =================

    const createParticles = () => {
      const particleCount = Math.floor(
        (width * height) / 18000
      );

      particles = Array.from(
        {
          length: Math.max(
            35,
            Math.min(90, particleCount)
          ),
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,

          vx:
            (Math.random() - 0.5) * 0.35,

          vy:
            (Math.random() - 0.5) * 0.35,

          radius:
            Math.random() * 1.8 + 0.8,
        })
      );
    };

    // ================= RESIZE =================

    const resizeCanvas = () => {
      const rect =
        canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas.width =
        width * devicePixelRatio;

      canvas.height =
        height * devicePixelRatio;

      ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );

      createParticles();
    };

    // ================= DRAW =================

    const render = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      // ========= DRAW CONNECTIONS =========

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const a = particles[i];

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.hypot(
            dx,
            dy
          );

          if (distance < 140) {
            const opacity =
              (1 - distance / 140) * 0.35;

            const gradient =
              ctx.createLinearGradient(
                a.x,
                a.y,
                b.x,
                b.y
              );

            gradient.addColorStop(
              0,
              `rgba(0,212,255,${opacity})`
            );

            gradient.addColorStop(
              1,
              `rgba(124,77,255,${opacity})`
            );

            ctx.strokeStyle = gradient;

            ctx.lineWidth = 0.8;

            ctx.beginPath();

            ctx.moveTo(a.x, a.y);

            ctx.lineTo(b.x, b.y);

            ctx.stroke();
          }
        }
      }

      // ========= DRAW PARTICLES =========

      particles.forEach((particle) => {
        if (!prefersReducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        // Bounce
        if (
          particle.x <= 0 ||
          particle.x >= width
        ) {
          particle.vx *= -1;
        }

        if (
          particle.y <= 0 ||
          particle.y >= height
        ) {
          particle.vy *= -1;
        }

        // Particle
        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(0,212,255,0.9)";

        ctx.shadowColor =
          "rgba(0,212,255,0.9)";

        ctx.shadowBlur = 12;

        ctx.fill();

        ctx.shadowBlur = 0;
      });

      animationFrameId =
        requestAnimationFrame(render);
    };

    resizeCanvas();

    render();

    // ================= EVENTS =================

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // ================= CLEANUP =================

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}