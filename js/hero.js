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

async function startHeroSlider(featuredMovies){

    heroMovies = [];

    for(const movie of featuredMovies){

        const tmdb = await getTMDBMovie(movie.tmdb_id);

        if(!tmdb) continue;

        heroMovies.push({

            ...movie,

            ...tmdb

        });

    }

    if(heroMovies.length === 0){

        console.warn("No featured movies found.");

        return;

    }

    renderHero(heroMovies[0]);

    autoHero();

}

/*=========================================
            AUTO PLAY
=========================================*/

function autoHero(){

    clearInterval(heroInterval);

    heroInterval = setInterval(()=>{

        nextHero();

    },8000);

}

/*=========================================
            NEXT
=========================================*/

function nextHero(){

    heroIndex++;

    if(heroIndex >= heroMovies.length){

        heroIndex = 0;

    }

    renderHero(heroMovies[heroIndex]);

}

/*=========================================
            PREVIOUS
=========================================*/

function previousHero(){

    heroIndex--;

    if(heroIndex < 0){

        heroIndex = heroMovies.length-1;

    }

    renderHero(heroMovies[heroIndex]);

}

/*=========================================
            RENDER
=========================================*/
function renderHero(movie){


if(!movie){

console.error("KIVUSTREAM: No hero movie found");

return;

}



const backdrop = movie.backdrop_path 
? 
`https://image.tmdb.org/t/p/original${movie.backdrop_path}`
:
"assets/images/default.jpg";



const title =
movie.title ||
movie.name ||
"Unknown Movie";



const overview =
movie.overview ||
"No description available";



document.querySelector("#hero")
.style.backgroundImage =
`linear-gradient(
to right,
rgba(0,0,0,.9),
rgba(0,0,0,.2)
),
url(${backdrop})`;



const heroTitle =
document.querySelector("#hero-title");


if(heroTitle)

heroTitle.textContent = title;



const heroDescription =
document.querySelector("#hero-description");


if(heroDescription)

heroDescription.textContent = overview;



}

/*=========================================
            PAUSE
=========================================*/

const hero = document.querySelector(".hero");

hero.addEventListener("mouseenter",()=>{

    clearInterval(heroInterval);

});

hero.addEventListener("mouseleave",()=>{

    autoHero();

});


/*=========================================
         appp
=========================================*/

<button id="topBtn">
    <i class="fa-solid fa-arrow-up"></i>
</button>


<!-- Supabase -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>


<!-- Config -->
<script src="config.js"></script>


<!-- Database -->
<script src="supabase.js"></script>


<!-- TMDB FIRST -->
<script src="js/tmdb.js"></script>


<!-- Main App -->
<script src="js/app.js"></script>


<!-- Homepage -->
<script src="js/hero.js"></script>
<script src="js/home.js"></script>
