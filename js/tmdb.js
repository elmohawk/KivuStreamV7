"use strict";

/*=========================================
            TMDB API SERVICE
=========================================*/

/**
 * Fetch TMDB metadata through your Worker.
 * @param {number|string} tmdbId
 * @returns {Promise<object|null>}
 */
async function getTMDBMovie(movie) {

    try {

        const title = movie.title.trim();

        const response = await fetch(
            `${WORKER_URL}/tmdb/search/${encodeURIComponent(title)}`
        );

        if (!response.ok)
            throw new Error("TMDB fetch failed");

        return await response.json();

    } catch (err) {

        console.error(err);
        return null;

    }

}
async function loadTMDB(card, movie) {

    const tmdb = await getTMDBMovie(movie.tmdb_id);

    if (!tmdb) return;

    const poster = card.querySelector(".movie-poster");
    const title = card.querySelector(".movie-title");

    poster.src = tmdb.poster;
    poster.alt = tmdb.title;

    title.textContent = tmdb.title;

}
