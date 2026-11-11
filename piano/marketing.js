(()=>{
const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets=document.querySelectorAll('.m-reveal');
if(!reduced&&'IntersectionObserver' in window){
  document.documentElement.classList.add('motion-ready');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }),{threshold:.07,rootMargin:'0px 0px -40px 0px'});
  targets.forEach(el=>observer.observe(el));
}
const keys=[...document.querySelectorAll('[data-piano-key]')];
const feedback=document.querySelector('[data-feedback]');
const initial=feedback&&feedback.textContent;
let tid;
keys.forEach(key=>key.addEventListener('click',()=>{
  keys.forEach(el=>el.classList.remove('is-playing'));
  key.classList.add('is-playing');
  if(feedback)feedback.textContent=key.dataset.pianoKey+' ♪';
  clearTimeout(tid);
  tid=setTimeout(()=>{key.classList.remove('is-playing');if(feedback)feedback.textContent=initial},900);
}));
})();