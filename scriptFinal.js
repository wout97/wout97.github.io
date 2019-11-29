google.charts.load("current", {packages:['corechart']});
var groupNr = Math.floor(Math.random() * 2);

var recommendedTracks;
var selectedTracks;
var featuresOfTracks;
var audioFeatures;

var selectedPlaylistId;
$(() => {
	var tracksStr = Cookies.get('tracks');
	var featuresStr = Cookies.get('features');
	selectedPlaylistId = Cookies.get('playlist');
    if(!tracksStr || !selectedPlaylistId) {
        window.location = 'start.html';
	}
	if(!featuresStr) {
        window.location = 'tune.html';
	}

	var trackIds = tracksStr.split(',');
	var targetFeatureTuples = featuresStr.split(',')
		.map((featureStr) => featureStr.split('='))
		.map((featureTuple) => [Spotify.audioFeatures[featureTuple[0]], parseFloat(featureTuple[1])]);
	audioFeatures = targetFeatureTuples.map((tuple) => tuple[0]);
	var seeds = getRandomSample(trackIds, 5);

	Spotify.getRecommendations(seeds, targetFeatureTuples).then((simpleTracks) => {
		Spotify.getTracks(simpleTracks.map((t) => t.id)).then((tracks) => {
			if(groupNr == 1) {
				tracks.sort((t1, t2) => t2.popularity - t1.popularity);
			}
			recommendedTracks = tracks;
			selectedTracks = [...recommendedTracks];
			Spotify.getAudioFeatures(tracks.map((track) => track.id)).then((featuresData) => {
				featuresOfTracks = featuresData;
				tracks.forEach((track, i) => {
					var features = featuresData.audio_features[i];
					var hidden = false;
					if(track.preview_url == null){hidden = true
						console.log(track.preview_url);
					};
					
					$('#recommendations').append(`
<div id='track${ i }' hidden='${ hidden }'>
	<div class="container center">
		${ audioFeatures.map((feature) => `<ion-label color='medium' title="${ feature.title }"><ion-icon item-start size="small" slot="start" name="${ feature.icon }"></ion-icon>=${ Math.round(features[feature.key]*100) }%</ion-label>`).join(' ') }
	</div>
	<ion-item>
		<ion-label>${ track.name } - ${ track.artists[0].name }</ion-label>
		${ track.preview_url?`<button id='play${ i }' color='green' onclick='playAudio(${ i })' class='btn btn-sm  bg-success'><i class='fa fa-play'></i></button>`:'' }
		<button  onclick='toggleGraph(${ i })' class='btn btn-sm btn-space bg-info'><i class='fas fa-chart-bar'></i></button>
		<button color='danger' onclick='deleteAudio(${ i })' class='btn btn-sm btn-space bg-danger'>
			<i class='fa fa-trash'></i>
		</button>
	</ion-item>
	<div style='display:none;' id='chart${ i }'></div>
</div>
`
					);
				});
				$('#recommendations').append(`<script>google.charts.setOnLoadCallback(initializeCharts);</script>`);
			});
		});
	});
});

function toggleGraph(index){
	$('#chart' + index).slideToggle(500);
}

function drawChart(index) {
	var features = featuresOfTracks.audio_features[index];

	var arrayData = [["Attribute", "Value", { role: "style" } ]];
	audioFeatures.forEach((feature) => {
		arrayData.push([feature.title, features[feature.key], feature.color]);
	});
	var data = google.visualization.arrayToDataTable(arrayData);

	var view = new google.visualization.DataView(data);
	view.setColumns([0, 1,
					{ calc: "stringify",
					sourceColumn: 1,
					type: "string",
					role: "annotation" },
					2]);

	var options = {
		width: Math.min($(window).width()*0.95 , 700),
		height: $(window).height()*0.3,
		bar: {groupWidth: "80%"},
		legend: { position: "none" },
	};
	var chart = new google.visualization.ColumnChart(document.getElementById("chart" + index));
	chart.draw(view, options);
}

function initializeCharts(){
	recommendedTracks.forEach((track, i) => drawChart(i));
}

function getRandomSample(list, count) {
	count = Math.min(list.length, count);
	var result = new Array(count);
	var len = list.length;
    var taken = new Array(len);
    while (count--) {
        var x = Math.floor(Math.random() * len);
        result[count] = list[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

var currentlyPlaying = null;
function playAudio(index){
	if(currentlyPlaying != null) {
		$('#audio').trigger('pause');
		$('#play' + currentlyPlaying).removeClass('bg-warning').addClass('bg-success').find('i').removeClass('fa-pause').addClass('fa-play');
	}
	if(index != currentlyPlaying) {
		currentlyPlaying = index;
		$('#audio').find('source').attr('src', recommendedTracks[index].preview_url);
		$('#audio').trigger('load').trigger('play');
		$('#play' + index).removeClass('bg-success').addClass('bg-warning').find('i').removeClass('fa-play').addClass('fa-pause');
	}
	else {
		currentlyPlaying = null;
	}
}

//delete song from list
function deleteAudio(index){
	$('#track' + index).slideUp(500);
	var indexInSelectedTracks = selectedTracks.indexOf(recommendedTracks[index]);
	selectedTracks.splice(indexInSelectedTracks, 1);
}

//create playlist and save songs to it
function saveSongsToNewPlaylist(){
	//create all data for Post call
	var playlistName = $("#playlistName").val();
	var description = "Created with Spotify recommender!";
	
	Spotify.createPlaylist(playlistName, description, selectedTracks).then(() => {
		alert('A new playlist is added to your spotify! :) ');
		window.location.href = "feedback.html";
	});
}

function saveSongsToSelectedPlaylist(){
	Spotify.saveTracksToPlaylist(selectedPlaylistId, selectedTracks).then(() => {
		alert('The tracks have been added to your playlist! :) ');
		window.location.href = "feedback.html";
	});
}

window.addEventListener("resize", resize);

function resize() {
	recommendedTracks.forEach((track, i) => drawChart(i));
}
