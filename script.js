//link to our dashboard
var dashboard = "https://developer.spotify.com/dashboard/applications/059f69ae51c445518b106f91e9ddaf9c"

//usefull global variables
var url_string = window.location.href;
var access_token = url_string.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
var client_id;

// Init
$(() => {
    getClientId().then((id) => {
        client_id = id;
        getPlaylists().then((playlists) => {
            displayPlaylists(playlists);
        });
    });
});

//search function calls API and display new information
function search() {
	//search
    var searchBarValue = $("#searchBar").val();
    var searchString = "https://api.spotify.com/v1/search?q=" + searchBarValue + "&type=playlist";
    //call
	callSpotifyAPI(searchString).then((responseSearch) => {
        var playlistResponse = responseSearch.playlists.items;
        //display
        displayPlaylists(playlistResponse);
    });
}

//return tracklist from playlists
function getTracksfromResponse(playlist) {
	//get url of playlist
    var playlistUrl = playlist.href;
    //API call to get tracks
    return callSpotifyAPI(playlistUrl).then((tracksresponse) => {
        return tracksresponse.tracks.items;
    });
}

//Uses token to get the users playlists from spotifyAPI
function getPlaylists() {
	//create token and url
    var token1 = "Bearer " + access_token;
    var playlistUrl = "https://api.spotify.com/v1/users/" + client_id + "/playlists";
    //make API call
    return $.ajax({
        url: playlistUrl,
        beforeSend: (xhr) => {xhr.setRequestHeader('Authorization', token1);},
        dataType: 'json'
    }).then((playlistData) => playlistData.items);
}

//generate html from playlist
function displayPlaylists(playlists) {
    //get element
    var playlistsContainer = $('#playlists ul');
    playlistsContainer.empty();

	//loop over playlists and generate list of tracks
    Promise.all(
        playlists.map((playlist, i) => {
            getHtmlTracks(playlist).then((tracks) => {
                playlistsContainer.append(
                    `<li style="font-size:2rem" class="list-group-item list-group-item-action list-group-flush" ><div style="width:100%;" onclick="arrowToggle('${ i }')" data-toggle="collapse"  data-target="#music-list-${ i }">${ playlist.name }<span class="badge float-right"><i id='icon${ i }' class='fa fa-angle-right'></i></span></div><div id="music-list-${ i }" class="collapse" >${ tracks }</div></li>`
                );
            });
        })
    ).then(() => {
        // hide other playlists when selecting a playlist
        $('#playlists').on('show.bs.collapse', '[id^="music-list"]', function(e){
            const selectedList = $(e.target).closest('li');
            $('#playlists li').not(selectedList).slideUp(500);
        });
        $('#playlists').on('hide.bs.collapse', '[id^="music-list"]', function(e){
            const selectedList = $(e.target).closest('li');
            $('#playlists li').not(selectedList).slideDown(500);
        });
    });
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
function getHtmlTracks(playlist) {
	//get array of all songs and artists
    return getTracksfromResponse(playlist).then((tracks) => {
        var trackItems = "";
        for (const i in tracks) {
            const trackString = tracks[i].track.name + " - " + tracks[i].track.artists[0].name;
            trackItems += "<ion-item><ion-label>" + trackString + " </ion-label>  <ion-checkbox slot='end' value='pepperoni' checked></ion-checkbox>  </ion-item>"
        }
        //get seed for recommendation
        var seed = tracks.filter((v) => v !== null && v.track.id).slice(0, 5).map((v) => v.track.id).join();
        if(seed === ''){
            seed = '0c6xIDDpzE81m2q797ordA';
        }
    
        return `<ion-list>${ trackItems }</ion-list><ion-button href='tune.html?choice=${ playlist.name }&token=${ access_token }&seed=${ seed }&client=${  client_id  }' onclick='activated("${ playlist }")'>Confirm</ion-button>`
    });
}

//API call to spotify from given url
function callSpotifyAPI(url) {
    var authToken1 = access_token;
    var token2 = "Bearer " + authToken1;
    return $.ajax({
        url: url,
        beforeSend: (xhr) => {xhr.setRequestHeader('Authorization', token2);},
        dataType: 'json'
    });
}

//get client ID from spotify
function getClientId() {
    return callSpotifyAPI("https://api.spotify.com/v1/me", true).then((data) => data.id);
}

//simple alert popup for debugging
function activated(playlist) {
    alert("You have selected the " + playlist + " playlist")
}