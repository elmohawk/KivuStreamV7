"use strict";

/*=========================================
            HERO SLIDER
=========================================*/

let heroMovies = [];
let heroIndex = 0;
let heroInterval = null;

/*=========================================
            LOAD HERO
=========================================*/

export function loadHero(movies) {

    if (!movies || movies.length === 0) {
        console.warn("No hero movies available");
        return;
    }

    heroMovies = movies;
    heroIndex = 0;

    renderHero(heroMovies[0]);

    autoHero();
}

/*=========================================
            AUTO PLAY
=========================================*/

function autoHero() {

    clearInterval(heroInterval);

    if (heroMovies.length <= 1) return;

    heroInterval = setInterval(nextHero, 8000);

}

/*=========================================
            NEXT
=========================================*/

function nextHero() {

    heroIndex++;

    if (heroIndex >= heroMovies.length) {
        heroIndex = 0;
    }

    renderHero(heroMovies[heroIndex]);

}

/*=========================================
            PREVIOUS
=========================================*/

function previousHero() {

    heroIndex--;

    if (heroIndex < 0) {
        heroIndex = heroMovies.length - 1;
    }

    renderHero(heroMovies[heroIndex]);

}

/*=========================================
            RENDER HERO
=========================================*/

function renderHero(movie) {

    if (!movie) return;

    const hero = document.querySelector(".hero");

    const backdrop =
        movie.backdrop ||
        movie.image ||
        movie.poster ||
        movie.thumbnail ||
        "assets/images/default.jpg";

    if (hero) {

        hero.style.backgroundImage = `
            linear-gradient(
                to right,
                rgba(0,0,0,.9),
                rgba(0,0,0,.3)
            ),
            url(${backdrop})
        `;

    }

    const title = document.querySelector("#heroTitle");

    if (title) {

        title.textContent =
            movie.title ||
            movie.name ||
            "Unknown Title";

    }

    const description =
        document.querySelector("#heroDescription");

    if (description) {

        description.textContent =
            movie.overview ||
            movie.description ||
            "No description available.";

    }

}

/*=========================================
            PAUSE ON HOVER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    hero.addEventListener("mouseenter", () => {

        clearInterval(heroInterval);

    });

    hero.addEventListener("mouseleave", () => {

        autoHero();

    });

});
