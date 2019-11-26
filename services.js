function AudioFeature(key, title, icon, description) {
    this.key = key;
    this.title = title;
    this.icon = icon;
    this.description = description;
}
Spotify = {
    _baseUrl: "https://api.Spotify.com/v1/",
    _accessToken: null,
    _clientId: null,
    _userId: null,
    _scopes: null,

    init: (clientId, scopes) => {
        Spotify._clientId = clientId;
        Spotify._scopes = scopes;
        var token = new URL(window.location.href).searchParams.get('access_token') || Cookies.get('access_token');
        if (!token) {
            Spotify._login(window.location.href);
            throw "There is no access token present.";
        }
        Spotify._accessToken = token;
        Cookies.set('access_token', Spotify._accessToken);
    },
    _login: (redirectUrl) => {
        if (!redirectUrl) {
            console.error("Cannot login: no valid redirect-url provided. Are you working locally?");
            return;
        }
        if (!Spotify._clientId || !Spotify._scopes) {
            console.error("Cannot login: the Spotify service was not properly initialized.");
            return;
        }
        var params = {
            client_id: Spotify._clientId,
            redirect_uri: redirectUrl,
            scope: Spotify._scopes.join(' '),
            response_type: 'token',
            state: '123'
        }
        window.location = 'https://accounts.Spotify.com/authorize?' + $.param(params);
    },
    _call: (url) => {
        if (Spotify._accessToken === null) {
            var token = new URL(window.location.href).searchParams.get('access_token') || Cookies.get('access_token');
            if (!token) {
                Spotify._login(window.location.href);
                throw "There is no access token present.";
            }
            Spotify._accessToken = token;
            Cookies.set('access_token', Spotify._accessToken);
        }
        return $.ajax({
            url: url,
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', "Bearer " + Spotify._accessToken);
            },
            dataType: 'json',
        }).catch((request, description, exception) => {
            switch(request.responseJSON.error.status) {
                case 401:
                    console.error('Failed to call Spotify API. Will try to login.\nReason:', request.responseJSON);
                    Spotify._login(window.location.href);
                    break;
                default:
                    console.error('Unknown error during Spotify API call.\nReason:', request.responseJSON);
            }
        });
    },
    call: (key, params) => {
        var url = Spotify._baseUrl + key;
        if (params) {
            url += '?' + $.param(params);
        }
        return Spotify._call(url);
    },
    getUserId: () => {
        if (Spotify._userId === null) {
            return Spotify.call('me').then((data) => {
                Spotify._userId = data.id;
                return Spotify._userId;
            });
        }
        return new Promise((resolve, reject) => resolve(Spotify._userId));
    },
    searchPlaylists: (query, count) => {
        var params = {
            q: query,
            type: 'playlist',
            limit: count,
            market: 'from_token'
        };
        return Spotify.call('search', params).then((response) => {
            return response.playlists.items;
        });
    },
    getTracksFromPlaylist: (playlist) => {
        return Spotify._call(playlist.href).then((response) => {
            return response.tracks.items
                .filter((trackData) => trackData.track && trackData.track.id)
                .map((trackData) => trackData.track);
        });
    },
    getUserPlaylists: () => {
        return new Promise((resolve, reject) => {
            Spotify.getUserId().then((id) => {
                Spotify.call(`users/${ id }/playlists`).then(playlistData => playlistData.items).then(resolve, reject);
            });
        });
    },
    getAudioFeatures: (trackIds) => {
        return Spotify.call('audio-features/', {
            ids: trackIds.join(',')
        });
    },
    audioFeatures: {
        acousticness: new AudioFeature('acousticness', 'Acousticness', 'musical-notes', 'Predicts whether a track is <b>acoustic</b>. A higher number results in acoustic results.'),
        danceability: new AudioFeature('danceability', 'Danceability', 'musical-note', 'Predicts wheter a track is danceable. Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A higher number results in more danceable tracks.'),
        energy: new AudioFeature('energy', 'Energy', 'flash', 'Predicts whether a track has high energy. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.'),
        instrumentalness: new AudioFeature('instrumentalness', 'Instrumentalness', 'microphone', "Predicts whether a track contains <b>no vocals</b>. Rapped, sung or spoken word tracks are clearly 'vocal'. A higher number results in less vocal elements."),
        mood: new AudioFeature('valence', 'Mood', 'happy', 'Predicts wheter a track is positive. A higher number results in positive tracks.')
    }
}
