import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
import { RoomEnvironment } from 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/environments/RoomEnvironment.js';
const mount=document.querySelector('#lift');
mount.innerHTML='';
mount.classList.remove('open','moving');
mount.style.cssText='position:relative;overflow:hidden;border-radius:18px;height:clamp(440px,56vw,650px);background:#d5d5d2;box-shadow:0 25px 70px #202a2418;';
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(mount.clientWidth,mount.clientHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;mount.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#d8d9d5');scene.fog=new THREE.Fog('#d8d9d5',16,45);
const camera=new THREE.PerspectiveCamera(36,mount.clientWidth/mount.clientHeight,.1,80);camera.position.set(0,3.5,13.6);camera.lookAt(0,2.6,0);
const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(new RoomEnvironment(renderer),.04).texture;
scene.add(new THREE.HemisphereLight('#f5f5f0','#737975',2.2));
const key=new THREE.DirectionalLight('#fff2df',4.2);key.position.set(-5,8,7);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);
const fill=new THREE.PointLight('#ffffff',65,30);fill.position.set(4,5,6);scene.add(fill);
function mat(color,metal=0,rough=.35){return new THREE.MeshStandardMaterial({color,metalness:metal,roughness:rough})}
const steel=mat('#a8afab',.82,.24), darkSteel=mat('#414844',.75,.29), satin=mat('#c9cfcb',.72,.32), warm=mat('#f3dfbd',.18,.32), black=mat('#303633',.55,.32), glass=new THREE.MeshPhysicalMaterial({color:'#dce7e4',metalness:.25,roughness:.1,transparent:true,opacity:.38});
function box(parent,w,h,d,m,x,y,z,shadow=true){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=shadow;o.receiveShadow=true;parent.add(o);return o;}
box(scene,18,.18,20,mat('#b9b9b3',.15,.5),0,-.1,-2);
const shaft=new THREE.Group();scene.add(shaft);
box(shaft,5.2,7,.45,darkSteel,-2.85,3.5,-.25);box(shaft,5.2,7,.45,darkSteel,2.85,3.5,-.25);box(shaft,5.7,.3,.55,steel,0,7,-.25);box(shaft,5.7,.3,.55,steel,0,0,-.25);
const backWall=box(shaft,5.7,7,.25,mat('#666e68',.25,.55),0,3.5,-1.1);
for(let x=-2.5;x<=2.5;x+=.5){box(shaft,.012,6.9,.03,steel,x,3.5,-.94,false)}
const cabin=new THREE.Group();scene.add(cabin);
box(cabin,4.5,6.2,.12,darkSteel,0,3.1,-.1);box(cabin,4.35,6,.08,satin,0,3.1,-.02);box(cabin,4.1,5.7,.12,mat('#d4d8d4',.55,.24),0,3.1,.05);
box(cabin,4.0,.12,3.7,steel,0,6.05,1.4);box(cabin,4.0,.12,3.7,steel,0,.15,1.4);box(cabin,.12,5.9,3.7,steel,-2.0,3.1,1.4);box(cabin,.12,5.9,3.7,steel,2.0,3.1,1.4);
box(cabin,3.8,5.7,.06,mat('#e3e5e2',.2,.55),0,3.1,3.22);box(cabin,3.2,4.2,.045,glass,0,3.65,3.16,false);box(cabin,3.28,4.28,.05,steel,0,3.65,3.19);
box(cabin,3.65,.055,.06,steel,0,1.42,3.24);box(cabin,3.65,.055,.06,steel,0,5.88,3.24);box(cabin,.055,4.3,.06,steel,-1.63,3.65,3.24);box(cabin,.055,4.3,.06,steel,1.63,3.65,3.24);
box(cabin,3.75,.07,.18,steel,0,1.35,2.9);box(cabin,3.4,.05,.08,steel,0,1.9,2.98);box(cabin,3.4,.05,.08,steel,0,1.95,2.98);
const doors=[];for(const side of [-1,1]){const leaf=new THREE.Group();scene.add(leaf);leaf.position.set(side*.98,0,3.28);box(leaf,.96,5.65,.085,satin,side*-.48,3.05,0);box(leaf,.018,5.55,.025,steel,side*-.06,3.05,.055,false);box(leaf,.025,5.6,.03,darkSteel,side*-.91,3.05,.06,false);doors.push({leaf,side});}
const outer=new THREE.Group();scene.add(outer);box(outer,6.1,.24,.5,darkSteel,0,7.03,3.3);box(outer,6.1,.24,.5,darkSteel,0,.02,3.3);box(outer,.24,7.1,.5,darkSteel,-3.02,3.52,3.3);box(outer,.24,7.1,.5,darkSteel,3.02,3.52,3.3);box(outer,5.6,.07,.18,steel,0,6.8,3.58);box(outer,5.6,.07,.18,steel,0,.25,3.58);
const panel=box(scene,.4,1.15,.08,black,3.45,4.2,3.35);box(scene,.24,.28,.025,mat('#18241d',.1,.15),3.45,4.57,3.41,false);const ledMat=new THREE.MeshStandardMaterial({color:'#d9e9da',emissive:'#8cba94',emissiveIntensity:1.3});box(scene,.14,.035,.025,ledMat,3.45,4.56,3.43,false);
for(let y of [3.95,3.72]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.03,24),mat('#c5cbc7',.65,.25));b.rotation.x=Math.PI/2;b.position.set(3.45,y,3.42);scene.add(b);}
box(scene,20,.08,12,mat('#d5d3cc',.25,.3),0,-.02,4.5);const ceilingLight=new THREE.PointLight('#f7e8cf',55,25);ceilingLight.position.set(0,6.8,4);scene.add(ceilingLight);
const overlay=document.createElement('div');overlay.style.cssText='position:absolute;top:18px;left:20px;right:20px;display:flex;justify-content:space-between;align-items:center;color:#59615d;font:10px sans-serif;letter-spacing:.18em;pointer-events:none;z-index:2';overlay.innerHTML='<span>ELEVATOR FM · LOBBY</span><span id="floorRead" style="background:#222827;color:#f4f3ef;padding:9px 12px;border-radius:4px">01</span>';mount.appendChild(overlay);const floorRead=overlay.querySelector('#floorRead');
const state={t:0,floor:-1,doorOpen:1};let last=0;
function animate(ms){requestAnimationFrame(animate);const dt=Math.min((ms-last)/1000,.05);last=ms;state.t+=dt;const cyc=state.t%18.5;
if(cyc<6.2){state.doorOpen=1;}else if(cyc<8.4){state.doorOpen=1-(cyc-6.2)/2.2;}else if(cyc<13.5){state.doorOpen=0;}else if(cyc<14.9){state.doorOpen=0;}else{state.doorOpen=(cyc-14.9)/3.6;}
doors.forEach(({leaf,side})=>{leaf.position.x=side*(.98+state.doorOpen*1.02);});
if(cyc>=8.4&&cyc<13.5){cabin.position.y=Math.sin((cyc-8.4)/5.1*Math.PI)*.8;backWall.material.color.set('#434b46');}else{cabin.position.y=0;backWall.material.color.set('#666e68');}
const fl=Math.floor(state.t/18.5)%4;const names=['01','02','03','G'];if(fl!==state.floor){state.floor=fl;floorRead.textContent=names[fl];}
renderer.render(scene,camera);}
requestAnimationFrame(animate);function resize(){const w=mount.clientWidth,h=mount.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}window.addEventListener('resize',resize);
