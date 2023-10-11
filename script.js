 // Given API key: 6e2e191
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=6e2e191
// script.js
const API_KEY = "6e2e191";
const searchInput = document.getElementById("search");
const moviesContainer = document.getElementById("movies");

searchInput.addEventListener("input", debounce(searchMovies, 300));

function debounce(func, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
}

async function searchMovies() {
    const query = searchInput.value;
    if (query === "") {
        moviesContainer.innerHTML = "";
        return;
    }

    const url = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Search) {
            displayMovies(data.Search);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {

        const movieElement = document.createElement("a");
         movieElement.href = `movie-detail.html?id=${movie.imdbID}`;
         movieElement.className = "movie-link";

         const movieDiv = document.createElement("div");
         movieDiv.className = "movie";
 
        const posterElement = document.createElement("img");
        posterElement.src = movie.Poster;
        posterElement.alt = movie.Title;

        const titleElement = document.createElement("div");
        titleElement.classList.add("movie-title");
        titleElement.textContent = movie.Title;

        const ratingElement = document.createElement("div");
        ratingElement.classList.add("movie-rating");
        ratingElement.textContent = `Rating: ${movie.imdbRating}`;

        const favoriteButton = document.createElement("button");
        favoriteButton.classList.add("favorite-button");
        favoriteButton.textContent = "Favorite";

        favoriteButton.addEventListener("click", () => {
            // Add the movie to favorites in local storage
            addToFavorites(movie);
        });

        movieElement.appendChild(posterElement);
        movieElement.appendChild(titleElement);
        movieElement.appendChild(ratingElement);
        movieElement.appendChild(favoriteButton);

        moviesContainer.appendChild(movieElement);
    });
}

//movie-details page
// In script.js
// ... your existing code ...



function handleMovieClick(movie) {
    const movieId = movie.imdbID;
    window.location.href = `movie-detail.html?id=${movieId}`;
}

// Example usage:
// Replace this with your actual code that generates movie elements.
const movieElements = document.querySelectorAll(".movie-link");
movieElements.forEach(movieElement => {
    movieElement.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior
        const imdbID = movieElement.href.split("=")[1];
        handleMovieClick({imdbID}); // Pass the IMDb ID to the function
    });
});



function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the movie is already in favorites
    const isAlreadyFavorite = favorites.some((favorite) => favorite.imdbID === movie.imdbID);

    if (!isAlreadyFavorite) {
        favorites.push(movie);
        // Save the updated favorites list in local storage
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`"${movie.Title}" has been added to your favorites!`);

        console.log(favorites);
    } else {
        alert("This movie is already in your favorites!");
    }
}



// favorites.js

document.addEventListener("DOMContentLoaded", displayFavorites);

function displayFavorites() {
    const favoritesContainer = document.getElementById("favorites");
    const favorites = getFavoritesFromLocalStorage();

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorite movies selected.</p>";
    } else {
        favoritesContainer.innerHTML = "";
        favorites.forEach((favorite) => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");

            const posterElement = document.createElement("img");
            posterElement.src = favorite.Poster;
            posterElement.alt = favorite.Title;

            const titleElement = document.createElement("div");
            titleElement.classList.add("movie-title");
            titleElement.textContent = favorite.Title;

            const ratingElement = document.createElement("div");
            ratingElement.classList.add("movie-rating");
            ratingElement.textContent = `Rating: ${favorite.imdbRating}`;

            movieElement.appendChild(posterElement);
            movieElement.appendChild(titleElement);
            movieElement.appendChild(ratingElement);

            favoritesContainer.appendChild(movieElement);
        });
    }
}

function getFavoritesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

