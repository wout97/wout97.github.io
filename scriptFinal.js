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
var array;
//generate track html for playlist
function getTracks(response) {
    var x;
    var trackItems = "";
    //var tracks = ["song 1 :" + playlist, "song 2 :" + playlist, "song 3 :" + playlist, "song 4 : " + playlist, "song 5 :" + playlist, "song 6 :" + playlist];
	var playlistArray = [];
	for (x in response) {
		console.log(response[x].href );
		var res =callSpotifyAPI2(response[x].href);
		console.log();
		playlistArray.push( res.preview_url);
        trackItems += "<ion-item><ion-label>" + response[x].name +" - "+ response[x].artists[0].name + " </ion-label><button onclick='playAudio(" + x + ")' class='btn'><i class='fa fa-play'></i></button> </ion-item>";
		
   }
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


//Simple get request with auth
function httpGet(theUrl, token) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', token);
    xmlHttp.send();
    return xmlHttp.responseText;
}

var audio = new Audio("https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86");

$('#play-pause-button').on("click",function(){
  if($(this).hasClass('fa-play'))
   {
     $(this).removeClass('fa-play');
     $(this).addClass('fa-pause');
     audio.play();
   }
  else
   {
     $(this).removeClass('fa-pause');
     $(this).addClass('fa-play');
     audio.pause();
   }
});

audio.onended = function() {
     $("#play-pause-button").removeClass('fa-pause');
     $("#play-pause-button").addClass('fa-play');
};



function playAudio(y){
console.log("clicked");
var audio = document.getElementById("audio");
audio.src=array[y];
audio.play();
console.log(audio.src)
}