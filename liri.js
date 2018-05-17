require('dotenv').config();

var keysFile = require('./keys.js');
var request = require("request");

//var spotify = new Spotify(keysFile.spotify);
//var Spotify= require('./node-spotify-api')



var Twitter = require('twitter');
var client = new Twitter(keysFile.twitter);
var myID='996501445997486081';
var params = 
{
    id: myID,
    count:20,
    text:""
};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
      console.log(tweets);
  }
});


