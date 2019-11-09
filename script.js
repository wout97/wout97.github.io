//link to our dashboard
var dashboard = "https://developer.spotify.com/dashboard/applications/059f69ae51c445518b106f91e9ddaf9c"

//usefull global variables
var url_string = window.location.href;
var access_token = url_string.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
var client_id = getClientId();


//get playlists and generate html
var playlists = getPlaylists();
displayPlaylists(playlists);
var playlistResponse;

//search function calls API and display new information
function search() {
	//search
    var searchBarValue = document.getElementById("searchBar").value;
    var searchString = "https://api.spotify.com/v1/search?q=" + searchBarValue + "&type=playlist";
    //call
	var responseSearch = callSpotifyAPI(searchString);
    playlistResponse = responseSearch.playlists;
	//make array rom response
    var arrayPlaylists = [];
    for (x = 0; x < 5; x++) {
        arrayPlaylists.push(responseSearch.playlists.items[x].name);
    }
	//display
    displayPlaylists(arrayPlaylists);
    generateCollapsibleDivs();
}

//Get array of user playlists
function getPlaylists() {
	//API call
    playlistResponse = getUsersPlaylists();
	//make array from response
	var arrayPlaylist = [];
	var x;
    for (x in playlistResponse.items) {
        arrayPlaylist.push(playlistResponse.items[x].name);
    }
    return arrayPlaylist;
}

//return tracklist from playlists
function getTracksfromResponse(response2, index) {
	//get url of playlist
    var playlistUrl = response2.items[index].href;
	//API call to get tracks
    var tracksresponse = callSpotifyAPI(playlistUrl);
    tracksresponseCopy = tracksresponse;
	//make array from response
    var trackList = [];
	
    for (x in tracksresponse.tracks.items) {
		if(tracksresponse.tracks.items[x].track != null && tracksresponse.tracks.items[x].track.artists[0] !=null){
        trackList.push(tracksresponse.tracks.items[x].track.name + " - " + tracksresponse.tracks.items[x].track.artists[0].name)}
	
    }
    return trackList;
}

//Uses token to get users playlists from spotifyAPI
function getUsersPlaylists() {
	//create token and url
    var token1 = "Bearer " + access_token;
    var playlistUrl = "https://api.spotify.com/v1/users/" + client_id + "/playlists";
	//make API call
    return JSON.parse(httpGet(playlistUrl, token1));
}

//generate html from playlist
function displayPlaylists(playlists) {
	//get element
    var element = document.getElementById("playlists");
	while(element.firstChild){element.removeChild(element.firstChild);}
	//loop over playlists and generate list of tracks
    var x;
	var innerHtml = '<div class="card"><ul class="list-group ">';
    for (x in playlists) {
		innerHtml +='<li style="font-size:2rem" class="list-group-item list-group-item-action list-group-flush " onclick="arrowToggle('+ x +')" data-toggle="collapse"  data-target="#demo' + x + '" >' + playlists[x] + "   " + '<span class="badge ">'+ "<i id='icon" +x+"' class='fa fa-angle-right'></i>" + '</span>' + '</li><div id="demo'+ x +'" class="collapse" >' + getHtmlTracks(playlists[x], x) + '</div>';
    }
	innerHtml+='</ul></div>'
	element.insertAdjacentHTML( 'beforeend', innerHtml );
}

function arrowToggle(x){
	var iconel = document.getElementById("icon"+x);
	if(iconel.className == "fa fa-angle-right"){
		iconel.className = "fa fa-angle-down";
	}else{
		iconel.className = "fa fa-angle-right";
	}

}
//generate Ion-list of tracks from a playlist
function getHtmlTracks(playlist, indexPlaylist) {
    var x;
    var trackItems = "";
	//get array of all songs and artists
    var tracks = getTracksfromResponse(playlistResponse, indexPlaylist);
	//create item for every track of playlist
    for (x in tracks) {
        trackItems += "<ion-item><ion-label>" + tracks[x] + " </ion-label>  <ion-checkbox slot='end' value='pepperoni' checked></ion-checkbox>  </ion-item>"
    }
	//get seed for recomdation FOR NOW FIRST SONG IS SEED 
	//TODO: Change seed!!!
    var seed;
    if (tracksresponseCopy.tracks.items[0] != null) {
        if (tracksresponseCopy.tracks.items[0].track.id != null) {
            seed = tracksresponseCopy.tracks.items[0].track.id;
        } else {
            seed = "0c6xIDDpzE81m2q797ordA";
        }
    }
	 if (tracksresponseCopy.tracks.items[1] != null) {
        if (tracksresponseCopy.tracks.items[1].track.id != null) {
            seed +="," + tracksresponseCopy.tracks.items[1].track.id;
        } else {
            seed = "0c6xIDDpzE81m2q797ordA";
        }
    }

	 if (tracksresponseCopy.tracks.items[2] != null) {
        if (tracksresponseCopy.tracks.items[2].track.id != null) {
            seed += ","+ tracksresponseCopy.tracks.items[2].track.id;
        } else {
            seed = "0c6xIDDpzE81m2q797ordA";
        }
    }
		 if (tracksresponseCopy.tracks.items[3] != null) {
        if (tracksresponseCopy.tracks.items[3].track.id != null) {
            seed += ","+ tracksresponseCopy.tracks.items[3].track.id;
        } else {
            seed = "0c6xIDDpzE81m2q797ordA";
        }
    }

    return " <ion-list>" + trackItems + "</ion-list><ion-button href='tune.html?choice=" + playlist + "&token=" + access_token + "&seed=" + seed + "&client=" + client_id + "'" + "onclick='activated(" + '"' + playlist + '"' + ")'>Confirm</ion-button>"
}

//API call to spotify from given url
function callSpotifyAPI(url) {
    var authToken1 = access_token;
    var token2 = "Bearer " + authToken1;
    var response = httpGet(url, token2);
    var playlist_response = JSON.parse(response);
    return playlist_response;
}

//get client ID from spotify
function getClientId() {
    var response = callSpotifyAPI("https://api.spotify.com/v1/me");
    return response.id;
}

//hide all lists
//generateCollapsibleDivs()
//generate collapsible divs
function generateCollapsibleDivs() {
	//get element
    var coll = document.getElementsByClassName("collapsible");
	//hide all tracks and add function to let it appear back
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active_collapsible");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                var lengthContent = content.children[0].children[0].children.length
                content.style.maxHeight = (lengthContent * 54 + 64) + "px";
            }
        });
    }
}


//Simple get request with auth token and given URL
function httpGet(theUrl, token) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', token);
    xmlHttp.send();
    return xmlHttp.responseText;
}

//simple alert popup for debugging
function activated(playlist) {
    alert("You have selected the " + playlist + " playlist")
}