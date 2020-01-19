var requestButton = document.querySelector(".request-button");
var showButton = document.querySelector(".show-button");

function onGranted() {
    requestButton.style.background = "green";
}

function onDenied() {
    requestButton.style.background = "red";
}

requestButton.onclick = function() {
    Push.Permission.request(onGranted, onDenied);
}

showButton.onclick = function() {
    Push.create("Hello from Sabe.io!", {
        body: "This is a web notification!",
        icon: "https://rand.cat/gifs/cat-219.gif",
        timeout: 1,
        onClick: function() {
            console.log(this);
        }
    });
};

google.charts.load("current", {packages:['corechart']});
google.charts.load('current', {packages: ['corechart', 'bar']});

var url_string = window.location.href;
var url = new URL(url_string);
var woutHere = parseInt(url.searchParams.get("wout"));

var colorsTimerBox =["#BD5532"," #E1B866"];
var iconNames = ["cat", "fish"]
var indexColorsTimerBox = 0;
const MaxStudyTime = 120;
const roundToNearest5 = x => Math.round(x/5)*5
var lock = false;

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var icon3 = document.getElementById("icon3");
var underImage = document.getElementById("underImage");
var timerSection = document.getElementById("timerSection");

icon2.style.opacity = "0.5";
icon3.style.opacity="0.5";

var hoursStudy = 0;
var minutesStudy = 10;

var url1 ="https://lh3.googleusercontent.com/7Tw_HpOZIrD7wi7CDw3tIft7ytj8NT6VcGLhwR7Kqu-0hdm3ZrZTuRpxMjE3zf0NLxR9KfuDxjcVjB-bQp3jHJuq6QLtVeIVpUMEYRVh7MBjp5LR31_hNXdkvyJd3EZwWJl0CggqxWjzVqkT_Nv7Aew9WVjtPYIEns0Xk29l86zt0d266OP9CsabK0FTxk_fvbL8y1MYXvgve7r98xKCwGckSiRdm832j5_RTjNhT-98XptYkuOG_iyUCowuoHKJ4sPAkJDlrqweQCxW6myFhYe8nUeHqNrJHJzQ_mjAWb2hIGj7pmJJaCfa5uLv1Z1Hf7_BZ_XfC8_voZ1aM-Pi4ADa6ASGzayA-zn1BKKAOitNGjFfIVktKL0FqE3oYmlWIxxrSHBzeVPhjWKehcNyjHSJerwiSy7yoRgUFgyAZ5NATB60zr7layP4eGBKLZA88VRbx-3VeMqwDnjSorEfe3qCNZrBoz6KeJc_htPabq3wPsdfHidDlEyfH1M1OmALR9RLuf8jtUgQfWwZGidS-hKvack0gZPK1tnF760fP9z5330RDzQHdcl54QRiBZ6KBYLqX30lIe1uatxn5HvXSIp9RpgbukSsCRUMIMaN5NUW-xiwxdrNcp846FanJKQHh4hV0u2oRH7jR5iVyuVwST9qShBjEJKk6IkeWmCINGqI-8QJj3RO7de0OT5RtgR9iMlIbulrKdIaSXJPdYMw8UxmLIVP=s500-no";
var url2 = "https://lh3.googleusercontent.com/QVOdD5x3V4JeGOiGR7YijjDktn5fH8xrXJv3AbYGn9qW1e7M_9eggpcbWkJU7e1n-KF_JdgZF35HeUAWcLN0EhWe4GcnPTNFHZ9Ud5vXN36rv_iZ-jKPD4c6JvE0p3BL5m-wUKMrSy1KfRQOF5XBDa2qY_Stp3coacN3071BwWE9kMRc97AgPUeMyUYmWfA7iLt2hsPdOBpwtHf2OrEayw45hkRWil0IFrixbOMaHOGfvZr9LSuR_SH-M6Ku10RjJLozw2WbhHK0QFFYKm5446i7bT-fzhyWWqUOp09s8ngh4jsj3lfkrJ_5x59ZFiga8yGBOGy0j6xVYZb8CwKvWSUUxtYuI2H0C7MiOFQ2FjntD18xyd7tZBiN-I_OPCHTRAc067qRSQtzbvac8k6TyAOsp2EMQfRjLzUoATDjwcWuRr0YJ4XKL8SFFJEG5J54PfWF6r3eqKijcEdmtWJQTAJgKCxpjYJzRgKEClxv7dR2hk1D6ccMEsgryjlez87hndQrfM5UoLDYTX81ah2nSX1RbRsJ1Wk1pKQM1Zk8JAG6IaZ-OnCiRLpKMUR0DTb3DcmtJSkYpMFcVATEBUy-FROQTrTSMGICFlHLin7eYoDQTQZH13R1nxZ3yiXHmL4yg7g4Hh3iyPuKqS9EeXTPm-fSNsidInDesF07N-AP-_v2ai1VjIyqEAV09BjBhVLr2oqlU0nXogBoo7lL-EpPn51VJ4ASVdcFQaWW0NSt_hQC-sf0gQ=w256-h218-no";
var url3 = "https://lh3.googleusercontent.com/G2OPrntSfseiF8IcK3UkWXwBG8g1NIjS7F7BRw3fuzKWu6oK4axPvuV_k91Nd8S_ogJ9hJESytqWraP6-JZmS_HmPtHYlgydS0G7Vb394zgI4VrP4RkqDtK8zNKeY8gKvjTnvjj-U0wzvZsA_M1dQ94NgC5A4Ya-vlwGWdt5SZ7nt_AalViU6NE9B_-sKQiIbFfwCHLL_dHx87mhZqBMw_GNxS8TOdtuAKE4jUq4C-G1d-_9leiytTmguTdSrJQ6l6-kYJwoxBsTN4w4wHWXHiRzaVbqYyu1WWBFvd3Uyx_qP4s8wCHHZHowaJDkSJYfjB0Yaj53DVt5CTWHDBW3D10Ii8pVh7XFQI_NkyiWUemDBiRYv5HiijwC-qeLxOAMTW8fjKJ8tf007lryvF3Qj17B0_UWPPwE4VcqrP9NCZ3Fkpm5ZBI2Rh83FsM8qiAIOX2t13xTePChg_c40d89NIvgC9MsoeGpAeeTUtTr9wa0Yo8mA6RINTABxwPz1Khsaf9pe62SI-iAOQLhhDouA79EjGlg4pgOmmIxy52Gku9EtD_8a8XDlzHMGkj-l9wmjL7MWPCjidwINRv6ehzpcN9tu4N7gmPu--n8Z4DHOgpPEJUc1LIxV1beyYy02w4YtHWEZOpwo1_7ie-JOhnx-xFDngxLYD3RAwD2LSm6zeGkCrh2MdNQ3cPPbjSwZVgbQijog5MTRVGYnTmJyIwETnuBBUikAV2Lu8uZPfAbalMoaDUlGw=s512-no";
var url4 = "https://lh3.googleusercontent.com/9cN6QlJzucqSLVww0z6JNtw5BlDiZTkHM8rNIlSnKNpmp8OqQLVpY9Vzv6B5adWHoGOAdvAxUexkx9NmGzuNOVmi9RtgefnvbLtNm1R-pRiPR3h-SYf2HuVEQb287A-dfbvtFuguwVCWSl8EkecYg8NULRVUzpwCqAtAn-j14CPraC_vb47WcMqcJAgW-Z8k88I1xi8DSOruYl_LT4SdoJhI0Q8aZ6TpA_cPdL9-9ufO89450o4Owabh-NEuy2BzmPAOGzLXR8rKImFYnYPeKH2ZJ-QM-5XLmAUtAJZle9ONWk-_6ZD49e3m3X1NsRBrl5sw1bq1Rd4_Dq4fMIajFSitl3mYdlm9UpCMxqD73cgmx9Ju6PPaoyxBj-rNCx0mhdJUZm6GS5zkl5bb9WCCWdUbUhs1VZ0jvQXW2TwJ_9-WSINBgMnl3Oi5AycAiPRCFJzN31gMv5YXM5qIXHBeCzpiqlAQo9KtsSpasIavyyhLwLM6ZBmw1VDWJdUBY3A6pU_qsMPaXui4FIWta_rCBycrAEuvbv_6AOslqHJGKcs_YLkqEY8E9pPyKM9wmhRN9H3H2nEkrt3scMWbYSuCCjmYrp9VhYjmS06DmhV_fDcxjotqbT8jWDllXz-_stDEENaVsGZg9dxeMCxxRWkY4BqF1GWezfH9nShOqLGPUQPVBECwqGIsoAX6TEeswUrT316DIHUr2V4ExJKLAY3U6nL4ynAbbNEPby5gCPfMuek6be9Law=s512-no";
var urlIndexes= [url4, url3]
var underImageList =["New kitten!","Food!"]

function minus(){
    SwitchColorTimer(-1);

}
function plus(){
    SwitchColorTimer(1);


}
function SwitchColorTimer(direction){
    if (lock == false){
    var timerBox = document.getElementById("timerBox");
    var animal = document.getElementById("animal");
    newIndex = indexColorsTimerBox + direction;
    if(newIndex > (colorsTimerBox.length-1) ){newIndex =0;}
    if(newIndex < 0 ){newIndex = (colorsTimerBox.length-1); }
    timerBox.style.backgroundColor = colorsTimerBox[newIndex];
    animal.src = urlIndexes[newIndex];
    underImage.innerHTML = underImageList[newIndex]
    indexColorsTimerBox = newIndex;

    //icon1.className = "fas fa-" + iconNames[newIndex] + " fa-lg"
    //icon2.className = "fas fa-" + iconNames[newIndex] + " fa-lg"
    //icon3.className = "fas fa-" + iconNames[newIndex] + " fa-lg"


}
}

function calculateHours(value){
    return timeConvert(value);
}

function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    hoursStudy = rhours;
    minutesStudy = rminutes;
    return rhours + " hour(s) and " + rminutes + " minute(s).";
    }



slider.oninput = function() {
  output.innerHTML = calculateHours(this.value);
  if(hoursStudy < 1 && minutesStudy < 45){
    icon2.style.opacity = "0.5";
    icon3.style.opacity="0.5";
  }
  if (minutesStudy > 45){
  icon2.style.opacity = "1";
}
if(hoursStudy > 0 && minutesStudy > 30){
    icon3.style.opacity = "1"
}
if(hoursStudy ==1 && minutesStudy < 30){
    icon3.style.opacity = "0.5"
}
}
function startFocus(){
document.getElementById("toHide").hidden = true;
document.getElementById("notToHide").hidden = false;
document.getElementById("quote").hidden = false;
console.log("updating status to studying")
updateStatus("Studying");
checkForStatus();

toggleProgressBar(1);
startCountDown();
}

function giveUp(){
    clearInterval(x);
    alert("BOOHOO you gave up :(")
    document.getElementById("toHide").hidden = false;
    document.getElementById("notToHide").hidden = true;
    document.getElementById("quote").hidden = true;
    document.getElementById("startButton").innerHTML = "Start Focussing!";
    updateStatus("I hate cats!");
    toggleProgressBar(0);
    checkForStatus();
    lock = false;
}

function endFocus(){
    clearInterval(x);
    toggleProgressBar(0);
    timerSection.hidden = false;
}
// Update the count down every 1 second

var countDownDate = new Date();
var x;

function startCountDown(){
// Set the date we're counting down to
clearInterval(x);

countDownDate = new Date();
countDownDate.setHours(countDownDate.getHours() + hoursStudy);
countDownDate.setMinutes(countDownDate.getMinutes() + minutesStudy);
x = setInterval(updateClock, 1000);
lock = true;
}

function updateClock(){
        // Get today's date and time
        var now = new Date().getTime();
        var now2 = new Date();
        // Find the distance between now and the count down date
        var distance = countDownDate.getTime() - now;
        
        // Time calculations for days, hours, minutes and seconds
      
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
        if (seconds  % 30 === 0 ){
            checkForStatus();
            console.log("Checking for status")
        }
        // Output the result in an element with id="demo"
        document.getElementById("timerStart").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";
          
        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(x);
          alert("YOU DID IT!!!! Congratulations you've earned a new kitten gif");
          document.getElementById("toHide").hidden = false;
          document.getElementById("notToHide").hidden = true;
          document.getElementById("quote").hidden = true;

          document.getElementById("startButton").innerHTML = "Start Focussing!";
          lock = false;
           formatted_date = countDownDate.getDate() + "-" + (countDownDate.getMonth() + 1) + "-" + countDownDate.getFullYear()
            console.log(hoursStudy + "min")
            console.log(minutesStudy + "hour")
            totalMinutes = minutesStudy + hoursStudy*60;
            if (totalMinutes > -1){
                catint = Math.floor(Math.random()* 401) +1;
            }
            if(totalMinutes > 59){
                babyInt = Math.floor(Math.random()* 100) +1;
            }else{
                babyInt = 0; 
            }
            if(totalMinutes > 89){
                dogINt = Math.floor(Math.random()* 100) +1;
            }else{
                dogINt = 0;
            }

          httpPostData(formatted_date,countDownDate.toLocaleTimeString(),now2.toLocaleTimeString(), 1, catint,(hoursStudy*60 + minutesStudy), dogINt, babyInt)
        updateProgressBar();
        updateStatus("Pausing");
        checkForStatus();

   
        }
      
}
function httpPostData(date, start, end, cookie, cat, duration, dog, baby){
    console.log(date)
    console.log(start)
    console.log(end)
    console.log(cookie)
    console.log(cat)
    console.log(duration)


    var theUrl = "https://script.google.com/macros/s/AKfycbwG4e8t5r6wKcoVjBRQft8ZpwH-zH8Cznh8Ch8qkp-dUtMokgJl/exec"+"?cookie="+cookie+"&type=push&name=Sofie"+ "&start="+start+"&end="+end+"&cat="+cat+"&duration="+ duration+"&date="+date+"&dog="+dog+"&baby="+baby ;
    if (woutHere == 1){
         theUrl = "https://script.google.com/macros/s/AKfycbwG4e8t5r6wKcoVjBRQft8ZpwH-zH8Cznh8Ch8qkp-dUtMokgJl/exec"+"?cookie="+cookie+"&type=push&name=Wout"+ "&start="+start+"&end="+end+"&cat="+cat+"&duration="+ duration+"&date="+date+"&dog="+dog+"&baby="+baby ;
    }
    var xhr = new XMLHttpRequest()
    xhr.open('GET', theUrl)
    xhr.onreadystatechange = function()
    {if (xhr.readyState == 4 ){
        console.log(xhr.responseText)
        httpGet("Sofie");

    }};
    xhr.send();

}
httpGet("Sofie");

//httpGetSofie();
var historicalDataSofie;
var historicalDataWout;
function httpGet(name){
    //var theUrl = "https://script.google.com/macros/s/AKfycbzqiu7rRgmj5yLRuzCjWqLVM8etRGBygfLU2Jf_XqbI/dev?type=notyp1";
   var theUrl = "https://script.google.com/macros/s/AKfycbwG4e8t5r6wKcoVjBRQft8ZpwH-zH8Cznh8Ch8qkp-dUtMokgJl/exec" + "?type=getData&name="+ name;
    var xhr = new XMLHttpRequest()
        xhr.open('GET', theUrl)
        xhr.onreadystatechange = function()
        {
          if (xhr.readyState == 4 )
          {
              if(name == "Wout"){
            historicalDataWout = xhr.responseText;
            console.log(historicalDataWout)
            historicalDataWout = JSON.parse(historicalDataWout)[0];
            renderGraph();

        }
           else{

            historicalDataSofie = xhr.responseText;
            historicalDataSofie = JSON.parse(historicalDataSofie)[0];
            httpGet("Wout");
        
           }
         };}
        xhr.send();
        return xhr.responseText;
    }


    function openInNewTab() {
        var theUrl = "https://script.google.com/macros/s/AKfycbzqiu7rRgmj5yLRuzCjWqLVM8etRGBygfLU2Jf_XqbI/dev?type=notyp1";
        var win = window.open(theUrl, '_blank');
        win.focus();
      }
      function getLastMonday() {
        var t = new Date();
        t.setDate(t.getDate() - t.getDay() + 1);
        return t;
      }
var weekString = "";
var startDate;
var endDate;
var catsEarned = [];
var catsEarnedWout = [];
var babiesEarned = [];
var babiesEarnedWout = [];
var dogEarned = [];
var dogEarnedWout = [];
globalDog = [];

monday1 = getLastMonday();
monday2 = getLastMonday();
startDate = getLastMonday();

var lastMonday = monday1.toLocaleDateString().slice(0,-5);

monday2.setDate(monday2.getDate() + 6);
endDate = monday2;
nextSunday = monday2.toLocaleDateString().slice(0,-5);

weekString = "Week from "+ lastMonday + " to " + nextSunday;
console.log(lastMonday)
console.log(nextSunday)
function renderGraph(){
   var days = [ 'Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
   var dayTotals = Array(7).fill(0);
   var dayTotals2 = Array(7).fill(0);
    
 
   dateNow = new Date();
   for (x in historicalDataSofie){
    if (x > 0){
    var d = new Date(historicalDataSofie[x][0])
    var dayName = d.getDay() -1;
    startDate.setHours(0,0,0,0)
    endDate.setHours(23,59,59,99)
    if( d >= startDate && d <= endDate){
        if (dayName == -1){dayTotals[6] += historicalDataSofie[x][3]}
        else{
    dayTotals[dayName] += historicalDataSofie[x][3]}
}
   
    if (d.toLocaleDateString() == dateNow.toLocaleDateString()){
        catsEarned.push(historicalDataSofie[x][4]);
        babiesEarned.push(historicalDataSofie[x][6]); 
        dogEarned.push(historicalDataSofie[x][7]); 

    }
    globalDog = dogEarned;
}
}

console.log(historicalDataWout)
for (x in historicalDataWout){
 if (x > 0){
 var d = new Date(historicalDataWout[x][0])
 var dayName = d.getDay() -1;
 startDate.setHours(0,0,0,0)
 endDate.setHours(23,59,59,99)
 console.log(d)
 if( d >= startDate && d <= endDate){
     console.log(d + "gelukttt")
    if (dayName == -1){dayTotals2[6] += historicalDataWout[x][3]}
    else{
dayTotals2[dayName] += historicalDataWout[x][3]}
}
 if (d.toLocaleDateString() == dateNow.toLocaleDateString()){
    catsEarnedWout.push(historicalDataWout[x][4]);
    babiesEarnedWout.push(historicalDataWout[x][6]);
    dogEarnedWout.push(historicalDataWout[x][7]);
}
}
}

drawChart(dayTotals, dayTotals2);
displayGifs();
}



function drawChart(dayTotals, dayTotals2) {

    var data = google.visualization.arrayToDataTable([
        [ 'Minutes Studies','Sofie','Wout'],
        ['Mon',dayTotals[0],dayTotals2[0] ],
        ['Tue', dayTotals[1],dayTotals2[1]],
        ['Wed',dayTotals[2],dayTotals2[2]],
        ['Thu', dayTotals[3],dayTotals2[3]],
        ['Fri', dayTotals[4],dayTotals2[4]],
        ['Sat',dayTotals[5],dayTotals2[5]],
        ['Sun',dayTotals[6],dayTotals2[6]]
      ]);

      var options = {
        legend: { position: 'bottom', alignment: 'start' },
        title: weekString,
        colors: ['#f6c3e5', '#9aceff']
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("chart"));
      chart.draw(data, options);
	
}

function toggleProgressBar(onOff){
    if (onOff == 1){
    document.getElementById("progressBar").className = "progress-bar progress-bar-striped progress-bar-animated progress-bar-purple";}
    else{
        document.getElementById("progressBar").className = "progress-bar progress-bar-purple";}
    }

updateProgressBar();
function updateProgressBar(){
    
    var theUrl = "https://script.google.com/macros/s/AKfycbzqiu7rRgmj5yLRuzCjWqLVM8etRGBygfLU2Jf_XqbI/dev?type=amount";
    var xhr = new XMLHttpRequest()
        xhr.open('GET', theUrl)
        xhr.onreadystatechange = function()
        {
          if (xhr.readyState == 4 )
          {
              if (woutHere == 1){
                amountStudiedToday = parseInt(JSON.parse(xhr.responseText)[0][2][3]);

              }
              else{
                amountStudiedToday = parseInt(JSON.parse(xhr.responseText)[0][1][3]);

              }
            //var amountStudiedToday = 50;
            var targetStudyTime = 6*60;
            percentageProgressBar = (amountStudiedToday/targetStudyTime) * 100;
            progressBar = document.getElementById("progressBar");
            //progressBar.setAttribute("aria-valuenow", 50);
            progressBar.setAttribute("style", "width : " + percentageProgressBar + "%;")
            document.getElementById("progressOfTheDay").innerHTML = "" + Math.round((amountStudiedToday/60)* 100) / 100 + "/6 hours"
            progressBar.innerHTML = Math.round(percentageProgressBar) + "%"
          }
             
         };
        xhr.send();


    

}

function displayGifs(){
    earningSection = document.getElementById("cats");
earningSection.innerHTML = "";

catlist = [...new Set(catsEarned)];
babyList = [...new Set(babiesEarned)];

dogList = [...new Set(globalDog)];
if (woutHere == 1){
 catlist =  [...new Set(catsEarnedWout)];
 babylist =  [...new Set(babiesEarnedWout)];
 dogList = [...new Set(dogEarnedWout)];
}
console.log(catlist)

console.log(babyList)

console.log(dogList)

    for (x in catlist){
        src = "https://rand.cat/gifs/cat-" + catlist[x]  + ".gif"
        var img = document.createElement('img'); 
        img.src = src; 
        img.style = "max-width: 100%; margin-bottom: 10px; margin: 5px;"
         earningSection.appendChild(img); 
    }
    for (x in babyList){
        if (babyList[x] > 0){
        src = "https://acegif.com/wp-content/uploads/acegif-funny-baby-" + babyList[x]  + ".gif"
        var img = document.createElement('img'); 
        img.src = src; 
        img.style = "max-width: 100%; margin-bottom: 10px; margin: 5px;"
         earningSection.appendChild(img); }
    }
    for (x in dogList){
        if (dogList[x] > 0){
        src = "https://www.doggifpage.com/gifs/" + dogList[x]  + ".gif"
        var img = document.createElement('img'); 
        img.src = src; 
        img.style = "max-width: 100%; margin-bottom: 10px; margin: 5px;"
         earningSection.appendChild(img); }
    }
catsEarned = [];
catsEarnedWout=[];
babiesEarned =[];
babiesEarnedWout =[];
var dogEarned = [];
var dogEarnedWout = [];
}
    
function clicky(offset){
    startDate.setDate(startDate.getDate() + offset);
    console.log(startDate.toLocaleDateString())
    endDate.setDate(endDate.getDate() + offset);
    console.log(endDate.toLocaleDateString());
    nextSunday = monday2.toLocaleDateString().slice(0,-5);
    var newdate = startDate;
    var newerdate = endDate;

weekString = "Week from "+ newdate.toLocaleDateString().slice(0,-5) + " to " +  newerdate.toLocaleDateString().slice(0,-5);
    renderGraph();
}
checkForStatus();
function checkForStatus(){

    var theUrl = "https://script.google.com/macros/s/AKfycbzqiu7rRgmj5yLRuzCjWqLVM8etRGBygfLU2Jf_XqbI/dev?type=amount";

    var xhr = new XMLHttpRequest()
        xhr.open('GET', theUrl)
        xhr.onreadystatechange = function()
        {
          if (xhr.readyState == 4 )
          {
            statusWout = JSON.parse(xhr.responseText)[0][2][1];
            statusSofie = JSON.parse(xhr.responseText)[0][1][1];
            quoteOfTheDay =  JSON.parse(xhr.responseText)[0][3][1]
            if (statusWout == "Pausing"){
                iconWout =  " <i class='fas fa-bed'></i>";
                colorHexWout = "#a278b5";
            }else{
                iconWout = " <i class='fas fa-graduation-cap'></i>";
                colorHexWout = "#bac7a7";
            }
            if (statusSofie == "Pausing"){
                iconSofie =  " <i class='fas fa-bed'></i>";
                colorHexSofie = "#a278b5";
            }else{
                iconSofie = " <i class='fas fa-graduation-cap'></i>";
                colorHexSofie = "#bac7a7";
            }
            document.getElementById("statusWout").innerHTML = statusWout + iconWout;
            document.getElementById("statusWout").setAttribute("style", "background-color: "+ colorHexWout +";")
            document.getElementById("statusSofie").innerHTML = statusSofie + iconSofie;
            document.getElementById("statusSofie").setAttribute("style", "background-color:"+ colorHexSofie+ ";")
            document.getElementById("quoteText").innerHTML = quoteOfTheDay;

            
          }
             
         };
        xhr.send();


}
function updateStatus(newStatus){

    if(woutHere == 1){
        var theUrl = "https://script.google.com/macros/s/AKfycbzqiu7rRgmj5yLRuzCjWqLVM8etRGBygfLU2Jf_XqbI/dev?type=status&name=Wout&value="+ newStatus;
    }else{
    var theUrl = "https://script.google.com/macros/s/AKfycbzqiu7rRgmj5yLRuzCjWqLVM8etRGBygfLU2Jf_XqbI/dev?type=status&name=Sofie&value="+ newStatus;}
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function()
    {if (xhr.readyState == 4 ){
       console.log("Joepie updated to " + theUrl)

    }};
        xhr.open('GET', theUrl)
        xhr.send();
}