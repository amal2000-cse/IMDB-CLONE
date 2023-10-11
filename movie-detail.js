// movie-detail.js

document.addEventListener("DOMContentLoaded", displayMovieDetails);

function displayMovieDetails() {
    const movieDetailContainer = document.getElementById("movie-detail");

    // Get the IMDb ID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get("id");

    if (!imdbID) {
        movieDetailContainer.innerHTML = "<p>Movie not found.</p>";
    } else {
        // Replace "your_api_key_here" with your actual OMDb API key
        const apiKey = "6e2e191";

        // Construct the API URL to fetch movie details
        const apiUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            
            .then(data => {
                if (data.Response === "True") {
                    // Create elements to display movie details
                    
                    const titleElement = document.createElement("h2");
                    titleElement.textContent = data.Title;

                    const actorsElement = document.createElement("p");
                    actorsElement.textContent = `Actors: ${data.Actors}`;

                    const plotElement = document.createElement("p");
                    plotElement.textContent = `Plot: ${data.Plot}`;

                    // Append the elements to the movie detail container
                    movieDetailContainer.appendChild(titleElement);
                    movieDetailContainer.appendChild(actorsElement);
                    movieDetailContainer.appendChild(plotElement);
                } else {
                    movieDetailContainer.innerHTML = "<p>Movie not found.</p>";
                    
                }
            })
            .catch(error => {
                console.error(error);
                movieDetailContainer.innerHTML = "<p>An error occurred while fetching movie details.</p>";
            });
    }
}
