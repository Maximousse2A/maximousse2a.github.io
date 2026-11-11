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

const stickers=[...document.querySelectorAll('[data-sticker]')];
const notes={
 fr:['Coucou depuis Istanbul ! 👋','Bravo, maestro ! 🎹','Encore une note et tu y es ! ✨','Surprise ! Tu m’as trouvée 🧡'],
 en:['Hello from Istanbul! 👋','You got this, maestro! 🎹','One more note! ✨','Surprise! You found me 🧡']
};
if(stickers.length){
 const toast=document.createElement('div');
 toast.className='m-sticker-message';
 toast.setAttribute('role','status');
 toast.setAttribute('aria-live','polite');
 document.body.appendChild(toast);
 let n=0,clear;
 stickers.forEach(button=>button.addEventListener('click',()=>{
   const lang=button.dataset.stickerLang==='fr'?'fr':'en';
   toast.textContent=notes[lang][n++%notes[lang].length];
   toast.classList.add('show');
   clearTimeout(clear);
   clear=setTimeout(()=>toast.classList.remove('show'),3000);
 }));
}

})();