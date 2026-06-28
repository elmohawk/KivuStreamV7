/*==================================================
            KIVUSTREAM HERO SLIDER
==================================================*/

"use strict";

/*==============================
        HERO MOVIES
==============================*/

const heroMovies = [

{
title:"Avatar: Fire & Ash",
year:"2026",
rating:"8.9",
quality:"4K UHD",
genre:"Action • Adventure • Sci-Fi",
description:"Experience Pandora like never before with breathtaking visuals, unforgettable characters and epic battles.",
background:"assets/backdrops/avatar.jpg",
link:"watch.html?id=avatar"
},

{
title:"Superman",
year:"2026",
rating:"8.6",
quality:"4K UHD",
genre:"Action • Fantasy",
description:"A new generation of heroes rises as Superman faces his greatest challenge.",
background:"assets/backdrops/superman.jpg",
link:"watch.html?id=superman"
},

{
title:"The Batman II",
year:"2026",
rating:"8.8",
quality:"4K UHD",
genre:"Crime • Thriller",
description:"Gotham becomes darker than ever as Batman hunts a mysterious new enemy.",
background:"assets/backdrops/batman2.jpg",
link:"watch.html?id=batman2"
},

{
title:"Spider-Man",
year:"2026",
rating:"8.7",
quality:"HD",
genre:"Action • Adventure",
description:"Peter Parker returns for another thrilling adventure across the multiverse.",
background:"assets/backdrops/spiderman.jpg",
link:"watch.html?id=spiderman"
}

];

/*==============================
        ELEMENTS
==============================*/

const hero=document.querySelector(".hero");
const title=document.querySelector(".hero h1");
const description=document.querySelector(".hero p");
const watchBtn=document.querySelector(".watch-btn");

const meta=document.querySelector(".hero-meta");

let current=0;
let interval;

/*==============================
        CHANGE SLIDE
==============================*/

function showSlide(index){

const movie=heroMovies[index];

hero.style.opacity="0";

setTimeout(()=>{

hero.style.backgroundImage=`url(${movie.background})`;

title.textContent=movie.title;

description.textContent=movie.description;

watchBtn.href=movie.link;

meta.innerHTML=`

<span>⭐ ${movie.rating}</span>

<span>${movie.year}</span>

<span>${movie.quality}</span>

<span>${movie.genre}</span>

`;

hero.style.opacity="1";

},300);

}

/*==============================
        NEXT
==============================*/

function nextSlide(){

current++;

if(current>=heroMovies.length){

current=0;

}

showSlide(current);

}

/*==============================
        AUTO PLAY
==============================*/

function startSlider(){

interval=setInterval(nextSlide,8000);

}

startSlider();

/*==============================
        PAUSE ON HOVER
==============================*/

hero.addEventListener("mouseenter",()=>{

clearInterval(interval);

});

hero.addEventListener("mouseleave",()=>{

startSlider();

});

/*==============================
        KEYBOARD
==============================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="ArrowRight"){

nextSlide();

}

if(e.key==="ArrowLeft"){

current--;

if(current<0){

current=heroMovies.length-1;

}

showSlide(current);

}

});

/*==============================
        TOUCH SWIPE
==============================*/

let touchStart=0;
let touchEnd=0;

hero.addEventListener("touchstart",(e)=>{

touchStart=e.changedTouches[0].screenX;

});

hero.addEventListener("touchend",(e)=>{

touchEnd=e.changedTouches[0].screenX;

if(touchStart-touchEnd>50){

nextSlide();

}

if(touchEnd-touchStart>50){

current--;

if(current<0){

current=heroMovies.length-1;

}

showSlide(current);

}

});

/*==============================
        INITIAL
==============================*/

showSlide(current);
