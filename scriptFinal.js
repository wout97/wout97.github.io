// JavaScript source code
//generate html

var url_string = window.location.href;
var url = new URL(url_string);
var token = url.searchParams.get("token");
var accou = url.searchParams.get("ac");
var dance = url.searchParams.get("da");
var energy = url.searchParams.get("en");
var client = url.searchParams.get("client");
var instrumental = url.searchParams.get("in");
var mood = url.searchParams.get("mo");
var songs = url.searchParams.get("seed");

var requetsUrl= "https://api.spotify.com/v1/recommendations?seed_tracks=" + songs + "&target_acousticness="+ accou/100 +"&target_danceability=" + dance/100 + "&target_energy=" + energy/100 + "&target_instrumentalness="+ instrumental/100;
var response2 = callSpotifyAPI2(requetsUrl);
 getTracks(response2.tracks);
var array;
var uris;
//generate track html for playlist
function getTracks(response) {
    var x;
    var trackItems = "";
	var uris2 =[];
    //var tracks = ["song 1 :" + playlist, "song 2 :" + playlist, "song 3 :" + playlist, "song 4 : " + playlist, "song 5 :" + playlist, "song 6 :" + playlist];
	var playlistArray = [];
	for (x in response) {
		console.log(response[x].href );
		var res =callSpotifyAPI2(response[x].href);
		playlistArray.push( res.preview_url);
		uris2.push(response[x].uri.toString());
		var disabled = "";
		if (res.preview_url != null){
			disabled = "<button color='green' onclick='playAudio(" + x + ")' class='btn bg-success '><i class='fa fa-play'></i></button>";
		}
        trackItems += "<ion-item id="+ x+ " ><ion-label>" + response[x].name +" - "+ response[x].artists[0].name + " </ion-label> "+ disabled+" <button color='danger' onclick='deleteAudio(" + x + ")' class='btn btn-space bg-danger'><i class='fa fa-trash'></i></button> </ion-item>";
		
   }
   uris = uris2;
   console.log(uris);
   array = playlistArray;
   console.log(playlistArray);
    document.getElementById("playlists2").innerHTML +=  "<ion-list '>" + trackItems + "</ion-list>"
}


//Uses own token to get my playlists from spotifyAPI returns JSON response
function callSpotifyAPI2(url){
	var token2 = "Bearer " + token;
	var response = httpGet(url, token2);
	var playlist_response = JSON.parse(response);
	return playlist_response;
}
//Uses own token to get my playlists from spotifyAPI returns JSON response
function callSpotifyAPIpost(url, dat){
	var token2 = "Bearer " + token;
	var response = httpPost(url, token2, dat);
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
//Simple post request with auth
function httpPost(theUrl, token, data) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', token);
	xmlHttp.setRequestHeader("Content-Type", "application/json");
	xmlHttp.setRequestHeader("accept", "application/json");
    xmlHttp.send( data );
    return xmlHttp.responseText;
}




function playAudio(y){
console.log("clicked");
var audio = document.getElementById("audio");
audio.src=array[y];
audio.play();
console.log(audio.src)
}

function deleteAudio(z){
console.log("deleted");
document.getElementById(z).remove();
console.log(audio);

}

function saveSongs(){
	var name = "cool hci created playlist" + Math.random();
	var description = "created with spotify recomender!";
	var dataPlaylist = "{\"name\":\""+ name +"\",\"description\":\""+ description +"\",\"public\":false}";
	console.log(dataPlaylist);
	var urlPost = "https://api.spotify.com/v1/users/" + client +"/playlists";
	var id = callSpotifyAPIpost(urlPost, dataPlaylist).id;
	console.log(id);
	var uriString = "[";
	var addTracksUrl = "https://api.spotify.com/v1/playlists/" + id + "/tracks";

	for(x in uris){
		
		if(x == 0){
		uriString +='"' + uris[x] + '"';
		}else{
		uriString +=', "' + uris[x] + '"';
		}
	
	}
	uriString += "]"

	var uriData= "{\"uris\": " + uriString+"}";
	console.log(uriData);
	console.log(callSpotifyAPIpost(addTracksUrl, uriData));

}