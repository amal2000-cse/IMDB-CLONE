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
        const apiKey = "6e2e191";

        const apiUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    // Create elements to display movie details

                    const titleElement = document.createElement("h2");
                    titleElement.textContent = data.Title;

                    
                    const posterElement = document.createElement("img");
                    posterElement.src = data.Poster;
                    posterElement.alt = data.Title; 


                    const actorsElement = document.createElement("p");
                    actorsElement.textContent = `Actors: ${data.Actors}`;

                    const plotElement = document.createElement("p");
                    plotElement.textContent = `Plot: ${data.Plot}`;

                    const countryElement = document.createElement("p");
                    countryElement.textContent = `Country: ${data.Country}`;

                    const directorElement = document.createElement("p");
                    directorElement.textContent = `Director: ${data.Director}`;

                    const genreElement = document.createElement("p");
                    genreElement.textContent = `Genre: ${data.Genre}`;

                    const languageElement = document.createElement("p");
                    languageElement.textContent = `Language: ${data.Language}`;

                    const ratingsElement = document.createElement("p");
                    ratingsElement.textContent = `Ratings: ${data.Ratings[0].Value}`;

                    const releasedElement = document.createElement("p");
                    releasedElement.textContent = `Released: ${data.Released}`;

                    const runtimeElement = document.createElement("p");
                    runtimeElement.textContent = `Runtime: ${data.Runtime}`;

                    const typeElement = document.createElement("p");
                    typeElement.textContent = `Type: ${data.Type}`;

                    const writerElement = document.createElement("p");
                    writerElement.textContent = `Writer: ${data.Writer}`;

                    const yearElement = document.createElement("p");
                    yearElement.textContent = `Year: ${data.Year}`;

                    const imdbRatingElement = document.createElement("p");
                    imdbRatingElement.textContent = `IMDb Rating: ${data.imdbRating}`;

                    // Append the elements to the movie detail container
                    movieDetailContainer.appendChild(titleElement);
                    movieDetailContainer.appendChild(posterElement);

                    movieDetailContainer.appendChild(actorsElement);
                    movieDetailContainer.appendChild(plotElement);
                    movieDetailContainer.appendChild(countryElement);
                    movieDetailContainer.appendChild(directorElement);
                    movieDetailContainer.appendChild(genreElement);
                    movieDetailContainer.appendChild(languageElement);
                    movieDetailContainer.appendChild(ratingsElement);
                    movieDetailContainer.appendChild(releasedElement);
                    movieDetailContainer.appendChild(runtimeElement);
                    movieDetailContainer.appendChild(typeElement);
                    movieDetailContainer.appendChild(writerElement);
                    movieDetailContainer.appendChild(yearElement);
                    movieDetailContainer.appendChild(imdbRatingElement);
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
