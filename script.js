//function for stylization 
$(document).foundation();

//declared variables
const Omdb_APIKey = "9bc581c8";

let movieTitle;

let searchHistory = [];

var falseSearch = $(".status");

//takes movie input and passes the title to the movieSearch function
$("#searchBtn").click(function (event){
    event.preventDefault();
    falseSearch.text("");
    var movieInput = $("#searchMovie").val();
    movieSearch (movieInput)
});

//requests movie information from omdb API based on movie title
function movieSearch(movieTitle){
var movieQueryUrl = `http://www.omdbapi.com/?apikey=${Omdb_APIKey}&t=${movieTitle}`
fetch(movieQueryUrl)
.then(function(response){
    return response.json()
})
//alerts user if their search is unrecognizable or displays relevant movie information if successful.
.then(function(data){
    if(data.Error){
    
    falseSearch.text("No Results Found");
    return;
    }
    else{

    var movieInfo = $(".searchResults");
    console.log(data);
    movieInfo.css({
        display: "block"
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
    $(".rottenValue").text("Rotten Tomatoes - " + rotten +" Fresh");
    $(".metaValue").text("Metacritic Rating - " + meta);

//pushes the searched information to local storage
    searchHistory.push({
        name : name, rated : rated, poster : poster, imdb : imdb, rotten : rotten, meta : meta})
    localStorage.setItem("movieSave", JSON.stringify(searchHistory))

}})


}
//displays local storage in the console
function getHistory(){
    var history = localStorage.getItem("movieSave");
    searchHistory = JSON.parse(history) || [];

    console.log(searchHistory);
}

getHistory()