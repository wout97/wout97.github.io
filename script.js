
//Authorization links
var oAuthUrl="https://accounts.spotify.com/authorize?client_id=059f69ae51c445518b106f91e9ddaf9c&redirect_uri=https://wout97.github.io/&scope=user-read-private%20user-read-email&response_type=token&state=123"
var dash="https://developer.spotify.com/dashboard/applications/059f69ae51c445518b106f91e9ddaf9c"
var newToken="https://developer.spotify.com/console/get-playlists/?user_id=wizzler&limit=&offset="
var url_string = window.location.href;
var access_token = url_string.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
var client_id = getClientId();

function getClientId(){
	var response = callSpotifyAPI2("https://api.spotify.com/v1/me");
	console.log(response);
	return null;

}


//get playlists and generate html
var playlists = getPlaylists();
displayPlaylists(playlists);


//Get array of user playlists
function getPlaylists() {
    var response = callSpotifyAPI("null");
	trackList = getTracksfromResponse(response);
	console.log(trackList);
	return getArrayUserPlaylist(response);
}

function getTracksfromResponse(response){
	var playlistUrl = response.items[0].href;
	var tracksresponse = callSpotifyAPI2(playlistUrl);
	var trackList=[];
	for (x in tracksresponse.tracks.items){
		console.log(tracksresponse.tracks.items[x].track.name);
		trackList.push(tracksresponse.tracks.items[x].track.name)
	}
	return trackList;
}

//Uses own token to get my playlists from spotifyAPI returns JSON response
function callSpotifyAPI(url){
	var user_id = "11135844104";
	var authToken =access_token;
	var token1 = "Bearer " + authToken;
	var playlistUrl = "https://api.spotify.com/v1/users/" + user_id + "/playlists";
	var response = httpGet(playlistUrl, token1);
	var playlist_response = JSON.parse(response);
	return playlist_response;
}

//Make trackPLaylist array from JSON response
function getArrayUserPlaylist(response){
	var array = [];
	for (x in response.items) {
		console.log(response.items[x].name);
		array.push(response.items[x].name);
	}
	return array;
}

//Simple get request with auth
function httpGet(theUrl, token) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', token);
    xmlHttp.send();
    return xmlHttp.responseText;
}


//generate html
function displayPlaylists(playlists) {
    document.getElementById("playlists").innerHTML = "";
    var x;
    for (x in playlists) {

        document.getElementById("playlists").innerHTML += ' <button class="collapsible">' + playlists[x] + "   " + "<ion-icon name='musical-note'></ion-icon>" + '</button><div class="content" >' + getTracks(playlists[x]) + '</div>'
    }

}

//generate track html for playlist
function getTracks(playlist) {
    var x;
    var trackItems = "";
    var tracks = ["song 1 :" + playlist, "song 2 :" + playlist, "song 3 :" + playlist, "song 4 : " + playlist, "song 5 :" + playlist, "song 6 :" + playlist];
    for (x in tracks) {

        trackItems += "<ion-item><ion-label>" + tracks[x] + " </ion-label>  <ion-checkbox slot='end' value='pepperoni' checked></ion-checkbox>  </ion-item>"
    }


    return " <ion-content fullscreen><ion-list>" + trackItems + "</ion-list><ion-button  " + "onclick='activated(" + '"' + playlist + '"' + ")'>Confirm</ion-button> </ion-content>"

}

//Uses own token to get my playlists from spotifyAPI returns JSON response
function callSpotifyAPI2(url){
	var user_id = "11135844104";
	var authToken1 =access_token;
	var token2 = "Bearer " + authToken1;
	var playlistUrl = url;
	var response = httpGet(playlistUrl, token2);
	var playlist_response = JSON.parse(response);
	return playlist_response;
}

//generate collapsible divs
var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active_collapsible");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = "200" + "px";
        }
    });
}

function activated(playlist) {
    alert("You have selected the " + playlist + " playlist")
}