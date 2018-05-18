require('dotenv').config();

var keysFile = require('./keys.js');
var request = require("request");


var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var liriCommands = process.argv[2];

// for(var i=2;i<=liriCommands;i++){
//figure out code to accept muliple word movies
// }

//do-what-it-says

switch (liriCommands) {
    case "spotify-this-song":
        getSpotify()
        break;
    case "my-tweets":
       getMyTweets();
        break;
    case "movie-this":
    getMovies();
        break;
   default:
        console.log("Try entering one of these commands. 1. spotify-this-song, 2. my-tweets, 3. movie-this ")
}


function getMyTweets() {
    var client = new Twitter(keysFile.twitter);
    var myID = '996501445997486081';
    var params = { id: myID, count: 20 };
    client.get('statuses/user_timeline/', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var myTweets = 'Username: ' + tweets[i].user.name + '||' + ' Latest Tweet Date & Time: ' + tweets[i].created_at + '||' + ' Tweet: ' + tweets[i].text
                console.log(myTweets);
                //console.log(tweets);
            }



        }
    });
}



function getSpotify() {
    var spotify = new Spotify(keysFile.spotify);
    spotify.search({ type: 'track', query: 'barbie girl' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
        console.log("Track: " + data.tracks.items);

        //get artist name, track name, preview link of the song , the album its from
    });

}

function getMovies() {
    var movieName = process.argv[3];
    if (!movieName) {
        movieName = "mr nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        var fix = JSON.parse(body)

        if (!error && response.statusCode === 200) {

            console.log("Release Year: " + fix.Year + "||",
                "Title: " + fix.Title + "||",
                "Rated: " + fix.Rated + "||",
                "Rotten Tomatoes Rating: " + fix.Ratings[1].Value + "||",
                "Language: " + fix.Language + "||",
                "Produced In: " + fix.Country + "||",
                "Plot: " + fix.Plot + "||",
                "Actors: " + fix.Actors);
        }
    });

}

