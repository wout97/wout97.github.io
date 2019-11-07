// JavaScript source code
//generate html

var url_string = window.location.href;
var url = new URL(url_string);
var token = url.searchParams.get("token");
var accou = url.searchParams.get("ac");
var dance = url.searchParams.get("da");
var energy = url.searchParams.get("en");
var instrumental = url.searchParams.get("in");
var mood = url.searchParams.get("mo");
var songs = url.searchParams.get("seed");

var requetsUrl= "https://api.spotify.com/v1/recommendations?seed_tracks=" + songs + "&target_acousticness="+ accou/100 +"&target_danceability=" + dance/100 + "&target_energy=" + energy/100 + "&target_instrumentalness="+ instrumental/100;
var response2 = callSpotifyAPI2(requetsUrl);
 getTracks(response2.tracks);

//generate track html for playlist
function getTracks(response) {
    var x;
    var trackItems = "";
    //var tracks = ["song 1 :" + playlist, "song 2 :" + playlist, "song 3 :" + playlist, "song 4 : " + playlist, "song 5 :" + playlist, "song 6 :" + playlist];
	console.log("adding = " + response);
	for (x in response) {
		console.log("adding = " + response[x].name);
        trackItems += "<ion-item><ion-label>" + response[x].name + " </ion-label>  <ion-checkbox slot='end' value='pepperoni' checked></ion-checkbox>  </ion-item>"
    }
    document.getElementById("playlists2").innerHTML +=  "<ion-list '>" + trackItems + "</ion-list>"
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
