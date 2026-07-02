"use strict";

import { supabase } from "./supabase.js";
import { loadHero } from "./hero.js";
import { loadSections } from "./home.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

/*==================================================
                    INITIALIZE
==================================================*/

async function initializeApp() {

    pageLoader();
    setupNavbar();
    setupBackToTop();
    setupSearch();
    setupNavigation();
    setupRipple();
    setupReveal();
    setupKeyboard();

    await loadMovies();

}

/*==================================================
                    LOAD MOVIES
==================================================*/

async function loadMovies() {

    console.log("Loading movies from Supabase...");

    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    if (!data || data.length === 0) {
        console.warn("No movies found.");
        return;
    }

    loadHero(data);
    loadSections(data);

}

/*==================================================
                    PAGE LOADER
==================================================*/

function pageLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            setTimeout(() => loader.remove(), 500);

        }, 1000);

    });

}

/*==================================================
                    NAVBAR
==================================================*/

function setupNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.style.background = "rgba(0,0,0,.95)";
            navbar.style.padding = "14px 8%";
            navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.4)";

        } else {

            navbar.style.background = "rgba(0,0,0,.3)";
            navbar.style.padding = "18px 8%";
            navbar.style.boxShadow = "none";

        }

    });

}

/*==================================================
                    BACK TO TOP
==================================================*/

function setupBackToTop() {

    const topBtn = document.getElementById("topBtn");

    if (!topBtn) return;

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 500 ? "flex" : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/*==================================================
                    SEARCH
==================================================*/

function setupSearch() {

    const input = document.querySelector(".search-box input");

    if (!input) return;

    input.addEventListener("keyup", (e) => {

        if (e.key === "Enter") {

            const query = input.value.trim();

            if (query) {

                window.location.href =
                    `search.html?q=${encodeURIComponent(query)}`;

            }

        }

    });

}

/*==================================================
                ACTIVE NAVIGATION
==================================================*/

function setupNavigation() {

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        });

    });

}

/*==================================================
                RIPPLE EFFECT
==================================================*/

function setupRipple() {

    document.querySelectorAll("button,.watch-btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const size = Math.max(this.clientWidth, this.clientHeight);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                e.clientX - this.getBoundingClientRect().left - size / 2 + "px";

            ripple.style.top =
                e.clientY - this.getBoundingClientRect().top - size / 2 + "px";

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

        });

    });

}

/*==================================================
                SCROLL REVEAL
==================================================*/

function setupReveal() {

    const sections = document.querySelectorAll(".movie-section");

    function reveal() {

        const windowHeight = window.innerHeight;

        sections.forEach(section => {

            if (section.getBoundingClientRect().top < windowHeight - 120) {

                section.classList.add("show");

            }

        });

    }

    reveal();

    window.addEventListener("scroll", reveal);

}

/*==================================================
                KEYBOARD SHORTCUTS
==================================================*/

function setupKeyboard() {

    const input = document.querySelector(".search-box input");

    document.addEventListener("keydown", e => {

        if (e.key === "/" && input) {

            e.preventDefault();
            input.focus();

        }

        if (e.key === "Escape" && input) {

            input.value = "";
            input.blur();

        }

    });

}

console.log("KIVUSTREAM Loaded Successfully");
