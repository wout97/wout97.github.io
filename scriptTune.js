//fetch parameters from URL
var url_string = window.location.href;
var url = new URL(url_string);
var seed = url.searchParams.get("seed");
var token = url.searchParams.get("token");
var client = url.searchParams.get("client");

//Check if sliders are changed
setInterval(makeShake, 50);

//global slider values
var oldValue1 = document.getElementById("first").value;
var oldValue2 = document.getElementById("second").value;
var oldValue3 = document.getElementById("third").value;
var oldValue4 = document.getElementById("fourth").value;
var oldValue5 = document.getElementById("fifth").value;

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