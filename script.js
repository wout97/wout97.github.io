//import Cookies from 'js-cookie'
//link to our dashboard
var dashboard = "https://developer.spotify.com/dashboard/applications/059f69ae51c445518b106f91e9ddaf9c"

//usefull global variables
var url_string = window.location.href;
var access_token = url_string.match(/access_token\=([\w-]*)/)[1];
var client_id;

function reset(){
    getClientId().then((id) => {
        client_id = id;
        getPlaylists().then((playlists) => {
            displayPlaylists(playlists, "");
        });
    });
    $("#your-playlists-label").css('visibility', 'visible');;
}
// Init
$(() => {
    $(document).on("click", "button.searchbar-clear-button", () => {$("#searchBar").val("");search();});

    $('#playlists').on('show.bs.collapse', '[id^="music-list"]', function(e){
        const selectedList = $(e.target).closest('li');
        $('#playlists li').not(selectedList).slideUp(800);
    });
    $('#playlists').on('hide.bs.collapse', '[id^="music-list"]', function(e){
        const selectedList = $(e.target).closest('li');
        $('#playlists li').not(selectedList).slideDown(500);
    });

    getClientId().then((id) => {
        client_id = id;
        getPlaylists().then((playlists) => {
            displayPlaylists(playlists, "");
        });
    });
});

//search function calls API and display new information
var lastQuery = "";
function search() {
	//search
    var searchBarValue = $("#searchBar").val();
    if(searchBarValue == "") {
        if(lastQuery != ""){
            reset();
            lastQuery = "";
        }
        return;
    }
    var searchString = "https://api.spotify.com/v1/search?q=" + searchBarValue + "&type=playlist&limit=10&market=from_token";
    //call
    lastQuery = searchBarValue;
	callSpotifyAPI(searchString).then((responseSearch) => {
        if(searchBarValue == lastQuery) {
            var playlistResponse = responseSearch.playlists.items;
            //display
            displayPlaylists(playlistResponse, searchBarValue);
        }
    });
    $("#your-playlists-label").css('visibility', 'hidden');;
}

//return tracklist from playlists
function getTracksfromPlaylist(playlist) {
	//get url of playlist
    var playlistUrl = playlist.href;
    //API call to get tracks
    return callSpotifyAPI(playlistUrl).then((tracksresponse) => {
        return tracksresponse.tracks.items.filter((trackData) => trackData.track);
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
function displayPlaylists(playlists, queryString) {
    //get element
    var playlistsContainer = $('#playlists ul');
    playlistsContainer.empty();

	//loop over playlists and generate list of tracks
    return Promise.all(
        playlists.map((playlist, i) => {
            getTracksfromPlaylist(playlist).then((tracks) => {
                if(lastQuery == queryString) {
                    var htmlTracks = getHtmlTracks(tracks);
                    var seed = getSeed(tracks);
                    playlistsContainer.append(
`<li style="font-size:2rem" class="list-group-item list-group-item-action list-group-flush" >
    <div style="width:100%;" onclick="arrowToggle('${ i }')" data-toggle="collapse" data-target="#music-list-${ i }">
        <div class="d-flex justify-content-between align-items-center">
            <h4 class="col-5">${ playlist.name }</h4>
            <span class="badge col-2">
                <i id='icon${ i }' class='fa fa-angle-down'></i>
            </span>
            <div class="col-5">
                <ion-button class="float-right" href='tune.html?choice=${ playlist.id }&token=${ access_token }&seed=${ seed }&client=${  client_id  }' >Confirm</ion-button>
            </div>
        </div>
    </div>
    <div id="music-list-${ i }" style="max-height:300px;overflow:auto;" class="collapse" >
        ${ htmlTracks }
    </div>
</li>`
                    );
                }
            });
        })
    );
}

function arrowToggle(x){
	var iconel = document.getElementById("icon"+x);
	if(iconel.className == "fa fa-angle-down"){
		iconel.className = "fa fa-angle-up";
	}else{
		iconel.className = "fa fa-angle-down";
	}

}
//generate Ion-list from tracks
function getHtmlTracks(tracks) {
    var trackItems = "";
    for (const i in tracks) {
        const trackString = tracks[i].track.name + " - " + tracks[i].track.artists[0].name;
        trackItems += "<ion-item><ion-label>" + trackString + " </ion-label>  <ion-checkbox slot='end' value='pepperoni' checked></ion-checkbox>  </ion-item>"
    }
    return `<ion-list>${ trackItems }</ion-list>`;
}
function getSeed(tracks) {
    var seed = tracks
        .filter((v) => v !== null && v.track.id)
        .slice(0, 5)
        .map((v) => v.track.id)
        .join();
    if(seed === ''){
        seed = '0c6xIDDpzE81m2q797ordA';
    }
    return seed;
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