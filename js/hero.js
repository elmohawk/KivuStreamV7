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

    const hero = document.querySelector(".hero");

    const title = document.getElementById("heroTitle");

    const description = document.getElementById("heroDescription");

    const meta = document.getElementById("heroMeta");

    const watch = document.getElementById("heroWatchBtn");

    const trailer = document.getElementById("heroTrailerBtn");

    hero.style.backgroundImage = `url(${movie.backdrop})`;

    title.textContent = movie.title;

    description.textContent = movie.overview;

    meta.innerHTML = `
        <span>⭐ ${movie.vote_average.toFixed(1)}</span>
        <span>${movie.release_date.substring(0,4)}</span>
        <span>${movie.quality}</span>
    `;

    watch.href = `watch.html?id=${movie.id}`;

    trailer.onclick = ()=>{

        if(movie.trailer){

            window.open(movie.trailer,"_blank");

        }

    };

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
