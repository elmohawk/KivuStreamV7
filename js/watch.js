// KIVUSTREAM WATCH ENGINE

document.addEventListener("DOMContentLoaded", async ()=>{


const params = new URLSearchParams(window.location.search);


// Movie ID from homepage
const movieId = params.get("id");


if(!movieId){

console.log("No movie selected");
return;

}



// TMDB API
const API_KEY = window.TMDB_KEY;

const movieURL =
`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`;



try{


const response = await fetch(movieURL);

const movie = await response.json();



// HTML Elements

const title =
document.querySelector("#movie-title");


const poster =
document.querySelector("#movie-poster");


const description =
document.querySelector("#movie-description");


const rating =
document.querySelector("#movie-rating");


const year =
document.querySelector("#movie-year");



if(title)
title.textContent = movie.title;



if(poster)

poster.src =
"https://image.tmdb.org/t/p/w500"+movie.poster_path;



if(description)

description.textContent =
movie.overview;



if(rating)

rating.textContent =
"⭐ "+movie.vote_average;



if(year)

year.textContent =
movie.release_date?.split("-")[0];





// Trailer

const trailer =
movie.videos.results.find(
v=>v.type==="Trailer"
);



const video =
document.querySelector("#video-player");


if(video && trailer){


video.src =
"https://www.youtube.com/embed/"+trailer.key;


}





// Play Button

const playBtn =
document.querySelector("#play-btn");



if(playBtn){


playBtn.onclick=()=>{


video.style.display="block";

playBtn.style.display="none";


};


}





// Fullscreen


const fullscreen =
document.querySelector("#fullscreen-btn");



if(fullscreen){


fullscreen.onclick=()=>{


video.requestFullscreen();


};


}





// Back Button


const back =
document.querySelector("#back-btn");



if(back){


back.onclick=()=>{

history.back();

};


}



}


catch(error){


console.error(
"KIVUSTREAM WATCH ERROR:",
error
);


}



});
