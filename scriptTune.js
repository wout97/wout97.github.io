//fetch parameters from URL
var url_string = window.location.href;
var url = new URL(url_string);
var seed = url.searchParams.get("seed");
var token = url.searchParams.get("token");
var playlistID = url.searchParams.get("choice");
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
    document.getElementById("nextStep").href = "final.html?" + "choice=" + playlistID +"&token=" + token + "&in=" + el1V + "&=ac" + el2V + "&en=" + el3V + "&da=" + el4V + "&mo=" + el5V + "&seed=" + seed + "&client=" + client;
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