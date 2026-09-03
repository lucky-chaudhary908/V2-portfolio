// ===============================
// EASY EDITS
// ===============================
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/lucky-chaudhary-001b62312/", // paste your LinkedIn URL here
  github: "https://github.com/lucky-chaudhary908"    // paste your GitHub URL here
};

document.getElementById("linkedinLink").href = SOCIAL_LINKS.linkedin;
document.getElementById("githubLink").href = SOCIAL_LINKS.github;

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Cursor glow
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// Page reading progress
const progress = document.querySelector(".page-progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${(scrollY / max) * 100}%`;
});

// Hero 3D parallax
const heroStage = document.getElementById("heroStage");
const core = document.getElementById("core3d");
window.addEventListener("pointermove", e => {
  if (innerWidth < 950) return;
  const x = (e.clientX / innerWidth - .5);
  const y = (e.clientY / innerHeight - .5);
  heroStage.style.transform = `rotateY(${x*8}deg) rotateX(${-y*6}deg)`;
  core.style.transform = `translateY(${-y*12}px) rotateX(${y*10}deg) rotateY(${x*18}deg)`;
});

// 3D tilt cards
for (const card of document.querySelectorAll("[data-tilt]")) {
  card.addEventListener("pointermove", e => {
    if (innerWidth < 700) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(1000px) rotateX(${-y*6}deg) rotateY(${x*7}deg) translateZ(6px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
}

// Magnetic buttons
for (const el of document.querySelectorAll(".magnetic")) {
  el.addEventListener("pointermove", e => {
    if (innerWidth < 700) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX-r.left-r.width/2)*.18;
    const y = (e.clientY-r.top-r.height/2)*.18;
    el.style.transform = `translate(${x}px,${y}px)`;
  });
  el.addEventListener("pointerleave", () => el.style.transform = "");
}

// Lightweight interactive particle field — no libraries required.
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [], mouse = {x:-9999,y:-9999};
function resize(){ canvas.width=innerWidth*devicePixelRatio; canvas.height=innerHeight*devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
function seed(){
  particles = Array.from({length:Math.min(110, Math.floor(innerWidth/10))}, () => ({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.3+.3
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const p of particles){
    const dx=mouse.x-p.x,dy=mouse.y-p.y,d=Math.hypot(dx,dy)||1;
    if(d<140){p.x-=dx/d*.12;p.y-=dy/d*.12}
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>innerWidth)p.vx*=-1;
    if(p.y<0||p.y>innerHeight)p.vy*=-1;
    ctx.fillStyle="rgba(156,255,0,.5)";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  }
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
    const a=particles[i],b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<95){ctx.strokeStyle=`rgba(255,255,255,${.035*(1-d/95)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  }
  requestAnimationFrame(draw);
}
window.addEventListener("pointermove",e=>{mouse.x=e.clientX;mouse.y=e.clientY});
window.addEventListener("resize",()=>{resize();seed()});
resize();seed();draw();
