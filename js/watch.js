// KIVUSTREAM WATCH PAGE SCRIPT

document.addEventListener("DOMContentLoaded", () => {

    // Get movie data from URL
    const params = new URLSearchParams(window.location.search);

    const movieTitle = params.get("movie") || "Unknown Movie";
    const movieImage = params.get("image") || "assets/images/default.jpg";
    const movieVideo = params.get("video") || "";
    const movieDescription = params.get("description") || 
    "Enjoy watching this movie on KIVUSTREAM.";

    // Elements
    const title = document.getElementById("movie-title");
    const poster = document.getElementById("movie-poster");
    const description = document.getElementById("movie-description");
    const video = document.getElementById("video-player");


    // Load Movie Info
    if(title){
        title.textContent = movieTitle;
    }

    if(poster){
        poster.src = movieImage;
    }

    if(description){
        description.textContent = movieDescription;
    }


    // Load Video
    if(video && movieVideo){

        video.src = movieVideo;

    }


    // Play Button
    const playBtn = document.getElementById("play-btn");

    if(playBtn){

        playBtn.addEventListener("click",()=>{

            if(video){

                video.play();

                playBtn.style.display="none";

            }

        });

    }



    // Fullscreen Button
    const fullscreenBtn = document.getElementById("fullscreen-btn");


    if(fullscreenBtn){

        fullscreenBtn.addEventListener("click",()=>{

            if(video.requestFullscreen){

                video.requestFullscreen();

            }

        });

    }



    // Back Button
    const backBtn = document.getElementById("back-btn");

    if(backBtn){

        backBtn.onclick = ()=>{

            history.back();

        };

    }



    // Related Movies Demo Data

    const relatedMovies = [

        {
            title:"Movie One",
            image:"assets/images/movie1.jpg"
        },

        {
            title:"Movie Two",
            image:"assets/images/movie2.jpg"
        },

        {
            title:"Anime Collection",
            image:"assets/images/anime.jpg"
        }

    ];


    const relatedContainer =
    document.getElementById("related-movies");


    if(relatedContainer){


        relatedMovies.forEach(movie=>{


            relatedContainer.innerHTML += `

            <div class="movie-card">

                <img src="${movie.image}">

                <h3>${movie.title}</h3>

            </div>

            `;


        });


    }


});
