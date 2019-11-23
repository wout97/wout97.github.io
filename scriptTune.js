//fetch parameters from URL
var url_string = window.location.href;
var url = new URL(url_string);
var seed = url.searchParams.get("seed");
var token = url.searchParams.get("token");
var client = url.searchParams.get("client");
var songIDs = "testIDS"

document.getElementById("link").href = "start.html#access_token="+ token +"&token_type=Bearer&expires_in=3600&state=123";
document.getElementById("link2").href = "start.html#access_token="+ token +"&token_type=Bearer&expires_in=3600&state=123";
getDefaultValues();



//Check if sliders are changed
setInterval(makeShake, 50);

//global slider values
var oldValue1 = document.getElementById("first").value;
var oldValue2 = document.getElementById("second").value;
var oldValue3 = document.getElementById("third").value;
var oldValue4 = document.getElementById("fourth").value;
var oldValue5 = document.getElementById("fifth").value;

//global slider values
var ogValue1 = oldValue1;
var ogValue2 = oldValue2;
var ogValue3 = oldValue3;
var ogValue4 = oldValue4;
var ogValue5 =oldValue5;

function reset(){
     document.getElementById("first").value= ogValue1;
    document.getElementById("second").value =ogValue2;
    document.getElementById("third").value =ogValue3;
     document.getElementById("fourth").value =ogValue4;
    document.getElementById("fifth").value =ogValue5;

}
//function to make icon shake if sliders slides, and updates next url
function makeShake() {
	//first get updated values
    var newValue1 = document.getElementById("first").value;
    var newValue2 = document.getElementById("second").value;
    var newValue3 = document.getElementById("third").value;
	var newValue4 = document.getElementById("fourth").value;
    var newValue5 = document.getElementById("fifth").value;

	//check for every slider if value has been changed
    if (newValue1 != oldValue1) {
	 $('[data-toggle="tooltip"]').tooltip("hide");

        if (newValue1 < oldValue1) {

            var el = document.getElementById("firstIcon");
            el.className = "md icon-small hydrated icons";
        } else {
            var el2 = document.getElementById("firstIcon2");
            el2.className = "md icon-large hydrated icons";
        }
        oldValue1 = newValue1;
    } else {
        var el = document.getElementById("firstIcon");
        el.className = "md icon-small hydrated"
        var el2 = document.getElementById("firstIcon2");
        el2.className = "md icon-large hydrated";
    }
    if (newValue2 != oldValue2) {
	 $('[data-toggle="tooltip"]').tooltip("hide");
        if (newValue2 < oldValue2) {
            var el = document.getElementById("secondIcon");
            el.className = "md icon-small hydrated icons";
        } else {
            var el2 = document.getElementById("secondIcon2");
            el2.className = "md icon-large hydrated icons";
        }
        oldValue2 = newValue2;
    } else {
        var el = document.getElementById("secondIcon");
        el.className = "md icon-small hydrated"
        var el2 = document.getElementById("secondIcon2");
        el2.className = "md icon-large hydrated";
    }

    if (newValue3 != oldValue3) {
	 $('[data-toggle="tooltip"]').tooltip("hide");
        if (newValue3 < oldValue3) {
            var el = document.getElementById("thirdIcon");
            el.className = "md icon-small hydrated icons";
        } else {
            var el2 = document.getElementById("thirdIcon2");
            el2.className = "md icon-large hydrated icons";
        }
        oldValue3 = newValue3;
    } else {
        var el = document.getElementById("thirdIcon");
        el.className = "md icon-small hydrated"
        var el2 = document.getElementById("thirdIcon2");
        el2.className = "md icon-large hydrated";
    }
	 if (newValue4 != oldValue4) {
	  $('[data-toggle="tooltip"]').tooltip("hide");
        if (newValue4 < oldValue4) {
            var el = document.getElementById("fourthIcon");
            el.className = "md icon-small hydrated icons";
        } else {
            var el2 = document.getElementById("fourthIcon2");
            el2.className = "md icon-large hydrated icons";
        }
        oldValue4 = newValue4;
    } else {
        var el = document.getElementById("fourthIcon");
        el.className = "md icon-small hydrated"
        var el2 = document.getElementById("fourthIcon2");
        el2.className = "md icon-large hydrated";
    }
		 if (newValue5 != oldValue5) {
		 $('[data-toggle="tooltip"]').tooltip("hide");
		 console.log('test');
        if (newValue5 < oldValue5) {
            var el = document.getElementById("fifthIcon");
            el.className = "md icon-small hydrated icons";
        } else {
            var el2 = document.getElementById("fifthIcon2");
            el2.className = "md icon-large hydrated icons";
        }
        oldValue5 = newValue5;
    } else {
        var el = document.getElementById("fifthIcon");
        el.className = "md icon-small hydrated"
        var el2 = document.getElementById("fifthIcon2");
        el2.className = "md icon-large hydrated";
    }
	
	//update url button
    activated();
}

//update url from next button
function activated() {
    var el1V = document.getElementById("first").value;
    var el2V = document.getElementById("second").value;
    var el3V = document.getElementById("third").value;
    var el5V = document.getElementById("fifth").value;
    var el4V = document.getElementById("fourth").value;
    document.getElementById("nextStep").href = "final.html?" + "token=" + token + "&in=" + el1V + "&=ac" + el2V + "&en=" + el3V + "&da=" + el4V + "&mo=" + el5V + "&seed=" + seed + "&client=" + client;
}

function makeIconShake() {}


$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip({
   html: "true"
  });  
});

document.body.onscroll = function() {
   console.log("Scrolling");
}


//$('[data-toggle="tooltip"]').tooltip();
function getDefaultValues(){
    //"https://api.spotify.com/v1/audio-features/"
    var seeds =seed;
    var seedsSplitted = seeds.split(",");
    var instru = 0;
    var dancea = 0;
    var accou = 0;
    var energya = 0;
    for (x in seedsSplitted){
        var urlfeatures = "https://api.spotify.com/v1/audio-features/" + seedsSplitted[x];
        var responsefeat =callSpotifyAPI2(urlfeatures);
        instru += responsefeat.instrumentalness;
        dancea += responsefeat.danceability;
        accou += responsefeat.acousticness;
        energya += responsefeat.energy;
    }
    document.getElementById("first").value = instru*100/seedsSplitted.length;
    document.getElementById("second").value = accou*100/seedsSplitted.length;
    document.getElementById("third").value =energya*100/seedsSplitted.length;
    document.getElementById("fourth").value = dancea*100/seedsSplitted.length;
    document.getElementById("fifth").value=50;
}


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

/////////////////////////////////////////////////////////////
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