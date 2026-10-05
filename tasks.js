'use strict';
const taskGroups=[{"id":"01_real_world","title":"Six Real-World Tasks","clips":[{"id":"01_aloha_cylinder","title":"ALOHA · Cylinder Cleaning & Collection","start_frame":99,"end_frame":339},{"id":"02_aloha_fruits","title":"ALOHA · Fragile Fruits Collection","start_frame":339,"end_frame":579},{"id":"03_aloha_chips","title":"ALOHA · Fragile Chips Collection","start_frame":579,"end_frame":804},{"id":"04_flexiv_gears","title":"Flexiv · Gears Assembly","start_frame":804,"end_frame":1029},{"id":"05_flexiv_plug","title":"Flexiv · Plug Insertion","start_frame":1029,"end_frame":1254},{"id":"06_flexiv_usb_light","title":"Flexiv · USB Light Insertion","start_frame":1254,"end_frame":1479}]},{"id":"02_environment","title":"Environment Variations","clips":[{"id":"01_nonuniform_fruits_chips","title":"Non-uniform Light · Fruits & Chips","start_frame":1519,"end_frame":1759},{"id":"02_uniform_cylinder_gears","title":"Uniform Light · Cylinder & Gears","start_frame":1759,"end_frame":1999},{"id":"03_uniform_fruits_chips","title":"Uniform Light · Fruits & Chips","start_frame":1999,"end_frame":2239}]},{"id":"03_objects","title":"Object Variations","clips":[{"id":"01_fruit_varieties","title":"Fruits Collection · Different Fruit Varieties","start_frame":2287,"end_frame":2527},{"id":"02_gear_colors","title":"Gears Assembly · Different Gear Colors","start_frame":2527,"end_frame":2767}]},{"id":"04_positions","title":"Object Position Variations","clips":[{"id":"01_chips_positions","title":"Chips Collection · Three Positions","start_frame":2816,"end_frame":3056},{"id":"02_fruits_positions","title":"Fruits Collection · Three Positions","start_frame":3056,"end_frame":3296},{"id":"03_gears_positions","title":"Gears Assembly · Three Positions","start_frame":3296,"end_frame":3536},{"id":"04_plug_positions","title":"Plug Insertion · Three Positions","start_frame":3536,"end_frame":3776}]},{"id":"05_cross_sensor","title":"Cross-Sensor Generalization","clips":[{"id":"01_fruits_sensor_transfer","title":"Fruits Collection · Train on A, Test on B","start_frame":3828,"end_frame":4068},{"id":"02_gears_sensor_transfer","title":"Gears Assembly · Train on A, Test on B","start_frame":4068,"end_frame":4308}]}];
document.querySelectorAll('[data-task-group]').forEach(root=>{
 const group=taskGroups.find(g=>g.id===root.dataset.taskGroup);
 if(!group)return;
 const video=root.querySelector('video'), title=root.querySelector('.task-title'), count=root.querySelector('.task-count'), dots=root.querySelector('.task-dots');
 let index=0, visible=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;
 function syncPlayback(){
  const play=visible&&!document.hidden&&!reduced.matches;
  video.autoplay=play;
  if(play)video.play().catch(()=>{});else video.pause();
 }
 const buttons=group.clips.map((clip,i)=>{
  const b=document.createElement('button');b.type='button';b.textContent=String(i+1);b.setAttribute('aria-label','Show '+clip.title);
  b.addEventListener('click',()=>select(i));dots.append(b);return b;
 });
 function select(i){
  video.pause();index=(i+group.clips.length)%group.clips.length;
  const clip=group.clips[index],base='assets/tasks/'+group.id+'/'+clip.id;
  video.poster=base+'.jpg';video.src=base+'.mp4';video.load();
  video.setAttribute('aria-label',clip.title);title.textContent=clip.title;count.textContent=(index+1)+' / '+group.clips.length;
  buttons.forEach((b,k)=>{if(k===index)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
  syncPlayback();
 }
 root.querySelector('[data-prev]').addEventListener('click',()=>select(index-1));
 root.querySelector('[data-next]').addEventListener('click',()=>select(index+1));
 root.addEventListener('keydown',e=>{
  if(e.target===video)return;
  if(e.key==='ArrowLeft'){e.preventDefault();select(index-1);}
  if(e.key==='ArrowRight'){e.preventDefault();select(index+1);}
 });
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncPlayback();},{threshold:.15}).observe(video);
 document.addEventListener('visibilitychange',syncPlayback);
 reduced.addEventListener('change',syncPlayback);
 select(0);
});
