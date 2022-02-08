//declared variables
const Omdb_APIKey = "9bc581c8";

let movieTitle;

let searchHistory = [];

const falseSearch = $(".status");

//varibles and const for change logo feature
const pickGiph = $('.pick-giph');
const modal3 = $('#modal-3');

//requests movie information from omdb API based on movie title
function movieSearch(movieTitle) {
  const movieQueryUrl = `http://www.omdbapi.com/?apikey=${Omdb_APIKey}&t=${movieTitle}`
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

        const movieInfo = $(".searchResults");
        console.log(data);
        movieInfo.css({
          display: "block"
        });
        // variables & functions needed to select and display relevant movie information from omdb
        const name = data.Title;
        const rated = data.Rated;
        const poster = data.Poster;
        const imdb = data.Ratings[0].Value;
        const rotten = data.Ratings[1].Value;
        const meta = data.Ratings[2].Value;

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

  function reviewSearch(article) {
    const movieQueryUrl = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${article}&api-key=VCUncjp6KdrCytriuCnPlexKO0FvNjIk`
    fetch(movieQueryUrl)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        const movieReview = $(".searchResults")
        movieReview.css({
          display: "block"
        })
  
        for (let i = 0; i < data.results.length; i++) {
          const reviewTitle = data.results[i].display_title
          const reviewLink = data.results[i].link.url
          $("#reviews").append($('<p>').html(reviewTitle));
          $("#reviews").append($('<p>').html('<a href="'+reviewLink+'">'+"Read this review here"+'</a>'));
        }
      })
  }

//displays local storage in the console
function getHistory() {
  const history = localStorage.getItem("movieSave");
  searchHistory = JSON.parse(history) || [];

  console.log(searchHistory);
}

//function for displaying logos
function displayGiphy(data) {
  for (let i = 0; i < data.length; i++) {
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
  const newIcon = localStorage.getItem("selectedIcon");
  console.log(newIcon);
  $("#final-logo").attr('src', newIcon);
}

  //takes movie input and passes the title to the movieSearch function
  $("#searchBtn").click(function (event) {
    event.preventDefault();
    falseSearch.text("");
    const movieInput = $("#searchMovie").val();
    movieSearch(movieInput);
    reviewSearch(movieInput);
  });

//function for Giphy API call
$(modal3).click(function () {

  const theURL = `https://api.giphy.com/v1/gifs?api_key=etTrYNRQwZ80ku2R2vn2pR2fnV5IegRb&ids=mBkOh02yl747xbahsT,9Sh1b3LnqLq0mPlM4a,i340Scmnq6MZZpqsX8,wPXoJFeuWRZII,bEUL9hYmKMfOh3TSQo,xUPGcszkFKHeremuA0`;

  fetch(theURL)

    .then((response) => {
      return response.json();
    })

    .then(function (response) {
      const { data } = response;
      console.log(response);
      displayGiphy(data);
    });
})

getHistory()

//function for stylization 
$(document).foundation();