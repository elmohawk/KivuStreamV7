import { getTMDBMovie } from "./tmdb.js";
"use strict";

/*==========================================
            KIVUSTREAM HOME
==========================================*/

document.addEventListener("DOMContentLoaded", initHome);

async function initHome(){

    try{

        await loadHero();

        await loadSection("movie","trending");

        await loadSection("movie","latest");

        await loadSection("series","series");

        await loadSection("anime","anime");

    }

    catch(error){

        console.error(error);

    }

}

/*==========================================
            HERO
==========================================*/
async function loadHero(){


const {data,error}=await supabaseClient
.from("movies")
.select("*")
.limit(10);



if(error){

console.error(error);

return;

}



console.log("HERO MOVIES:",data);
}

/*==========================================
            SECTION
==========================================*/

async function loadSection(category,containerId){

    const container=document.getElementById(containerId);

    if(!container) return;

    container.innerHTML=loadingCards();

    const movies=await getMovies(category);

    if(!movies.length){

        container.innerHTML="<p>No content available.</p>";

        return;

    }

    container.innerHTML="";

    movies.forEach(movie=>{

        container.appendChild(createCard(movie));

    });

}

/*==========================================
            CARD
==========================================*/

function createCard(movie){

    const card=document.createElement("div");

    card.className="movie-card";

    card.innerHTML=`

        <img
            src=""
            data-tmdb="${movie.tmdb_id}"
            alt=""
            class="movie-poster"
        >

        <div class="movie-info">

            <h3 class="movie-title">
                Loading...
            </h3>

            <p class="movie-quality">

                ${movie.quality}

            </p>

        </div>

    `;

   loadMovieCard(card, movie);

    card.onclick=()=>{

        location.href=`watch.html?id=${movie.id}`;

    };

    return card;

}

/*==========================================
        LOADING PLACEHOLDER
==========================================*/

function loadingCards(){

    return Array(8)

    .fill(`

        <div class="movie-card skeleton"></div>

    `)

    .join("");

}
async function loadMovieCard(card, movie) {

    const tmdb = await getTMDBMovie(movie);

    if (!tmdb) return;

    const poster = card.querySelector(".movie-poster");
    const title = card.querySelector(".movie-title");

    if (poster) {
        poster.src = tmdb.poster;
        poster.alt = tmdb.title;
    }

    if (title) {
        title.textContent = tmdb.title;
    }

}
