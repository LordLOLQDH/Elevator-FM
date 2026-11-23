const audio=document.getElementById('audio'),playBtn=document.getElementById('play'),icon=document.getElementById('icon'),status=document.getElementById('status'),hint=document.getElementById('autoplay-hint'),volume=document.getElementById('volume');
const playSvg='<path d="M8 5.5v13l10-6.5z"/>',pauseSvg='<path d="M7 5h4v14H7zM14 5h4v14h-4z"/>';
audio.volume=Number(volume.value);volume.addEventListener('input',()=>audio.volume=Number(volume.value));
function playing(){status.textContent='On air · live stream';hint.textContent='LIVE AUDIO';icon.innerHTML=pauseSvg;playBtn.setAttribute('aria-label','Pause radio')}
function paused(){icon.innerHTML=playSvg;playBtn.setAttribute('aria-label','Play radio')}
async function start(){status.textContent='Connecting to the stream…';try{await audio.play();playing()}catch(e){status.textContent='Autoplay blocked. Tap play to start.';hint.textContent='READY WHEN YOU ARE';paused()}}
playBtn.addEventListener('click',async()=>{if(audio.paused)await start();else{audio.pause();status.textContent='Radio paused';hint.textContent='PAUSED';paused()}});
audio.addEventListener('playing',playing);audio.addEventListener('pause',()=>{if(!audio.ended)paused()});audio.addEventListener('error',()=>{status.textContent='Stream unavailable · try again';hint.textContent='CONNECTION ISSUE';paused()});
start();
