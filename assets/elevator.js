// Autonomous landing cycle: open, dwell, close, travel ambience, update floor, reopen.
const scene=document.querySelector('#lift');
const display=document.querySelector('#floorDisplay');
const floorLamp=document.querySelector('#insideFloor');
const floors=['01','02','03','G'];let index=0;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function showFloor(f){display.textContent=f;floorLamp.textContent='FLOOR '+f;}
async function runElevator(){
 while(true){
  scene.classList.add('open');
  await wait(6200);
  scene.classList.remove('open');
  await wait(2200);
  scene.classList.add('moving');
  await wait(5100);
  scene.classList.remove('moving');
  index=(index+1)%floors.length;
  showFloor(floors[index]);
  await wait(1600);
  scene.classList.add('open');
  await wait(5600);
 }
}
runElevator();
// Radio player
const audio=document.querySelector('#audio'),button=document.querySelector('#play'),icon=document.querySelector('#icon'),status=document.querySelector('#status'),volume=document.querySelector('#volume');
const playPath='<path d="M8 5.5v13l10-6.5z"/>',pausePath='<path d="M7 5h4v14H7zM14 5h4v14h-4z"/>';
audio.volume=Number(volume.value);volume.addEventListener('input',()=>audio.volume=Number(volume.value));
button.addEventListener('click',async()=>{if(audio.paused){status.textContent='Connecting to live radio…';try{await audio.play();status.textContent='Playing live radio';icon.innerHTML=pausePath;button.setAttribute('aria-label','Pause radio')}catch(e){status.textContent='Stream did not connect. Use stream source below.'}}else{audio.pause();status.textContent='Radio paused';icon.innerHTML=playPath;button.setAttribute('aria-label','Play radio')}});
audio.addEventListener('playing',()=>{status.textContent='Playing live radio';icon.innerHTML=pausePath;button.setAttribute('aria-label','Pause radio')});
audio.addEventListener('pause',()=>{if(!audio.ended){icon.innerHTML=playPath;button.setAttribute('aria-label','Play radio')}});
audio.addEventListener('error',()=>{status.textContent='Player connection failed. Try stream source link.'});
