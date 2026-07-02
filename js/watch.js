"use strict";

import { supabase } from "../supabase.js";

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    if (!movieId) {
        console.error("No movie selected.");
        return;
    }

    try {

        const { data: movie, error } = await supabase
            .from("movies")
            .select("*")
            .eq("id", movieId)
            .single();

        if (error) throw error;

        document.querySelector("#movie-title").textContent =
            movie.title || "Unknown Title";

        document.querySelector("#movie-description").textContent =
            movie.description || "";

        document.querySelector("#movie-rating").textContent =
            movie.rating ? `⭐ ${movie.rating}` : "N/A";

        document.querySelector("#movie-year").textContent =
            movie.year || "";

        const poster = document.querySelector("#movie-poster");

        if (poster) {

            poster.src =
                movie.poster || "assets/images/default.jpg";

            poster.alt =
                movie.title || "Movie";

        }

        const video = document.querySelector("#video-player");

        if (video && movie.video_url) {

            video.src = movie.video_url;

        }

        const playBtn = document.querySelector("#play-btn");

        if (playBtn && video) {

            playBtn.onclick = () => {

                video.style.display = "block";
                playBtn.style.display = "none";

            };

        }

        const fullscreen = document.querySelector("#fullscreen-btn");

        if (fullscreen && video) {

            fullscreen.onclick = () => {

                if (video.requestFullscreen) {
                    video.requestFullscreen();
                }

            };

        }

        const back = document.querySelector("#back-btn");

        if (back) {

            back.onclick = () => {

                history.back();

            };

        }

    } catch (err) {

        console.error("Watch Error:", err);

    }

});
