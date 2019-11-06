// JavaScript source code

    var oldValue1 = document.getElementById("first").value;
    var oldValue2 = document.getElementById("second").value;
    var oldValue3 = document.getElementById("third").value;

    setInterval(makeShake, 50);

function makeShake()
{
  var newValue1 = document.getElementById("first").value;
  var newValue2 = document.getElementById("second").value;
  var newValue3 = document.getElementById("third").value;


if (newValue1 != oldValue1) {
    oldValue1 = newValue1;
    var el = document.getElementById("firstIcon");
    var el2 = document.getElementById("firstIcon2");
    el.className = "md icon-small hydrated icons";
    el2.className = "md icon-large hydrated icons";
    var el = document.getElementById("button1");
    el.innerHTML = oldValue1;
} else {
    var el = document.getElementById("firstIcon");
    el.className = "md icon-small hydrated"
    var el2 = document.getElementById("firstIcon2");
    el2.className = "md icon-large hydrated";
}


if (newValue2 != oldValue2) {
    oldValue2 = newValue2;
    var el = document.getElementById("secondIcon");
    el.className = "md icon-small hydrated icons";
    var el2 = document.getElementById("secondIcon2");
    el2.className = "md icon-large hydrated icons";
    var el = document.getElementById("button2");
    el.innerHTML = oldValue2;
} else {
    var el = document.getElementById("secondIcon");
    el.className = "md icon-small hydrated"
var el2 = document.getElementById("secondIcon2");
el2.className = "md icon-large hydrated";
}

if (newValue3 != oldValue3) {
    oldValue3 = newValue3;
    var el = document.getElementById("thirdIcon");
    el.className = "md icon-small hydrated icons";
    var el2 = document.getElementById("thirdIcon2");
    el2.className = "md icon-large hydrated icons";
    var el = document.getElementById("button3");
    el.innerHTML = oldValue3;
} else {
    var el = document.getElementById("thirdIcon");
    el.className = "md icon-small hydrated"
    var el2 = document.getElementById("thirdIcon2");
    el2.className = "md icon-large hydrated";
}
}

    function makeIconShake(){
    }
   
   function activated(){
    var el1 = document.getElementById("first").value;
    var el2 = document.getElementById("second").value;
    var el3 = document.getElementById("third").value;
    alert("First selection: "+ el1 + " | Second selection: " + el2 + " | Third selection: " + el3);
    }