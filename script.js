//import Cookies from 'js-cookie'
//link to our dashboard
var dashboard = "https://developer.spotify.com/dashboard/applications/059f69ae51c445518b106f91e9ddaf9c"

//usefull global variables
var url_string = window.location.href;
var access_token = url_string.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
var client_id;

function reset(){
    getClientId().then((id) => {
        client_id = id;
        getPlaylists().then((playlists) => {
            displayPlaylists(playlists);
        });
    });
    document.getElementById("refresh").hidden = true;
}
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
    document.getElementById("refresh").hidden = false;
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
        // save selected songs as cookies
        // First create a string of all the selected song ID's
        var songIDs = tracks.filter((v) => v != null && v.track.id).map(v => v.track.id).join(',');
        Cookies.set('selectedSongs', songIDs);
        console.log("set cookie selectedSongs: " + songIDs);
        if(seed === ''){
            seed = '0c6xIDDpzE81m2q797ordA';
        }
    
        return `<ion-list>${ trackItems }</ion-list><ion-button href='tune.html?choice=${ playlist.name }&token=${ access_token }&seed=${ seed }&client=${  client_id  }' >Confirm</ion-button>`
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));