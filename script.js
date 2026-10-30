(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.querySelector('.page-loader');
  const afterLoad = () => {if(loader) loader.classList.add('hidden');};
  if (document.readyState === 'complete') setTimeout(afterLoad, 450);
  else addEventListener('load', () => setTimeout(afterLoad, 450), {once:true});
  setTimeout(afterLoad, 2000);
  document.getElementById('copyright-year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));

  const navButton = document.getElementById('menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  function setMenu(open) {
    if (!navButton || !mobileNav) return;
    document.body.classList.toggle('nav-open', open);
    navButton.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    navButton.setAttribute('aria-expanded', String(open));
    navButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  navButton?.addEventListener('click', () => setMenu(!mobileNav.classList.contains('open')));
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {if(e.key === 'Escape') setMenu(false)});
  const header = document.getElementById('site-header');
  const progress = document.querySelector('.scroll-meter');
  let scrollScheduled = false;
  function handleScroll() {
    if (header) header.classList.toggle('scrolled', scrollY > 120);
    if (progress) {
      const denom = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      progress.style.width = (scrollY / denom * 100) + '%';
    }
    scrollScheduled = false;
  }
  addEventListener('scroll', () => {if (!scrollScheduled) {requestAnimationFrame(handleScroll);scrollScheduled=true}}, {passive:true});
  handleScroll();

  const reveals = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target)}
    }), {threshold:.09, rootMargin:'0px 0px -30px 0px'});
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el=>el.classList.add('visible'));

  // Smooth cursor and magnetic button behavior are progressive enhancement only.
  const fine = matchMedia('(pointer: fine) and (hover: hover)').matches;
  if (fine && !reduce) {
    const dot = document.querySelector('.cursor-dot');
    const halo = document.querySelector('.cursor-halo');
    let targetX = -100, targetY = -100, x = -100, y = -100;
    document.addEventListener('pointermove', e => { targetX=e.clientX; targetY=e.clientY; if (dot) {dot.style.left=targetX+'px';dot.style.top=targetY+'px'} }, {passive:true});
    const animateCursor = () => {x+=(targetX-x)*.13;y+=(targetY-y)*.13;if(halo){halo.style.left=x+'px';halo.style.top=y+'px'}requestAnimationFrame(animateCursor)};
    requestAnimationFrame(animateCursor);
    document.querySelectorAll('a,button').forEach(el => {el.addEventListener('mouseenter',()=>halo?.classList.add('hover'));el.addEventListener('mouseleave',()=>halo?.classList.remove('hover'))});
    document.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const dx=e.clientX-(r.left+r.width/2);const dy=e.clientY-(r.top+r.height/2);el.style.transform=`translate(${dx*.085}px,${dy*.14}px)`});
      el.addEventListener('pointerleave',()=>{el.style.transform='translate(0,0)'})
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.project-card[data-category]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const category=btn.dataset.filter;
    filters.forEach(f=>{const active=f===btn;f.classList.toggle('active',active);f.setAttribute('aria-pressed',String(active))});
    cards.forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category});
  }));

  // Ambient canvas particles: decorative, responsive and low density; honors reduced motion.
  const canvas=document.getElementById('hero-canvas');
  if (canvas && !reduce) {
    const ctx=canvas.getContext('2d');
    if(ctx){
      let particles=[], w=0,h=0, dpr=1, last=0, frame=0;
      const pointer={x:-1000,y:-1000};
      const parent=canvas.parentElement;
      parent.addEventListener('pointermove', e => {const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top},{passive:true});
      parent.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000});
      function resize(){const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);let count=Math.min(75,Math.max(25,Math.round(w*h/15000)));particles=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.26,vy:(Math.random()-.5)*.26,r:Math.random()*1.3+.35}))}
      resize();addEventListener('resize',resize,{passive:true});
      const draw=(t)=>{if(t-last<29){frame=requestAnimationFrame(draw);return}last=t;ctx.clearRect(0,0,w,h);particles.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(241,239,228,.38)';ctx.fill();if(i%3===0){const dist=Math.hypot(p.x-pointer.x,p.y-pointer.y);if(dist<150){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x,pointer.y);ctx.strokeStyle=`rgba(239,112,75,${.14*(1-dist/150)})`;ctx.stroke()}}});frame=requestAnimationFrame(draw)};
      frame=requestAnimationFrame(draw);
      document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(frame);else frame=requestAnimationFrame(draw)});
    }
  }// ==========================================
// CREDENTIALS CAROUSEL
// Scroll one credential card per arrow click.
// ==========================================

const credentialCarousel = document.querySelector(
  '[data-credential-carousel]'
);

if (credentialCarousel) {
  const viewport = credentialCarousel.querySelector(
    '.credential-carousel-viewport'
  );

  const track = credentialCarousel.querySelector(
    '.credential-carousel-track'
  );

  const previousButton = credentialCarousel.querySelector(
    '.credential-carousel-prev'
  );

  const nextButton = credentialCarousel.querySelector(
    '.credential-carousel-next'
  );

  if (viewport && track && previousButton && nextButton) {

    // Calculate the width of one card plus the space after it.
    const getStep = () => {
      const firstCard = track.querySelector('.credential-item');

      if (!firstCard) {
        return viewport.clientWidth;
      }

      const trackStyle = getComputedStyle(track);
      const gap =
        parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;

      return firstCard.getBoundingClientRect().width + gap;
    };

    // Disable arrows when the carousel reaches either end.
    const updateButtons = () => {
      const maxScroll = Math.max(
        0,
        viewport.scrollWidth - viewport.clientWidth
      );

      previousButton.disabled = viewport.scrollLeft <= 2;
      nextButton.disabled =
        viewport.scrollLeft >= maxScroll - 2;
    };

    // Move backward by one card.
    previousButton.addEventListener('click', () => {
      viewport.scrollBy({
        left: -getStep(),
        behavior: reduce ? 'auto' : 'smooth'
      });
    });

    // Move forward by one card.
    nextButton.addEventListener('click', () => {
      viewport.scrollBy({
        left: getStep(),
        behavior: reduce ? 'auto' : 'smooth'
      });
    });

    // Keep the arrow states updated while scrolling.
    viewport.addEventListener(
      'scroll',
      updateButtons,
      { passive: true }
    );

    // Recalculate the controls if the screen size changes.
    window.addEventListener(
      'resize',
      updateButtons,
      { passive: true }
    );

    // Also support left/right keyboard navigation.
    viewport.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();

        viewport.scrollBy({
          left: -getStep(),
          behavior: reduce ? 'auto' : 'smooth'
        });
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();

        viewport.scrollBy({
          left: getStep(),
          behavior: reduce ? 'auto' : 'smooth'
        });
      }
    });

    // Set the initial state of the arrow buttons.
    updateButtons();
  }
}

})();
