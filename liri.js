require('dotenv').config();

var keysFile = require('./keys.js');
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var userInput = process.argv.slice(3);
var liriCommands = process.argv[2];

doWhatItSays();
function doWhatItSays() {

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
        case "do-what-it-says":
            getWhatItSays();
            break;
        default:
            console.log("Try entering one of these commands. 1. spotify-this-song, 2. my-tweets, 3. movie-this ")
    }
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

            }



        }
    });
}



function getSpotify() {
    var spotify = new Spotify(keysFile.spotify);
    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        var callMe = data.tracks.items
        for (var i = 0; i < 1; i++) {
            console.log("Artist: " + callMe[i].album.artists[0].name + "||" + "Song Title: " + callMe[i].name + "||" + "Song Preview: " + callMe[i].preview_url + "||" + "Album: " + callMe[i].album.name);

        }
    });


    //    * If no song is provided then your program will default to "The Sign" by Ace of Base.

    //spotify needs work returns info but isnt 100% correct, also needs  a default.

}

function getMovies() {
    var userInput = process.argv[3];
    if (!userInput) {
        userInput = "mr nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

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

function getWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)

        }
        var dataArr=(data.split(','));
        liriCommands=dataArr[0];
        userInput=dataArr[1];
        var input=liriCommands+userInput
        doWhatItSays(input);

        

    });
}

