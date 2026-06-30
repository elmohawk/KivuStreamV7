import { getTMDBMovie } from "./tmdb.js";
"use strict";

/*==========================================
            KIVUSTREAM HOME
==========================================*/

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
export function loadSection(movies, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    if (!movies || movies.length === 0) {

        container.innerHTML = "<p>No content available.</p>";

        return;

    }

    movies.forEach(movie => {

        container.appendChild(createCard(movie));

    });

}
/*==========================================
            CARD
==========================================*/

export function createCard(movie){

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
export async function loadMovieCard(card, movie) {
    const tmdb = await getTMDBMovie(movie);

    if (!tmdb) return;

    const poster = card.querySelector(".movie-poster");
    const title = card.querySelector(".movie-title");

    if (poster) {
        poster.src = tmdb.poster_path
    ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}`
    : "assets/images/default.jpg";
        poster.alt = tmdb.title;
    }

    if (title) {
        title.textContent = tmdb.title;
    }
}
export function loadSections(data){

    loadSection(
        data.filter(movie => movie.category === "movie"),
        "trending"
    );

    loadSection(
        data.filter(movie => movie.category === "movie"),
        "latest"
    );

    loadSection(
        data.filter(movie => movie.category === "series"),
        "series"
    );

    loadSection(
        data.filter(movie => movie.category === "anime"),
        "anime"
    );

}
