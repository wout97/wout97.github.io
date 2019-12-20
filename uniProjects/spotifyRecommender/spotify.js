function AudioFeature(key, title, icon, color, description) {
    this.key = key;
    this.title = title;
    this.icon = icon;
    this.color = color;
    this.description = description;
}
Spotify = {
    _baseUrl: "https://api.spotify.com/v1/",
    _accessToken: null,
    _clientId: null,
    _userId: null,
    _scopes: null,
    _redirectPath: null,

    audioFeatures: {
        acousticness: new AudioFeature('acousticness', 'Acousticness', 'musical-notes', '#b87333', 'Predicts whether a track is <b>acoustic</b>. A higher number results in acoustic results.'),
        danceability: new AudioFeature('danceability', 'Danceability', 'musical-note', 'silver', 'Predicts wheter a track is danceable. Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A higher number results in more danceable tracks.'),
        energy: new AudioFeature('energy', 'Energy', 'flash', 'gold', 'Predicts whether a track has high energy. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.'),
        instrumentalness: new AudioFeature('instrumentalness', 'Instrumentalness', 'microphone', 'purple', "Predicts whether a track contains <b>no vocals</b>. Rapped, sung or spoken word tracks are clearly 'vocal'. A higher number results in less vocal elements."),
        valence: new AudioFeature('valence', 'Mood', 'happy', 'orange', 'Predicts wheter a track is positive. A higher number results in positive tracks.')
    },

    init: (clientId, scopes, redirectPath) => {
        Spotify._clientId = clientId;
        Spotify._scopes = scopes;
        Spotify._redirectPath = redirectPath;
        var token = Spotify._findAccessToken();
        if (!token) {
            Spotify._login();
            throw new Error("There is no access token present.");
        }
        Spotify._accessToken = token;
        Cookies.set('access_token', Spotify._accessToken);
    },
    _login: () => {
        if (!Spotify._redirectPath || !location.host) {
            console.error("Cannot login: no valid redirect-url provided. Are you working locally?");
            return;
        }
        var redirectUrl = location.protocol + '//' + location.host + (Spotify._redirectPath[0]=='/'?'':'/') + Spotify._redirectPath;
        if (!Spotify._clientId || !Spotify._scopes) {
            console.error("Cannot login: the Spotify service was not properly initialized.");
            return;
        }
        var params = {
            client_id: Spotify._clientId,
            scope: Spotify._scopes.join(' '),
            response_type: 'token',
            state: '123'
        }
        window.location = 'https://accounts.Spotify.com/authorize?redirect_uri=' + redirectUrl + '&' + $.param(params);
    },
    _findAccessToken: () => {
        return new URL(window.location.href).searchParams.get('access_token')
            || (window.location.hash.match(/access_token=([^&]*)/) || [null, null])[1]
            || Cookies.get('access_token');
    },
    _call: (url, method, data) => {
        if (Spotify._accessToken === null) {
            var token = Spotify._findAccessToken();
            if (!token) {
                Spotify._login();
                throw new Error("There is no access token present.");
            }
            Spotify._accessToken = token;
            Cookies.set('access_token', Spotify._accessToken);
        }
        if(method == 'POST') {
            data = JSON.stringify(data);
        }
        return $.ajax({
            url: url,
            method: method,
            data: data,
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', "Bearer " + Spotify._accessToken);
            },
            dataType: 'json',
        }).catch((request, description, exception) => {
            switch(request.responseJSON.error.status) {
                case 401:
                    console.error('Failed to call Spotify API. Will try to login.\nReason:', request.responseJSON);
                    Spotify._login();
                    break;
                default:
                    console.error('Unknown error during Spotify API call.\nReason:', request.responseJSON);
            }
        });
    },
    call: (key, params) => {
        var url = Spotify._baseUrl + key;
        return Spotify._call(url, 'GET', params);
    },
    post: (key, data) => {
        var url = Spotify._baseUrl + key;
        return Spotify._call(url, 'POST', data);
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
        return Spotify._call(playlist.href, 'GET').then((response) => {
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
    getTracks: (ids) => {
        var params = {
            ids: ids.join(',')
        }
        return Spotify.call('tracks', params).then((data) => data.tracks);
    },
    getAudioFeatures: (trackIds) => {
        return Spotify.call('audio-features/', {
            ids: trackIds.join(',')
        });
    },
    getRecommendations: (seeds, targetFeatureTuples, count) => {
        if(seeds.length > 5) {
            throw new Error("Cannot get Spotify recommendations based on more seeds than 5.");
        }
        var params = {};
        params.seed_tracks = seeds.join(',');
        params.limit = count;
        targetFeatureTuples.forEach((featureTuple) => {
            var feature = featureTuple[0];
            var target = featureTuple[1];
            params['target_' + feature.key] = target;
        });
        return Spotify.call('recommendations', params).then((data) => data.tracks);
    },
    createPlaylist: (name, description, tracks) => {
        if(!tracks) {
            var data = {
                name: name,
                description: description,
                public: false
            };
            return new Promise((resolve, reject) => {
                Spotify.getUserId().then((id) => {
                    Spotify.post(`users/${ id }/playlists`, data).then(resolve, reject);
                })
            });
        } else {
            return new Promise((resolve, reject) => {
                return Spotify.createPlaylist(name, description).then((playlist) => {
                    Spotify.saveTracksToPlaylist(playlist.id, tracks).then(resolve, reject);
                });
            });
        }
    },
    saveTracksToPlaylist: (playlistId, tracks) => {
        if(tracks.length > 100) {
            throw new Error("Cannot save more than 100 tracks to a Spotify playlist.");
        }
        var data = {
            uris: tracks.map((track) => track.uri)
        }
        return Spotify.post(`playlists/${ playlistId}/tracks`, data);
    }
}
