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
