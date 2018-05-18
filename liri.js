require('dotenv').config();

var keysFile = require('./keys.js');
var request = require("request");



var spotify = require('spotify');
//var Twitter = require('twitter');

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




 
spotify.search({ type: 'artist', query: 'nsync' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log(data);
 
    // Do something with 'data'
});