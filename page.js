let positions = {
    all_categories: 1,
    action: 1,
    adventure: 1,
    horror: 1,
    thriller: 1
}

const nb_visible_elt = 4;

const sendRequest = async function(url) {
    // Return the data from a request to an url 
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const results = jsonResponse.results;
        return results;
    }
    catch (e) {
        logError(e);
    }
}
const loadData = async function(urlList) {
    // From a list of URL, return a list of data
    let data = [];
    for (let i = 0; i < urlList.length; i++) {
        data.push(await sendRequest(urlList[i]));
    }
    return data
}
let displayTopMovieData = function(topRanked) {
    // Put the top movie data in the 'movie' blocks
    const block = document.querySelector(".top-movie__information");
    block.innerHTML = (
        "<strong>" + topRanked.title + "</strong>"
        + "<br><strong>Genre(s) :</strong> " + topRanked.genres
        + "<br><strong>Année :</strong> " + topRanked.year
        + "<br><strong>Note :</strong> " + topRanked.imdb_score
        + "<br><strong>Acteurs :</strong> " + topRanked.actors
        + "<br><strong>Producteur :</strong> " + topRanked.directors
    );
}

let displayMoviePreview = function(categoryBlock, categoryData) {
    // Put the movies' data in the 'movie' blocks
    const blocks = categoryBlock.querySelectorAll(".movie__information");
    for (let i = 0; i < blocks.length; i++) {
        const movie = categoryData[i];
        blocks[i].innerHTML = (
            "<strong>" + movie.title + "</strong>"
            + "<br><strong>Genre(s) :</strong> " + movie.genres
            + "<br><strong>Année :</strong> " + movie.year
            + "<br><strong>Note :</strong> " + movie.imdb_score
        );
    }
}
const displayMoviePosters = function(categoryBlock, categoryData) {
    // Display the posters in the 'movie' blocks
    const articles = categoryBlock.querySelectorAll("article");
    const h2s = categoryBlock.querySelectorAll(".movie h2");
    for (let i = 0; i < articles.length; i++) {
        articles[i].style.backgroundImage = "url('" + categoryData[i].image_url + "')";
        h2s[i].innerHTML = categoryData[i].title;
    }
}
let displayMovieData = function(categoryBlock, categoryData) {
    // Add the movies data to the modals
    const blocks = categoryBlock.querySelectorAll(".modal");
    for (let i = 0; i < blocks.length; i++) {
        let movie = categoryData[i];
        blocks[i].querySelector("p").innerHTML = (
            "<strong>" + movie.title + "</strong>"
            + "<br><strong>Acteurs :</strong> " + movie.actors
            + "<br><strong>Producteur :</strong> " + movie.directors
            + "<br><strong>Genre(s) :</strong> " + movie.genres
            + "<br><strong>Année :</strong> " + movie.year
            + "<br><strong>Note :</strong> " + movie.imdb_score
        );
    }
}

let setPage = async function() {
    // Initialize the page by calling the different display functions of the programme
    data = await loadData([TOP_RANKED, BEST_ALL_CATEGORIES, BEST_ACTION, BEST_ADVENTURE, BEST_HORROR, BEST_THRILLER]);
    topRanked = data[0];
    const categoryBlocks = document.querySelectorAll(".category");
    //Categories
    for (let i = 0; i < categoryBlocks.length; i++) {
        displayMoviePreview(categoryBlocks[i], data[(i + 1)]); // "+ 1" due to the fact that the first element of the array isn't for a category
        displayMoviePosters(categoryBlocks[i], data[(i + 1)]);
        displayMovieData(categoryBlocks[i], data[(i + 1)]);
    }
    //Top Movie
    const topMovieAside = document.querySelector("#top-movie__poster");
    topMovieAside.style.backgroundImage = "url('" + topRanked[0].image_url + "')";
    displayTopMovieData(topRanked[0]);
}

let checkArrows = async function(category, nb_total_elt) {
    // Change the side arrows (to browse the movies) to active or to disable according to the position inside the categories
    if (positions[category] == 1) {
        document.querySelector("#" + category +  " .left").classList.add("side-arrow--disable");   
    } else if (positions[category] > (nb_total_elt - nb_visible_elt)) {
        document.querySelector("#" + category +  " .right").classList.add("side-arrow--disable");
    } else {
        document.querySelector("#" + category +  " .left").classList.remove("side-arrow--disable");
        document.querySelector("#" + category +  " .right").classList.remove("side-arrow--disable");
    }
}
let setVisibleMovies = async function(parent, position) {
    // Display or hide the movies in the categories depending of the position of the category
    const nb_total_elt = 7;
    for(let elt_nb = 1; elt_nb <= nb_total_elt; elt_nb++) {
        if ((elt_nb >= position) && (elt_nb < (nb_visible_elt + position))) {
            document.querySelector(parent + " .category__best-movies .movie:nth-child(" + elt_nb + ")").classList.remove("movie--hidden");
        }else {
            document.querySelector(parent + " .category__best-movies .movie:nth-child(" + elt_nb + ")").classList.add("movie--hidden");
        }
    }
}

let changeCategoryPosition = async function(category, direction) {
    // Change the position inside the category
    const nb_total_elt = document.querySelectorAll("#" + category + " .movie").length;
    if (direction == "right") {
        if (positions[category] <= (nb_total_elt - nb_visible_elt)) {
        positions[category] ++;
        setVisibleMovies("#" + category, positions[category]);
        }
    } else {
        if (positions[category] > 1) {
        positions[category] --;
        setVisibleMovies("#" + category, positions[category]);
        }
    }
    checkArrows(category, nb_total_elt);
}
let openModal = async function(movie) {
    document.querySelector("#" + movie + " .modal").style.visibility = "visible";
}
let closeModal = async function(movie) {
    document.querySelector("#" + movie + " .modal").style.visibility = "hidden";
}

setPage();
