//import Cookies from 'js-cookie'
//link to our dashboard
var dashboard = "https://developer.Spotify.com/dashboard/applications/059f69ae51c445518b106f91e9ddaf9c";

deletePreviousCookies();
function deletePreviousCookies(){
    Cookies.set("timeDiff",0);
    Cookies.set("timeDel", 0);
    Cookies.set("timePlay", 0);
    Cookies.set("timeGraph", 0);
    Cookies.set("timeretune", 0);
    Cookies.set("group", -1)

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

    reset();
});

function reset(){
    Spotify.getUserPlaylists().then((playlists) => {
        displayPlaylists(playlists, "");
    });
    $("#your-playlists-label").css('visibility', 'visible');;
}

//search function calls API and display new information
var lastQuery = "";
function search() {
	//search
    var searchBarValue = $("#searchBar").val();
    if(lastQuery != searchBarValue) {
        lastQuery = searchBarValue;
        switch(searchBarValue) {
            case "":
                reset();
                break;
            // add cases for easter eggs :D
            default:
                Spotify.searchPlaylists(searchBarValue, 10).then((playlists) => {
                    displayPlaylists(playlists, searchBarValue);
                });
                $("#your-playlists-label").css('visibility', 'hidden');
                break;
        }
    }
}

//generate html from playlist
var tracksPerPlaylist;
function displayPlaylists(playlists, queryString) {
    //get element
    var playlistsContainer = $('#playlists ul');
    playlistsContainer.empty();

    tracksPerPlaylist = {};

	//loop over playlists and generate list of tracks
    return Promise.all(
        playlists.map((playlist, i) => {
            Spotify.getTracksFromPlaylist(playlist).then((tracks) => {
                if(lastQuery == queryString) {
                    tracksPerPlaylist[i] = tracks;
                    var htmlTracks = getHtmlTracks('tracks' + playlist.id, tracks);
                    playlistsContainer.append(`
<li style="font-size:2rem" class="list-group-item list-group-item-action list-group-flush">
    <div style="width:100%;" onclick="arrowToggle('${ i }')" data-toggle="collapse" data-target="#music-list-${ i }">
        <div class="d-flex justify-content-between align-items-center">
            <h4 class="col-5">${ playlist.name }</h4>
            <span class="badge col-2">
                <i id='icon${ i }' class='fa fa-angle-down'></i>
            </span>
            <div class="col-5">
                <ion-button class="float-right" onclick='navigateToTune("${playlist.id}")' >Confirm</ion-button>
            </div>
        </div>
    </div>
    <div id="music-list-${ i }" style="max-height:300px;overflow:auto;" class="collapse">
        ${ htmlTracks }
    </div>
</li>`
                    );
                }
            });
        })
    );
}

function navigateToTune(selectedPlaylistId) {
    Cookies.set('searchQuery', lastQuery);
    var selectedTracks = $(`[name=tracks${ selectedPlaylistId }]`)
        .filter((i, elem) => $(elem).prop('checked'))
        .map((i, elem) => $(elem).val())
        .get();
    Cookies.set('tracks', selectedTracks.join(','));
    Cookies.set('playlist', selectedPlaylistId);
    window.location = 'tune.html';
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
function getHtmlTracks(name, tracks) {
    var trackItems = "";
    tracks.forEach(track => {
        const trackString = track.name + " - " + track.artists[0].name;
        trackItems += 
`<ion-item>
    <ion-label>${ trackString }</ion-label>
    <ion-checkbox slot='end' name='${ name }' value='${ track.id }' checked></ion-checkbox>
</ion-item>`
    });
    return `<ion-list>${ trackItems }</ion-list>`;
}
