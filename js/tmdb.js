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

    try {

        const response = await fetch(
            `${WORKER_URL}/tmdb/${tmdbId}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch TMDB data.");
        }

        return await response.json();

    } catch (error) {

        console.error("TMDB Error:", error);

        return null;

    }

}

/**
 * Update a movie card with TMDB data.
 * @param {HTMLElement} card
 * @param {Object} movie
 */
async function loadTMDB(card, movie) {

    const tmdb = await getTMDBMovie(movie.tmdb_id);

    if (!tmdb) return;

    const poster = card.querySelector(".movie-poster");
    const title = card.querySelector(".movie-title");

    poster.src = tmdb.poster;
    poster.alt = tmdb.title;

    title.textContent = tmdb.title;

}
