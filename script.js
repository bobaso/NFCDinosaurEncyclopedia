const slides=document.querySelector(".slides");

let current=0;

setInterval(()=>{

current++;

if(current>1){

current=0;

}

slides.style.transform=`translateX(-${current*100}%)`;

},3000);
