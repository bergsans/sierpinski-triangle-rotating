function convertToRadians(degree) {
  return degree * (Math.PI / 180);
}

function sTriangle (context, depth = 4, angle = -Math.PI / 2, alpha = 0.05) {
  if(!context) {
    const canvas = document.querySelector('#animation');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.scale(canvas.height * 0.5, canvas.height * 0.5);
    return sTriangle(ctx);
  }
  if (depth === 0) {
    context.beginPath()
    context.moveTo(Math.cos(angle), Math.sin(angle));
    for(let i = 0, a = angle; i < 3; a += Math.PI * 2 / 3, i++) {
      context.lineTo(Math.cos(a), Math.sin(a));
    }
    context.shadowBlur = 0;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = '#bf616a';
    context.fillStyle = `rgba(0,0,0,${alpha})`;
    context.fill();
  } else {
   for(let i = 0, a = angle; i < 3; a += Math.PI * 2 / 3, i++) {
     context.save();
     context.translate(Math.cos(a) * 0.5, Math.sin(a) * 0.5);
     context.scale(0.5, 0.5);
     sTriangle(context, depth - 1, angle, alpha + 0.02);
     context.restore();
   }
  }
  return context;
}

const drawingAngle = () => {
  let angle = 0;
  return () => angle > 360
    ? 0
    : angle++;
}

function animate(ctx) {
  ctx.rotate(convertToRadians(getAngle()));
  sTriangle(ctx);
  window.requestAnimationFrame(() => animate(ctx));
}

const initialContext = sTriangle();
const getAngle = drawingAngle();
window.requestAnimationFrame(() => animate(initialContext));



