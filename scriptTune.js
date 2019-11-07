// JavaScript source code

    var oldValue1 = document.getElementById("first").value;
    var oldValue2 = document.getElementById("second").value;
    var oldValue3 = document.getElementById("third").value;
	var url_string = window.location.href;
var url = new URL(url_string);
var seed = url.searchParams.get("seed");
var token = url.searchParams.get("token");
    setInterval(makeShake, 50);

function makeShake()
{
  var newValue1 = document.getElementById("first").value;
  var newValue2 = document.getElementById("second").value;
  var newValue3 = document.getElementById("third").value;


if (newValue1 != oldValue1) {

	if (newValue1 < oldValue1){
	var el = document.getElementById("firstIcon");
	el.className = "md icon-small hydrated icons";
	}
	else{
    var el2 = document.getElementById("firstIcon2");
    el2.className = "md icon-large hydrated icons";}
	oldValue1 = newValue1;
    var el = document.getElementById("button1");
    el.innerHTML = oldValue1;
} else {
    var el = document.getElementById("firstIcon");
    el.className = "md icon-small hydrated"
    var el2 = document.getElementById("firstIcon2");
    el2.className = "md icon-large hydrated";
}


if (newValue2 != oldValue2) {
if (newValue2 < oldValue2){
 var el = document.getElementById("secondIcon");
    el.className = "md icon-small hydrated icons";
}else{
  var el2 = document.getElementById("secondIcon2");
    el2.className = "md icon-large hydrated icons";
}
    
   
  oldValue2 = newValue2;
    var el = document.getElementById("button2");
    el.innerHTML = oldValue2;
} else {
    var el = document.getElementById("secondIcon");
    el.className = "md icon-small hydrated"
var el2 = document.getElementById("secondIcon2");
el2.className = "md icon-large hydrated";
}

if (newValue3 != oldValue3) {
if (newValue3 < oldValue3){
var el = document.getElementById("thirdIcon");
    el.className = "md icon-small hydrated icons";
}
else{
 var el2 = document.getElementById("thirdIcon2");
    el2.className = "md icon-large hydrated icons";
}
    oldValue3 = newValue3;
    
   
    var el = document.getElementById("button3");
    el.innerHTML = oldValue3;
} else {
    var el = document.getElementById("thirdIcon");
    el.className = "md icon-small hydrated"
    var el2 = document.getElementById("thirdIcon2");
    el2.className = "md icon-large hydrated";
}
activated();
}

    function makeIconShake(){
    }
   
   function activated(){
    var el1V = document.getElementById("first").value;
    var el2V = document.getElementById("second").value;
    var el3V = document.getElementById("third").value;
    var el5V = document.getElementById("fifth").value;
	var el4V = document.getElementById("fourth").value;
	document.getElementById("nextStep").href ="final.html?" +"token="+ token  + "&in=" + el1V + "&=ac" +el2V + "&en=" +el3V +"&da=" +el4V +"&mo=" +el5V+"&seed="+ seed ;
}