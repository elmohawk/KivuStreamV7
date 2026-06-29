"use strict";

/*=========================================
            TMDB API SERVICE
=========================================*/

export async function getTMDBMovie(movie) {

    try {

        if (!movie || !movie.title) {
            return null;
        }

        const title = movie.title.trim();

        const response = await fetch(
            `${WORKER_URL}/tmdb/search/${encodeURIComponent(title)}`
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();

    } catch (err) {

        console.error("TMDB Error:", err);
        return null;

    }

}

export async function loadTMDB(card, movie) {

    const tmdb = await getTMDBMovie(movie);

    if (!tmdb) return;

    const poster = card.querySelector(".movie-poster");
    const title = card.querySelector(".movie-title");

    if (poster && tmdb.poster) {
        poster.src = tmdb.poster;
        poster.alt = tmdb.title;
    }

    if (title) {
        title.textContent = tmdb.title;
    }

}
