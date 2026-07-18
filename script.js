/* ===========================
   MATRIX RAIN
=========================== */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars =
"アァイィウヴエカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const letters = chars.split("");

const fontSize = 16;

const columns = canvas.width / fontSize;

const drops = [];

for(let x = 0; x < columns; x++){

    drops[x] = 1;

}

function draw(){

    ctx.fillStyle = "rgba(4,7,13,.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ffee";
    ctx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text = letters[Math.floor(Math.random()*letters.length)];

        ctx.fillText(text,i*fontSize,drops[i]*fontSize);

        if(drops[i]*fontSize>canvas.height && Math.random()>0.975){

            drops[i]=0;

        }

        drops[i]++;

    }

}

setInterval(draw,35);

/* ===========================
   RESIZE
=========================== */

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});

/* ===========================
   TERMINAL TYPING
=========================== */

const terminal=document.getElementById("typing");

const lines=[

"> Initializing System...",
"> Connecting Server...",
"> Authentication Success",
"> Loading Portfolio...",
"> Access Granted",
"> Welcome Samin Salam Pranto",
"> Cyber Security Mode Enabled",
"> Status : ONLINE"

];

let line=0;

let char=0;

function type(){

if(line<lines.length){

if(char<lines[line].length){

terminal.innerHTML+=lines[line].charAt(char);

char++;

setTimeout(type,35);

}else{

terminal.innerHTML+="\n";

line++;

char=0;

setTimeout(type,300);

}

}

}

type();

/* ===========================
   IMAGE PARALLAX
=========================== */

const image=document.querySelector(".center img");

document.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/35;

const y=(window.innerHeight/2-e.pageY)/35;

image.style.transform=`translate(${x}px,${y}px)`;

});

/* ===========================
   GLOW EFFECT
=========================== */

document.querySelectorAll(".panel,.card,.enter").forEach(item=>{

item.addEventListener("mouseenter",()=>{

item.style.boxShadow="0 0 35px cyan";

});

item.addEventListener("mouseleave",()=>{

item.style.boxShadow="";

});

});

/* ===========================
   LIVE CLOCK
=========================== */

setInterval(()=>{

const clock=document.getElementById("clock");

if(clock){

const now=new Date();

clock.innerHTML=now.toLocaleTimeString();

}

},1000);