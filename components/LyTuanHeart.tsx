import React, { useEffect, useRef, useState } from 'react';

interface LyTuanHeartProps {
  onBack: () => void;
}

const LyTuanHeart: React.FC<LyTuanHeartProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show subtitle after 1.5s
    const timer = setTimeout(() => setShowText(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;

    const settings = {
      particles: {
        length: 500,
        duration: 2,
        velocity: 100,
        effect: -0.75,
        size: 28,
      },
    };

    // Point class
    class Point {
      x: number;
      y: number;
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
      clone(): Point {
        return new Point(this.x, this.y);
      }
      length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
      setLength(len: number): Point {
        this.normalize();
        this.x *= len;
        this.y *= len;
        return this;
      }
      normalize(): Point {
        const len = this.length();
        if (len !== 0) {
          this.x /= len;
          this.y /= len;
        }
        return this;
      }
    }

    // Particle class
    class Particle {
      position = new Point();
      velocity = new Point();
      acceleration = new Point();
      age = 0;

      initialize(x: number, y: number, dx: number, dy: number) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
      }

      update(deltaTime: number) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
      }

      draw(ctx: CanvasRenderingContext2D, image: HTMLCanvasElement) {
        function ease(t: number) {
          return --t * t * t + 1;
        }
        const size = image.width * ease(this.age / settings.particles.duration);
        ctx.globalAlpha = 1 - this.age / settings.particles.duration;
        ctx.drawImage(
          image,
          this.position.x - size / 2,
          this.position.y - size / 2,
          size,
          size
        );
      }
    }

    // Particle Pool
    class ParticlePool {
      particles: Particle[];
      firstActive = 0;
      firstFree = 0;
      duration = settings.particles.duration;

      constructor(length: number) {
        this.particles = new Array(length);
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i] = new Particle();
        }
      }

      add(x: number, y: number, dx: number, dy: number) {
        this.particles[this.firstFree].initialize(x, y, dx, dy);
        this.firstFree++;
        if (this.firstFree === this.particles.length) this.firstFree = 0;
        if (this.firstActive === this.firstFree) this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
      }

      update(deltaTime: number) {
        let i: number;
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime);
          }
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].update(deltaTime);
          }
          for (i = 0; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime);
          }
        }
        while (
          this.particles[this.firstActive].age >= this.duration &&
          this.firstActive !== this.firstFree
        ) {
          this.firstActive++;
          if (this.firstActive === this.particles.length) this.firstActive = 0;
        }
      }

      draw(ctx: CanvasRenderingContext2D, image: HTMLCanvasElement) {
        let i: number;
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].draw(ctx, image);
          }
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].draw(ctx, image);
          }
          for (i = 0; i < this.firstFree; i++) {
            this.particles[i].draw(ctx, image);
          }
        }
      }
    }

    const particles = new ParticlePool(settings.particles.length);
    const particleRate = settings.particles.length / settings.particles.duration;
    let time: number;

    // Parametric heart formula with responsive screen scaling
    function pointOnHeart(t: number) {
      const isMobile = window.innerWidth < 640;
      const baseScale = isMobile
        ? Math.max(window.innerWidth / 480, 0.72)
        : Math.min(window.innerWidth / 1200, 1.1);

      return new Point(
        baseScale * 160 * Math.pow(Math.sin(t), 3),
        baseScale *
          (130 * Math.cos(t) -
            50 * Math.cos(2 * t) -
            20 * Math.cos(3 * t) -
            10 * Math.cos(4 * t) +
            25)
      );
    }

    // Pre-render particle texture
    const image = (function () {
      const pCanvas = document.createElement('canvas');
      const pCtx = pCanvas.getContext('2d');
      if (!pCtx) return pCanvas;
      pCanvas.width = settings.particles.size;
      pCanvas.height = settings.particles.size;

      function to(t: number) {
        const point = pointOnHeart(t);
        point.x =
          settings.particles.size / 2 +
          (point.x * settings.particles.size) / 350;
        point.y =
          settings.particles.size / 2 -
          (point.y * settings.particles.size) / 350;
        return point;
      }

      pCtx.beginPath();
      let t = -Math.PI;
      let point = to(t);
      pCtx.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        pCtx.lineTo(point.x, point.y);
      }
      pCtx.closePath();

      // Radiant Rose Gold Gradient
      const grad = pCtx.createLinearGradient(
        0,
        0,
        settings.particles.size,
        settings.particles.size
      );
      grad.addColorStop(0, '#f43f5e');
      grad.addColorStop(0.5, '#fb7185');
      grad.addColorStop(1, '#fda4af');
      pCtx.fillStyle = grad;
      pCtx.fill();

      return pCanvas;
    })();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const newTime = new Date().getTime() / 1000;
      const rawDelta = newTime - (time || newTime);
      // Clamp deltaTime to 50ms to avoid bursts after switching browser tabs
      const deltaTime = Math.min(rawDelta, 0.05);
      time = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles
      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().setLength(settings.particles.velocity);
        particles.add(
          canvas.width / 2 + pos.x,
          canvas.height / 2 - pos.y,
          dir.x,
          -dir.y
        );
      }

      particles.update(deltaTime);
      particles.draw(context, image);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#090306] flex flex-col items-center justify-center overflow-hidden select-none animate-fade-in p-4">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Center text inside the beating heart */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-3 sm:px-6 transition-all duration-1000 transform ${
          showText ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_25px_rgba(244,63,94,0.6)] mb-2">
          Happy 20.10 🌸
        </h1>
        <p className="font-serif italic text-sm sm:text-xl text-rose-200/90 drop-shadow max-w-xs sm:max-w-md mb-6 sm:mb-8 leading-relaxed">
          "Chúc em luôn rạng rỡ, an yên và gặp được những điều ngọt ngào nhất."
        </p>
      </div>

      {/* Floating control buttons */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 text-xs sm:text-sm font-semibold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Quay lại khu vườn 🌸</span>
        </button>
      </div>
    </div>
  );
};

export default LyTuanHeart;
