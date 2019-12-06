var url_string = window.location.href;
var url = new URL(url_string);

var groupNr = parseInt(url.searchParams.get("group"));
var timeSpent = parseInt(url.searchParams.get("timediff")) || 0;
var timesAudioIsdeleted = parseInt(url.searchParams.get("timeDel")) || 0;
var timesAudioIsPlayed = parseInt(url.searchParams.get("timePlay")) || 0;
var timesGraphClicked = parseInt(url.searchParams.get("timeGraph")) || 0;
var timesRetune = parseInt(url.searchParams.get("timeRetune"));
timesRetune +=1;
if (groupNr == NaN){
    groupNr = -1;
}
console.log("GN=" + groupNr)

var audioFeatures = [
    Spotify.audioFeatures.instrumentalness,
    Spotify.audioFeatures.acousticness,
    Spotify.audioFeatures.energy,
    Spotify.audioFeatures.danceability,
    Spotify.audioFeatures.valence
];
var originalFeatureValues = audioFeatures.map(() => 0.5);
var oldSliderValues = audioFeatures.map(() => 50);

$(() => {
    var tracksStr = Cookies.get('tracks');
    if(!tracksStr) {
        window.location = 'start.html';
    }
    var trackIds = tracksStr.split(',');
    initializeFeatures(trackIds);
});

function initializeFeatures(trackIds) {
    // initialize sliders
    $('#tune-list').empty();
    audioFeatures.forEach((feature, i) => {
        $('#tune-list').append(`
<ion-item class="bar bar-header">
    <h3 class="title">
        ${ feature.title }
        <a href="#" data-toggle="tooltip" data-placement="bottom" data-container="body" title="${ feature.description }" ><i class="fa fa-info-circle" aria-hidden="true"></i></a>
    </h3>
</ion-item>

<ion-item>
    <ion-range id="slider-${ feature.key }" min="0" max="100" color="secondary" pin="true" value="50">
        <ion-icon size="small" slot="start" name="${ feature.icon }"></ion-icon>
        <ion-icon size="large" slot="end" name="${ feature.icon }"></ion-icon>
    </ion-range>
</ion-item>`
        );
    });
    $('#tune-list').append(`<script>$('[data-toggle="tooltip"]').tooltip({html:true});setInterval(makeIconShake, 50);reset();</script>`);

    // initialize original audio features
    originalFeatureValues = audioFeatures.map(() => 0);
    Spotify.getAudioFeatures(trackIds).then((featuresData) => {
        featuresData.audio_features.forEach((featureData) => {
            audioFeatures.forEach((feature, i) => {
                originalFeatureValues[i] += featureData[feature.key];
            });
        });
    }).then(() => {
        originalFeatureValues = originalFeatureValues.map(v => v/trackIds.length);
        reset();
    });
}


function reset(){
    audioFeatures.forEach((feature, i) => {
        $('#slider-' + feature.key).val(100*originalFeatureValues[i]);
    });
    oldSliderValues = [...originalFeatureValues];
}

function makeIconShake() {
    audioFeatures.forEach((feature, i) => {
        var oldValue = oldSliderValues[i];
        var slider = $(`#slider-${ feature.key }`);
        var newValue = slider.val();
        slider.find('ion-icon').removeClass('icons');
        if(newValue > oldValue) {
            slider.find('ion-icon[slot="end"]').addClass('icons');
        }
        else if(newValue < oldValue) {
            slider.find('ion-icon[slot="start"]').addClass('icons');
        }
        oldSliderValues[i] = newValue;
    });
	
	//update url button
    //activated();
}

//update url from next button
function navigateToFinal() {
    selectedFeatures = audioFeatures.map((feature, i) => feature.key + '=' + oldSliderValues[i]/100);
    Cookies.set('features', selectedFeatures.join(','));
    window.location = 'final.html' + "?timediff=" +  (timeSpent) + "&group=" + groupNr+ "&timePlay=" + timesAudioIsPlayed + "&timeDel=" + timesAudioIsdeleted +"&timeGraph="+timesGraphClicked+"&timeRetune=" + timesRetune ;
}
