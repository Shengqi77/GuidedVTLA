'use strict';
const viewer=document.getElementById('viewer');
const viewImage=document.getElementById('viewer-image');
document.querySelectorAll('[data-zoom]').forEach(link=>{
  link.addEventListener('click',event=>{
    event.preventDefault();
    viewImage.src=link.href;
    viewImage.alt=link.querySelector('img').alt;
    viewer.showModal();
  });
});
document.getElementById('close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();}});
document.getElementById('back-top').addEventListener('click',event=>{event.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
const navLinks=[...document.querySelectorAll('.toc a')];
function updateNav(){let current=navLinks[0];for(const link of navLinks){if(document.querySelector(link.hash).getBoundingClientRect().top<=150)current=link;}for(const link of navLinks){if(link===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
let scheduled=false;
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{updateNav();scheduled=false;});}},{passive:true});
updateNav();
