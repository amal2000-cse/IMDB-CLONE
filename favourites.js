// favorites.js

// document.addEventListener("DOMContentLoaded", displayFavorites);

// function displayFavorites() {
//     const favoritesContainer = document.getElementById("favorites");
//     const favorites = getFavoritesFromLocalStorage();

//     if (favorites.length === 0) {
//         favoritesContainer.innerHTML = "<p>No favorite movies selected.</p>";
//     } else {
//         favoritesContainer.innerHTML = "";
//         favorites.forEach((favorite) => {
//             const movieElement = document.createElement("div");
//             movieElement.classList.add("movie");

//             const posterElement = document.createElement("img");
//             posterElement.src = favorite.Poster;
//             posterElement.alt = favorite.Title;

//             const titleElement = document.createElement("div");
//             titleElement.classList.add("movie-title");
//             titleElement.textContent = favorite.Title;

//             const ratingElement = document.createElement("div");
//             ratingElement.classList.add("movie-rating");
//             ratingElement.textContent = `Rating: ${favorite.imdbRating}`;

//             movieElement.appendChild(posterElement);
//             movieElement.appendChild(titleElement);
//             movieElement.appendChild(ratingElement);

//             favoritesContainer.appendChild(movieElement);
//         });
//     }
// }

// function getFavoritesFromLocalStorage() {
//     return JSON.parse(localStorage.getItem("favorites")) || [];
// }


// favorites.js

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
            movieElement.className = "movie";

            const posterElement = document.createElement("img");
            posterElement.src = favorite.Poster;
            posterElement.alt = favorite.Title;

            const titleElement = document.createElement("div");
            titleElement.className = "movie-title";
            titleElement.textContent = favorite.Title;

            const ratingElement = document.createElement("div");
            ratingElement.className = "movie-rating";
            ratingElement.textContent = `Rating: ${favorite.imdbRating}`;

            const removeButton = document.createElement("button");
            removeButton.className = "remove-button";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", () => {
                // Remove the movie from favorites in local storage
                removeFromFavorites(favorite);
                // Display an alert message
                alert(`"${favorite.Title}" has been removed from your favorites!`);
                // Refresh the page to reflect the updated favorites
                location.reload();
            });

            movieElement.appendChild(posterElement);
            movieElement.appendChild(titleElement);
            movieElement.appendChild(ratingElement);
            movieElement.appendChild(removeButton);

            favoritesContainer.appendChild(movieElement);
        });
    }
}

function getFavoritesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function removeFromFavorites(movie) {
    let favorites = getFavoritesFromLocalStorage();
    favorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
