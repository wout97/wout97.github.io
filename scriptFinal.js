// JavaScript source code
//generate html

var url_string = window.location.href;
var url = new URL(url_string);
var token = url.searchParams.get("token");
var requetsUrl= "https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.9&min_popularity=50&market=US";
var response2 = callSpotifyAPI2(requetsUrl);
 getTracks(response2.tracks);

//generate track html for playlist
function getTracks(response) {
    var x;
    var trackItems = "";
    //var tracks = ["song 1 :" + playlist, "song 2 :" + playlist, "song 3 :" + playlist, "song 4 : " + playlist, "song 5 :" + playlist, "song 6 :" + playlist];
	console.log("adding = ");
	for (x in response) {
        trackItems += "<ion-item><ion-label>" + response[x].name + " </ion-label>  <ion-checkbox slot='end' value='pepperoni' checked></ion-checkbox>  </ion-item>"
    }


    document.getElementById("playlists2").innerHTML +=  " <ion-content fullscreen><ion-list>" + trackItems + "</ion-list> </ion-content>"

}


//Uses own token to get my playlists from spotifyAPI returns JSON response
function callSpotifyAPI2(url){
	var token2 = "Bearer " + token;
	var response = httpGet(url, token2);
	var playlist_response = JSON.parse(response);
	return playlist_response;
}


//Simple get request with auth
function httpGet(theUrl, token) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', token);
    xmlHttp.send();
    return xmlHttp.responseText;
}
