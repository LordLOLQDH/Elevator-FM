// Elevator sequence runs autonomously. No visitor controls for the elevator.
const scene=document.querySelector('#lift'),display=document.querySelector('#floorDisplay'),floorLamp=document.querySelector('#insideFloor');
const floors=[1,2,3,0];let index=0;
const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
const setFloor=(n)=>{display.textContent=n===0?'G':String(n).padStart(2,'0');floorLamp.textContent='FLOOR '+(n===0?'G':String(n).padStart(2,'0'));};
async function elevatorLoop(){
  while(true){
    scene.classList.add('open');await sleep(5200);
    scene.classList.remove('open');await sleep(2300);
    scene.classList.add('moving');await sleep(5600);
    scene.classList.remove('moving');
    index=(index+1)%floors.length;setFloor(floors[index]);
    await sleep(700);scene.classList.add('open');await sleep(5200);
  }
}
elevatorLoop();
// Radio player stays available to listeners.
const audio=document.getElementById('audio'),button=document.getElementById('play'),icon=document.getElementById('icon'),status=document.getElementById('status'),volume=document.getElementById('volume');
const playPath='<path d="M8 5.5v13l10-6.5z"/>',pausePath='<path d="M7 5h4v14H7zM14 5h4v14h-4z"/>';
audio.volume=Number(volume.value);volume.addEventListener('input',()=>audio.volume=Number(volume.value));
button.addEventListener('click',async()=>{if(audio.paused){status.textContent='Connecting to live radio…';try{await audio.play();status.textContent='Playing live radio';icon.innerHTML=pausePath;button.setAttribute('aria-label','Pause radio')}catch(e){status.textContent='Stream did not connect. Use stream source below.'}}else{audio.pause();status.textContent='Radio paused';icon.innerHTML=playPath;button.setAttribute('aria-label','Play radio')}});
audio.addEventListener('playing',()=>{status.textContent='Playing live radio';icon.innerHTML=pausePath;button.setAttribute('aria-label','Pause radio')});
audio.addEventListener('pause',()=>{if(!audio.ended){icon.innerHTML=playPath;button.setAttribute('aria-label','Play radio')}});
audio.addEventListener('error',()=>{status.textContent='Player connection failed. Try stream source link.'});
