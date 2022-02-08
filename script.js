//function for stylization 
$(document).foundation();

//declared variables
const Omdb_APIKey = "9bc581c8";

let movieTitle;

let searchHistory = [];

var falseSearch = $(".status");

//takes movie input a
nd passes the title to the movieSearch function
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        falseSearch.text("");
        var movieInput = $("#searchMovie").val();
        movieSearch(movieInput)
    });

//requests movie information from omdb API based on movie title
function movieSearch(movieTitle) {
    var movieQueryUrl = `http://www.omdbapi.com/?apikey=${Omdb_APIKey}&t=${movieTitle}`
    fetch(movieQueryUrl)
        .then(function (response) {
            return response.json()
        })
        //alerts user if their search is unrecognizable or displays relevant movie information if successful.
        .then(function (data) {
            if (data.Error) {

                falseSearch.text("No Results Found");
                return;
            }
            else {

                var movieInfo = $(".searchResults");
                console.log(data);
                movieInfo.css({
                    display: "flex"
                });
                // variables & functions needed to select and display relevant movie information from omdb
                var name = data.Title;
                var rated = data.Rated;
                var poster = data.Poster;
                var imdb = data.Ratings[0].Value;
                var rotten = data.Ratings[1].Value;
                var meta = data.Ratings[2].Value;

                $(".movieName").text(name);
                $(".movieRated").text(rated);
                $(".moviePoster").attr("src", poster);
                $(".imdbValue").text("IMDB Rating - " + imdb);
                $(".rottenValue").text("Rotten Tomatoes - " + rotten + " Fresh");
                $(".metaValue").text("Metacritic Rating - " + meta);

                //pushes the searched information to local storage
                searchHistory.push({
                    name: name, rated: rated, poster: poster, imdb: imdb, rotten: rotten, meta: meta
                })
                localStorage.setItem("movieSave", JSON.stringify(searchHistory))

            }
        })


}
//displays local storage in the console
function getHistory() {
    var history = localStorage.getItem("movieSave");
    searchHistory = JSON.parse(history) || [];

    console.log(searchHistory);
}

getHistory()

//varibles and const for change logo feature
var pickGiph = $('.pick-giph');
const modal3 = $('#modal-3');

//function for Giphy API call
$(modal3).click(function () {

    const theURL = `https://api.giphy.com/v1/gifs?api_key=etTrYNRQwZ80ku2R2vn2pR2fnV5IegRb&ids=mBkOh02yl747xbahsT,9Sh1b3LnqLq0mPlM4a,i340Scmnq6MZZpqsX8,wPXoJFeuWRZII,bEUL9hYmKMfOh3TSQo,xUPGcszkFKHeremuA0`;

    fetch(theURL)

        .then((response) => {
            return response.json();
        })

        .then(function (response) {
            var { data } = response;
            console.log(response);
            displayGiphy(data);
        });
})

//function for displaying logos
function displayGiphy(data) {
    for (var i = 0; i < data.length; i++) {
        const { images } = data[i];


        pickGiph[i].src = images.fixed_width_small_still.url;

        $(pickGiph).click(function (event) {
            event.preventDefault();
            const button = $(event.target);
            const theIcon = button.attr('src');

            localStorage.setItem("selectedIcon", (theIcon));
            changeGiphy();
        });
    };
}

//function for changing logos
function changeGiphy() {
    var newIcon = localStorage.getItem("selectedIcon");
    console.log(newIcon);
    $("#final-logo").attr('src', newIcon);

}