getHighScores("Secret");
function getHighScores(password){
    url = "https://script.google.com/macros/s/AKfycby4ye5SAwlhUdfKUeUBhZvz1HW2qBnjt42FiKwJN1rR/dev?type=getHighScores&pass="+ password +"";
    var xhr = new XMLHttpRequest()
    xhr.open('GET',url)
    xhr.onreadystatechange = function()
    {if (xhr.readyState == 4 ){
        displayHighScores(JSON.parse(xhr.responseText));
    }};
    xhr.send();
}

function displayHighScores(response){
    console.log((response));
    htmlString = "";
    for (var i=0;i<3;i++){
        document.getElementById("name"+ (i+1)).innerHTML = response[i*3];
        document.getElementById("score"+ (i+1)).innerHTML = response[i*3+1];
        if (response[i*3+2].includes("https")){
        htmlString += ' <img  onclick=toggleImage(' + (i+1) + ') style="display:none" src=' + response[i*3+2] + ' id="image' + (i+1) + '"   width="100%" alt="image_score_' + (i+1) + '">'}
        else{
        htmlString += ' <img  onclick=toggleImage(' + (i+1) + ') style="display:none" src="https://i.imgur.com/uUFPTG3.png" id="image' + (i+1) + '"   width="100%" alt="image_score_' + (i+1) + '">'
        }
        document.getElementById("imageDiv").innerHTML = htmlString;
    }
}
function updateHighScore(){
    $('#myModal').modal('hide');
    window.setTimeout(function() {    fireImigur()},50);


}
function updateHighScore2(imageUrl){
    var name =document.getElementById("nameForm").value;
    var score =document.getElementById("scoreForm").value ;
    var time = new Date();
    var image = imageUrl;
    var deleteHash =  "deleteHash";
    var extra =  "pass";
    var pass =  document.getElementById("passForm").value; 

    url = "https://script.google.com/macros/s/AKfycby4ye5SAwlhUdfKUeUBhZvz1HW2qBnjt42FiKwJN1rR/dev?type=addHighScore&name="+ name +"&score="+ score +"&time=" + time + "&image=" + image + "&deleteHash="+ deleteHash +"&extra="+ extra +"&pass="+pass;
    var xhr = new XMLHttpRequest()
    xhr.open('GET',url)
    xhr.send();
    getHighScores();
}
toggleEveryImageOff();
function toggleEveryImageOff(){
    $( "#image"+1 ).toggle( false );
    $( "#image"+2 ).toggle( false );
    $( "#image"+3 ).toggle( false );
}
function toggleImage(n){
    $( "#image"+n ).toggle( "slow" );
}

function addHighScore(){
    $( "#addHighScoreSection" ).toggle( "slow" );
}

function fireImigur(){  
      var $files = $('input[type=file]').get(0).files;
      if ($files.length) {
        // Reject big files
        if ($files[0].size > $('input[type=file]').data("max-size") * 1024) {
          console.log("Please select a smaller file");
          return false;
        }
        // Begin file upload
        console.log("Uploading file to Imgur..");
        var apiUrl = 'https://api.imgur.com/3/image';
        var apiKey = '39974ea9039228c';
        var settings = {
          async: false,
          crossDomain: true,
          processData: false,
          contentType: false,
          type: 'POST',
          url: apiUrl,
          headers: {
            Authorization: 'Client-ID ' + apiKey,
            Accept: 'application/json'
          },
          mimeType: 'multipart/form-data'
        };
        var formData = new FormData();
        formData.append("image", $files[0]);
        settings.data = formData;
        // Response contains stringified JSON
        $.ajax(settings).done(function(response) {
         updateHighScore2(JSON.parse(response).data.link);
        });
  
      }

}


  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });