"use strict";

/*==================================================
            HERO SLIDER (SUPABASE)
==================================================*/

let heroMovies = [];
let current = 0;
let interval = null;

const hero = document.querySelector(".hero");
const title = document.querySelector(".hero h1");
const description = document.querySelector(".hero p");
const watchBtn = document.querySelector(".watch-btn");
const meta = document.querySelector(".hero-meta");

/*==============================
        LOAD HERO
==============================*/

export function loadHero(movies) {

    if (!movies || movies.length === 0) {
        console.warn("No hero movies found.");
        return;
    }

    heroMovies = movies;
    current = 0;

    showSlide(current);
    startSlider();

}

/*==============================
        SHOW SLIDE
==============================*/

function showSlide(index) {

    const movie = heroMovies[index];

    if (!movie) return;

    hero.style.opacity = "0";

    setTimeout(() => {

        hero.style.backgroundImage = `
            linear-gradient(
                to right,
                rgba(0,0,0,.8),
                rgba(0,0,0,.3)
            ),
            url(${movie.backdrop || "assets/images/default.jpg"})
        `;

        title.textContent =
            movie.title || "Untitled";

        description.textContent =
            movie.description ||
            movie.overview ||
            "No description available.";

        if (watchBtn) {
            watchBtn.href = `watch.html?id=${movie.id}`;
        }

        if (meta) {

            meta.innerHTML = `
                <span>⭐ ${movie.rating || "N/A"}</span>
                <span>${movie.year || ""}</span>
                <span>${movie.quality || ""}</span>
                <span>${movie.genre || ""}</span>
            `;

        }

        hero.style.opacity = "1";

    }, 300);

}

/*==============================
        NEXT
==============================*/

function nextSlide() {

    current++;

    if (current >= heroMovies.length) {
        current = 0;
    }

    showSlide(current);

}

/*==============================
        PREVIOUS
==============================*/

function previousSlide() {

    current--;

    if (current < 0) {
        current = heroMovies.length - 1;
    }

    showSlide(current);

}

/*==============================
        AUTO PLAY
==============================*/

function startSlider() {

    clearInterval(interval);

    if (heroMovies.length <= 1) return;

    interval = setInterval(nextSlide, 8000);

}

/*==============================
        PAUSE ON HOVER
==============================*/

if (hero) {

    hero.addEventListener("mouseenter", () => {

        clearInterval(interval);

    });

    hero.addEventListener("mouseleave", () => {

        startSlider();

    });

}

/*==============================
        KEYBOARD
==============================*/

document.addEventListener("keydown", (e) => {

    if (heroMovies.length === 0) return;

    if (e.key === "ArrowRight") {

        nextSlide();

    }

    if (e.key === "ArrowLeft") {

        previousSlide();

    }

});

/*==============================
        TOUCH SWIPE
==============================*/

let touchStart = 0;
let touchEnd = 0;

if (hero) {

    hero.addEventListener("touchstart", (e) => {

        touchStart = e.changedTouches[0].screenX;

    });

    hero.addEventListener("touchend", (e) => {

        touchEnd = e.changedTouches[0].screenX;

        if (touchStart - touchEnd > 50) {

            nextSlide();

        }

        if (touchEnd - touchStart > 50) {

            previousSlide();

        }

    });

}
