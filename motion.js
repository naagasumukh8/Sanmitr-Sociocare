function enhanceMotion(){
  document.querySelectorAll('.card,.service,.showcase,.featurebox,.story-band,.band').forEach((el,i)=>{el.classList.add('motion-card');el.style.setProperty('--delay',`${Math.min(i,8)*45}ms`)})
  document.querySelectorAll('a.btn').forEach(a=>a.addEventListener('pointermove',e=>{const r=a.getBoundingClientRect();a.style.setProperty('--mx',`${((e.clientX-r.left)/r.width-.5)*8}px`);a.style.setProperty('--my',`${((e.clientY-r.top)/r.height-.5)*8}px`)}));
  const hero=document.querySelector('.hero');
  if(hero&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--rx',`${((e.clientY-r.top)/r.height-.5)*-2}deg`);hero.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*3}deg`)});
    hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--rx','0deg');hero.style.setProperty('--ry','0deg')});
  }
}
const _renderPage=window.renderPage;
window.renderPage=function(p){_renderPage(p);requestAnimationFrame(enhanceMotion)};
