"use strict";

/*=========================================
            TMDB API SERVICE
=========================================*/

/**
 * Fetch TMDB metadata through your Worker.
 * @param {number|string} tmdbId
 * @returns {Promise<object|null>}
 */
async function getTMDBMovie(tmdbId) {

    if (!tmdbId) return null;

    try {

        const response = await fetch(
            `${WORKER_URL}/tmdb/${Number(tmdbId)}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (err) {

        console.error("TMDB Error:", tmdbId, err);

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
