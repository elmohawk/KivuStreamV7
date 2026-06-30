import { loadSections } from "./home.js";
import { loadHero } from "./hero.js";
import { supabaseClient } from "./config.js";
document.addEventListener("DOMContentLoaded", loadMovies);
/*==================================================
                KIVUSTREAM APP.JS
==================================================*/

"use strict";

/*==============================
    DOM ELEMENTS
==============================*/

const loader = document.getElementById("loader");
const navbar = document.querySelector(".navbar");
const topBtn = document.getElementById("topBtn");
const searchInput = document.querySelector(".search-box input");

/*==============================
    PAGE LOADER
==============================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.remove();
        }, 500);

    }, 1200);

});

/*==============================
    STICKY NAVBAR
==============================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.style.background = "rgba(0,0,0,.95)";
        navbar.style.padding = "14px 8%";
        navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.4)";

    }else{

        navbar.style.background = "rgba(0,0,0,.30)";
        navbar.style.padding = "18px 8%";
        navbar.style.boxShadow = "none";

    }

});

/*==============================
    BACK TO TOP
==============================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        topBtn.style.display = "flex";
        topBtn.style.alignItems = "center";
        topBtn.style.justifyContent = "center";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==============================
    SEARCH
==============================*/

searchInput.addEventListener("keyup",(e)=>{

    if(e.key==="Enter"){

        const query = searchInput.value.trim();

        if(query!==""){

            window.location.href =
            `search.html?q=${encodeURIComponent(query)}`;

        }

    }

});

/*==============================
    ACTIVE NAVIGATION
==============================*/

const links = document.querySelectorAll(".nav-links a");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        links.forEach(item=>item.classList.remove("active"));

        link.classList.add("active");

    });

});

/*==============================
    BUTTON RIPPLE EFFECT
==============================*/

const buttons = document.querySelectorAll("button,.watch-btn");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        const size=Math.max(
            this.clientWidth,
            this.clientHeight
        );

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=
        e.clientX-
        this.getBoundingClientRect().left-
        size/2+"px";

        ripple.style.top=
        e.clientY-
        this.getBoundingClientRect().top-
        size/2+"px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*==============================
    SCROLL REVEAL
==============================*/

const reveals=document.querySelectorAll(".movie-section");

function reveal(){

    const windowHeight=window.innerHeight;

    reveals.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<windowHeight-120){

            section.classList.add("show");

        }

    });

}

window.addEventListener("scroll",reveal);

reveal();

/*==============================
    CARD HOVER SOUND (OPTIONAL)
==============================*/

// const hoverSound = new Audio("assets/audio/hover.mp3");

// document.querySelectorAll(".movie-card").forEach(card=>{

//     card.addEventListener("mouseenter",()=>{

//         hoverSound.currentTime=0;
//         hoverSound.play();

//     });

// });

/*==============================
    KEYBOARD SHORTCUTS
==============================*/

document.addEventListener("keydown",(e)=>{

    // Press "/"
    if(e.key==="/"){

        e.preventDefault();

        searchInput.focus();

    }

    // Escape clears search
    if(e.key==="Escape"){

        searchInput.value="";

        searchInput.blur();

    }

});

/*==============================
    CONSOLE BRANDING
==============================*/

console.log(`
====================================
          KIVUSTREAM
          IT HAWK_RW
====================================
`);
"use strict";


async function loadMovies(){

    console.log("KIVUSTREAM Loading Movies...");

    const { data, error } = await supabaseClient
        .from("movies")
        .select("*");

    if(error){
        console.error("SUPABASE ERROR:", error);
        return;
    }

    if(!data || data.length === 0){
        console.warn("No movies found");
        return;
    }

    console.log("Movies loaded:", data.length);

    // ✅ NOW EVERYTHING CONNECTS
    await loadHero(data);
    loadSections(data);

}
