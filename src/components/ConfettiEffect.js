export const createConfetti = () => {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 'var(--z-confetti)';
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const colors = ['#4F46E5', '#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'];
  
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + (Math.random() * 200 - 100),
      r: Math.random() * 6 + 2,
      dx: Math.random() * 20 - 10,
      dy: Math.random() * -20 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncrement: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }
  
  let animationId;
  let time = 0;
  
  const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    time++;
    if (time > 300) {
      // Fade out
      ctx.globalAlpha = Math.max(0, 1 - (time - 300) / 50);
      if (time > 350) {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
    }
    
    particles.forEach(p => {
      p.tiltAngle += p.tiltAngleIncrement;
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.5; // gravity
      
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
      ctx.stroke();
    });
  };
  
  animationId = requestAnimationFrame(animate);
};
