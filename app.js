'use strict';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const policies = [
  ['Open-loop action execution', 'A standard chunk-based policy executes its generated actions without online tactile refinement.', '0%', '27.5%'],
  ['Reactive refinement during execution', 'A slow-fast policy adds tactile feedback during execution. The comparison here highlights the absence of shared contact-stage guidance.', '28.3%', '32.3%'],
  ['Stage-aware generation and refinement', 'Shared tactile guidance coordinates the slow and fast experts, coupling contact-aware action generation with reactive spectral refinement.', '61.6%', '37.4%']
];
const steps = [
  ['TACTILE DYNAMICS → SHARED GUIDANCE', 'One contact signal, two coordinated experts.', 'Cumulative motion and its signed change are encoded into shared guidance. This guidance conditions slow-expert routing and controls refinement strength in the fast expert.', '0%', '0%', '40.8%', '37%'],
  ['SHARED GUIDANCE → SLOW EXPERT', 'Generate a base action chunk with contact context.', 'The slow expert uses tactile-conditioned mixture-of-experts routing to adapt action generation. Shared guidance controls the relative contributions of the stage-conditioned experts.', '31.5%', '40.5%', '17.4%', '53%'],
  ['TEMPORAL TOUCH → FAST EXPERT', 'Refine a compact set of low-frequency modes.', 'Temporal tactile features and proprioception predict refinement coefficients. A contact gate from shared guidance scales them before spectral addition and inverse DCT.', '68.5%', '47%', '31.3%', '50%']
];
let policy = 2, step = 0;
const text = (id,value) => document.getElementById(id).textContent = value;
function setPolicy(i) {
  policy=i;
  document.querySelectorAll('[data-policy]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.policy)===i)));
  text('policy-number',String(i+1).padStart(2,'0'));text('policy-title',policies[i][0]);text('policy-copy',policies[i][1]);
  Object.assign(document.querySelector('.policy-highlight').style,{left:policies[i][2],width:policies[i][3]});
}
function setStep(i) {
  step=i;
  document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.step)===i)));
  text('step-tag',steps[i][0]);text('step-title',steps[i][1]);text('step-copy',steps[i][2]);
  Object.assign(document.querySelector('.method-highlight').style,{left:steps[i][3],top:steps[i][4],width:steps[i][5],height:steps[i][6]});
}


document.querySelectorAll('[data-policy]').forEach(b=>b.addEventListener('click',()=>{setPolicy(Number(b.dataset.policy));}));
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{setStep(Number(b.dataset.step));}));
document.getElementById('overview-play').addEventListener('click',()=>setPolicy((policy+1)%3));
document.getElementById('method-play').addEventListener('click',()=>setStep((step+1)%3));
document.querySelectorAll('[data-scope]').forEach(b=>b.addEventListener('click',()=>{
  const six=b.dataset.scope==='six';
  document.querySelectorAll('[data-scope]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
  const values=six?[509/6,400/6,274/6]:[604/8,392/8,331/8];
  text('baseline-name',six?'FTP-1':'UniVTAC-ACT');
  ['ours','baseline','base'].forEach((name,i)=>{text(name+'-value',values[i].toFixed(1)+'%');document.querySelector('.chart .'+name).style.width=values[i]+'%';});
  text('scope-note',six?'Means computed over the first six UniVTAC tasks. FTP-1 results are cited in the paper. Eight-task results are compared separately. Values reflect the current manuscript.':'Means computed over all eight UniVTAC tasks. FTP-1 and Tactile-VLA are excluded from this scope because two task results are unavailable. Values reflect the current manuscript.');
  document.getElementById('chart').setAttribute('aria-label','Mean success rate across '+(six?'six shared':'eight')+' tasks: GuidedVTLA '+values[0].toFixed(1)+' percent, '+(six?'FTP-1':'UniVTAC-ACT')+' '+values[1].toFixed(1)+' percent, pi 0.5 '+values[2].toFixed(1)+' percent.');
}));
const dialog=document.getElementById('figure-dialog');
document.getElementById('enlarge').addEventListener('click',()=>dialog.showModal());
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
setPolicy(2);setStep(0);


const media=window.GUIDED_MEDIA||{};
const heroVideo=document.getElementById('hero-video');
const videoToggle=document.getElementById('hero-video-toggle');
if(media.heroVideo){
  heroVideo.src=media.heroVideo;
  if(media.heroPoster)heroVideo.poster=media.heroPoster;
  heroVideo.muted=true;
  heroVideo.addEventListener('loadeddata',()=>{
    document.querySelector('.hero').classList.add('video-ready');
    videoToggle.hidden=false;
    if(!reduced.matches && !document.hidden)heroVideo.play().catch(()=>{});
  },{once:true});
  heroVideo.addEventListener('play',()=>{videoToggle.textContent='Pause video';videoToggle.setAttribute('aria-pressed','true');});
  heroVideo.addEventListener('pause',()=>{videoToggle.textContent='Play video';videoToggle.setAttribute('aria-pressed','false');});
  heroVideo.addEventListener('error',()=>{document.querySelector('.hero').classList.remove('video-ready');videoToggle.hidden=true;});
  videoToggle.addEventListener('click',()=>{if(heroVideo.paused)heroVideo.play().catch(()=>{});else heroVideo.pause();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)heroVideo.pause();});
  reduced.addEventListener('change',()=>{if(reduced.matches)heroVideo.pause();});
  new IntersectionObserver(items=>{if(!items[0].isIntersecting)heroVideo.pause();},{threshold:.05}).observe(document.querySelector('.hero'));
}
