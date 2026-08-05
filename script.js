const slides=document.querySelector(".slides");

let index=0;

setInterval(()=>{

index++;

if(index>1){

index=0;

}

slides.style.transform=`translateX(-${index*100}%)`;

},3000);
