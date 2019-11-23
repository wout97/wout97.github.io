// JavaScript source code
//get parameters from url
var url_string = window.location.href;
var url = new URL(url_string);
var token = url.searchParams.get("token");
var playlistID = url.searchParams.get("choice");
var accou = url.searchParams.get("ac");
var dance = url.searchParams.get("da");
var energy = url.searchParams.get("en");
var client = url.searchParams.get("client");
var instrumental = url.searchParams.get("in");
var mood = url.searchParams.get("mo");
var songs = url.searchParams.get("seed");

//make a spotify call for recomendations with url parameters
var requetsUrl= "https://api.spotify.com/v1/recommendations?seed_tracks=" + songs + "&target_acousticness="+ accou/100 +"&target_danceability=" + dance/100 + "&target_energy=" + energy/100 + "&target_instrumentalness="+ instrumental/100;
var response2 = callSpotifyAPI2(requetsUrl);

//display tracks from response
getTracks(response2.tracks);


var array;
var uris;
//generate track html for playlist
function getTracks(response) {
    var x;
    var trackItems = "";
	var uris2 =[];
	var playlistArray = [];
	//iterate over every song
	for (x in response) {
		//make an extra call to get preview url
		var res =callSpotifyAPI2(response[x].href);
		//console.log(res);
		var song_id = res.id;
		var res2 =callSpotifyAPI2("https://api.spotify.com/v1/audio-features/"+ song_id);
		console.log(res2);
		var dancea = res2.danceability;
		var accou = res2.acousticness;
		var energya = res2.energy;
		
		playlistArray.push( res.preview_url);
		//add track URI to list, to be able to store it later in a playlist
		uris2.push(response[x].uri.toString());
		//check if there is a preview url, if there is add a playbutton
		var disabled = "";
		if (res.preview_url != null){
			disabled = "<button color='green' onclick='playAudio(" + x + ")' class='btn bg-success '><i class='fa fa-play'></i></button>";
		}
        trackItems +='<div id='+ x+1000+ ' ><div cla ss="container center"><i class="fas fa-guitar"></i> = '+ Math.round(accou*100) + '% <i class="fas fa-music"></i> = ' +  Math.round(dancea*100) +'%<i class="fas fa-bolt"></i> = '+Math.round(energya*100)+ "%</div><ion-item id="+ x+ "><ion-label>" + response[x].name +" - "+ response[x].artists[0].name + " </ion-label> "+ disabled+" <button color='danger' onclick='deleteAudio(" + x + ")' class='btn btn-space bg-danger'><i class='fa fa-trash'></i></button>"+ " </ion-item></div>";
		
   }
   //store uris globally
   uris = uris2;
   array = playlistArray;
   //update url
    document.getElementById("playlists2").innerHTML +=  "<ion-list '>" + trackItems + "</ion-list>"
}


//spotify call fron url
function callSpotifyAPI2(url){
	var token2 = "Bearer " + token;
	var response = httpGet(url, token2);
	var playlist_response = JSON.parse(response);
	return playlist_response;
}
//spotify post call wit url and data
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


var playingElement;
//function to play audio, essentialy updates link in html 5 audio element and plays it
function playAudio(y){
var audio = document.getElementById("audio");
var element = document.getElementById(y);
var currentClass = element.children[1].children[0].className;
if(currentClass == "fa fa-play"){
if(playingElement!=null){
playingElement.children[1].children[0].className = "fa fa-play";
playingElement.children[1].className = "btn bg-success"
}
element.children[1].children[0].className = "fa fa-pause";
element.children[1].className = "btn bg-warning"
audio.src=array[y];
audio.play();
}else{
element.children[1].children[0].className = "fa fa-play";
element.children[1].className = "btn bg-success"
audio.pause();
}
playingElement = element;

}

//delete song from list
function deleteAudio(z){
document.getElementById(z+"1000").remove();
}

//create playlist and save songs to it
function saveSongs(){
	//create all data for Post call
	var playlistName = document.getElementById("playlistName").value;
	var name = playlistName;// + Math.random();
	var description = "created with spotify recomender!";
	var dataPlaylist = "{\"name\":\""+ name +"\",\"description\":\""+ description +"\",\"public\":false}";
	var urlPost = "https://api.spotify.com/v1/users/" + client +"/playlists";
	
	console.log(playlistName);
	
	//create new playlist
	var id = callSpotifyAPIpost(urlPost, dataPlaylist).id;
	saveSongs(pID);
}

function addToSelectedPlaylist(){
	saveSongs(playlistID);
}

//create playlist and save songs to it
function saveSongs(pID){
	//create data for nex call
	var uriString = "[";
	var addTracksUrl = "https://api.spotify.com/v1/playlists/" + pID + "/tracks";
	for(x in uris){
		if(x == 0){
		uriString +='"' + uris[x] + '"';
		}else{
		uriString +=', "' + uris[x] + '"';
		}
	
	}
	uriString += "]"
	var uriData= "{\"uris\": " + uriString+"}";
	//call spotify to add songs (uris) to previously created playlist
	callSpotifyAPIpost(addTracksUrl, uriData);
	alert('A new playlist is added to your spotify! :) ');
	window.location.href = "feedback.html";

}