
//Authorization links
var oAuthUrl="https://accounts.spotify.com/authorize?client_id=059f69ae51c445518b106f91e9ddaf9c&redirect_uri=https://wout97.github.io/index.html&scope=user-read-private%20user-read-emai%20playlist-read-privat%20playlist-read-collaborative&response_type=token&state=123"
var dash="https://developer.spotify.com/dashboard/applications/059f69ae51c445518b106f91e9ddaf9c"
var newToken="https://developer.spotify.com/console/get-playlists/?user_id=wizzler&limit=&offset="




var url_string = window.location.href;
var access_token = url_string.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
var client_id = getClientId();


//get playlists and generate html
var playlists = getPlaylists();
displayPlaylists(playlists);
var playlistResponse;

function search(){

var searchBarValue = document.getElementById("searchBar").value;
var searchString = "https://api.spotify.com/v1/search?q=" + searchBarValue + "&type=playlist";
var responseSearch = callSpotifyAPI2(searchString);
var tracksresponseCopy;
console.log(responseSearch.playlists);
playlistResponse = responseSearch.playlists;
var array5 = [];
for (x = 0; x < 5; x++) {
		console.log(responseSearch.playlists.items[x].name);
		array5.push(responseSearch.playlists.items[x].name);
	}

console.log(array5);
displayPlaylists(array5);
generateCollapsibleDivs()
}

//Get array of user playlists
function getPlaylists() {
    var responseAPI = callSpotifyAPI("null");
	playlistResponse = responseAPI;
	return getArrayUserPlaylist(responseAPI);
}

function getTracksfromResponse(response2, index){
	var playlistUrl = response2.items[index].href;
	var tracksresponse = callSpotifyAPI2(playlistUrl);
	tracksresponseCopy = tracksresponse;
	var trackList=[];
	for (x in tracksresponse.tracks.items){
		//console.log(tracksresponse.tracks.items[x].track);
		trackList.push(tracksresponse.tracks.items[x].track.name +" - "+ tracksresponse.tracks.items[x].track.artists[0].name )
	}
	return trackList;
}

//Uses own token to get my playlists from spotifyAPI returns JSON response
function callSpotifyAPI(url){
	var user_id = client_id;
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
		console.log("new plalist adding...")
        document.getElementById("playlists").innerHTML += ' <button class="collapsible">' + playlists[x] + "   " + "<ion-icon name='musical-note'></ion-icon>" + '</button><div class="content" >' + getTracks(playlists[x], x) + '</div>'
		console.log("done");
		}
}

//generate track html for playlist
function getTracks(playlist, index2) {
    var x;
    var trackItems = "";
    //var tracks = ["song 1 :" + playlist, "song 2 :" + playlist, "song 3 :" + playlist, "song 4 : " + playlist, "song 5 :" + playlist, "song 6 :" + playlist];
    var tracks = getTracksfromResponse(playlistResponse, index2);
	
	for (x in tracks) {
        trackItems += "<ion-item><ion-label>" + tracks[x] + " </ion-label>  <ion-checkbox slot='end' value='pepperoni' checked></ion-checkbox>  </ion-item>"
    }
	var seed;
	if(tracksresponseCopy.tracks.items[0] !=null){
		if(tracksresponseCopy.tracks.items[0].track.id != null){
			seed =tracksresponseCopy.tracks.items[0].track.id;
		}
		else{
		seed ="0c6xIDDpzE81m2q797ordA";
		}
	}
	
    return " <ion-content fullscreen><ion-list>" + trackItems + "</ion-list><ion-button href='tune.html?choice="+ playlist + "&token="+ access_token +"&seed=" +seed +"'" + "onclick='activated(" + '"' + playlist + '"' + ")'>Confirm</ion-button> </ion-content>"

}

//Uses own token to get my playlists from spotifyAPI returns JSON response
function callSpotifyAPI2(url){
	var authToken1 =access_token;
	var token2 = "Bearer " + authToken1;
	var response = httpGet(url, token2);
	var playlist_response = JSON.parse(response);
	return playlist_response;
}

function getClientId(){
	var response = callSpotifyAPI2("https://api.spotify.com/v1/me");
	return response.id;
}
//generate collapsible divs
generateCollapsibleDivs()
function generateCollapsibleDivs(){var coll = document.getElementsByClassName("collapsible");
console.log("colls");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active_collapsible");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
			var lengthContent = content.children[0].children[0].children.length
            content.style.maxHeight = (lengthContent*54 + 64) + "px";
        }
    });
}}


function activated(playlist) {
    alert("You have selected the " + playlist + " playlist")
}
