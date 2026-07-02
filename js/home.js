"use strict";

/*==========================================
            KIVUSTREAM HOME
==========================================*/

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

export function createCard(movie) {

    const card = document.createElement("div");

    card.className = "movie-card";

    const poster =
        movie.poster ||
        movie.image ||
        movie.thumbnail ||
        "assets/images/default.jpg";

    const title =
        movie.title ||
        movie.name ||
        "Unknown Title";

    card.innerHTML = `

        <img
            src="${poster}"
            alt="${title}"
            class="movie-poster"
        >

        <div class="movie-info">

            <h3 class="movie-title">
                ${title}
            </h3>

            <p class="movie-quality">
                ${movie.quality || ""}
            </p>

        </div>

    `;

    card.onclick = () => {

        location.href = `watch.html?id=${movie.id}`;

    };

    return card;

}

/*==========================================
        LOADING PLACEHOLDER
==========================================*/

export function loadingCards() {

    return Array(8)
        .fill(`
            <div class="movie-card skeleton"></div>
        `)
        .join("");

}

/*==========================================
        LOAD MOVIE CARD
==========================================*/

export function loadMovieCard(card, movie) {

    const poster = card.querySelector(".movie-poster");
    const title = card.querySelector(".movie-title");

    if (poster) {

        poster.src =
            movie.poster ||
            movie.image ||
            movie.thumbnail ||
            "assets/images/default.jpg";

        poster.alt =
            movie.title ||
            movie.name ||
            "Movie";

    }

    if (title) {

        title.textContent =
            movie.title ||
            movie.name ||
            "Unknown Title";

    }

}

/*==========================================
            LOAD SECTIONS
==========================================*/

export function loadSections(data) {

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
