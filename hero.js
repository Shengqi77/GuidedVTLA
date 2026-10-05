'use strict';
{
  const video=document.getElementById('background-video');
  const toggle=document.getElementById('background-toggle');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let wanted=!reduced.matches;
  let visible=true;
  video.muted=true;
  const label=()=>{toggle.textContent=video.paused?'Play background':'Pause background';toggle.setAttribute('aria-label',video.paused?'Play background video':'Pause background video');};
  async function sync(){
    if(wanted&&visible&&!document.hidden){
      try{await video.play();}catch{label();}
    }else video.pause();
  }
  toggle.addEventListener('click',()=>{wanted=video.paused;sync();});
  video.addEventListener('play',label);
  video.addEventListener('pause',label);
  video.addEventListener('error',()=>{toggle.textContent='Video unavailable';toggle.disabled=true;});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(video.closest('.cinema'));
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',()=>{wanted=!reduced.matches;sync();});
  label();
}
