"use strict";


/*=========================================
            HERO SLIDER
=========================================*/


let heroMovies = [];
let heroIndex = 0;
let heroInterval = null;


/*=========================================
            START HERO
=========================================*/


async function startHeroSlider(movies){


heroMovies = [];


for(const movie of movies){

let tmdb;

try{

    tmdb = await getTMDBMovie(id);

}catch(err){

    console.error(err);

    continue;

}

if(!tmdb) continue;


heroMovies.push({

...movie,

...tmdb

});



}



if(heroMovies.length === 0){


console.warn(
"No hero movies available"
);


return;


}



heroIndex = 0;


renderHero(heroMovies[0]);


autoHero();



}



/*=========================================
            AUTO PLAY
=========================================*/


function autoHero() {

    clearInterval(heroInterval);

    if(heroMovies.length === 0) return;

    heroInterval = setInterval(nextHero, 8000);

}
/*=========================================
            NEXT
=========================================*/


function nextHero(){


heroIndex++;


if(heroIndex >= heroMovies.length){


heroIndex = 0;


}



renderHero(
heroMovies[heroIndex]
);



}



/*=========================================
            PREVIOUS
=========================================*/


function previousHero(){


heroIndex--;


if(heroIndex < 0){


heroIndex = heroMovies.length - 1;


}



renderHero(
heroMovies[heroIndex]
);



}




/*=========================================
            RENDER
=========================================*/


function renderHero(movie){



if(!movie){

console.error(
"No hero movie found"
);

return;

}



const backdrop = movie.backdrop_path

?

`https://image.tmdb.org/t/p/original${movie.backdrop_path}`

:

"assets/images/default.jpg";





const hero = document.querySelector("#hero");



if(hero){


hero.style.backgroundImage =

`
linear-gradient(
to right,
rgba(0,0,0,.9),
rgba(0,0,0,.3)
),
url(${backdrop})
`;



}




const title =
document.querySelector("#hero-title");



if(title){

title.textContent =
movie.title ||
movie.name ||
"Unknown";

}




const description =
document.querySelector("#hero-description");



if(description){

description.textContent =
movie.overview ||
"No description available";

}




}




/*=========================================
            PAUSE
=========================================*/


const heroElement =
document.querySelector(".hero");



if(heroElement){


heroElement.addEventListener(
"mouseenter",
()=>{

clearInterval(heroInterval);

});



heroElement.addEventListener(
"mouseleave",
()=>{

autoHero();

});


}
