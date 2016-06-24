/// <reference path="../Scripts/jquery-2.1.4.intellisense.js" />
/// <reference path="isMobile.min.js" />

var lfmApiRootUrl = 'http://ws.audioscrobbler.com/2.0/?';
var userName = 'FriskyLingo';
var apiKey = 'fc649436b9874100c0615546e3fba578';
var lfmApiUserInfoUrl = '&user=' + userName + '&api_key=' + apiKey + '&format=json';
var lfmApiUsernameInfoUrl = '&username=' + userName + '&api_key=' + apiKey + '&format=json';

var mostRecentTrack = {};
var currentlyPlayingTrack = {};

setInterval(function() {
    //Get last.fm recent tracks for user
    $.ajax({
        url: lfmApiRootUrl + 'method=user.getRecentTracks' + lfmApiUserInfoUrl
    }).done(function(data) {
        //console.log(data);

        var $recentTracks = $(data.recenttracks.track);
        //console.log($lfmUserRecentTracks2);

        var mostRecentTrack2 = $recentTracks[0];
        //console.log(mostRecentTrack);
        //console.log(mostRecentTrack2);

        if (mostRecentTrack2.name !== mostRecentTrack.name) {
            //console.log("most recent track changed!");
            updateNowPlaying.onReady();
        }
    });
}, 5000);

//Get last.fm recent tracks for user
var updateNowPlaying = {
    onReady: function() {
        jQuery.ajax({
            url: lfmApiRootUrl + 'method=user.getRecentTracks' + lfmApiUserInfoUrl
        }).done(function(data) {
            //console.log(data);
            var lfmUserRecentTracks = data.recenttracks;

            //var $recentTracks2 = $(data.recenttracks.track);
            //console.log(lfmUserRecentTracks);

            mostRecentTrack = lfmUserRecentTracks.track[0];
            //console.log(mostRecentTrack);

            $('.scrobbles-subtext-track').html();
            $('.scrobbles-subtext-artist').html();
            $('.scrobbles-subtext-album').html();

            //Check if a track is currently playing
            if (mostRecentTrack['@attr'] != undefined) {
                //If the most recent track has @attr, it is currently being played
                //console.log("Currently Playing Track: [" + mostRecentTrack.name + "] by [" + mostRecentTrack.artist['#text'] + "]");
                currentlyPlayingTrack = mostRecentTrack;
                setTrackInfo(mostRecentTrack.artist['#text'], mostRecentTrack.name);
                setArtistInfo(mostRecentTrack.artist['#text']);
                setAlbumInfo(mostRecentTrack.artist['#text'], mostRecentTrack.album['#text']);
                $('#spnStatusText').html(' is playing');
            } else {
                //If it doesn't have @attr, it's not currently playing
                //console.log("Most Recently Played Track: [" + mostRecentTrack.name + "] by [" + mostRecentTrack.artist['#text'] + "]");
                currentlyPlayingTrack = {};

                $('#spnStatusText').html(' last played');

                var currentTime = Math.round((new Date().getTime()) / 1000);
                var lastListenedTime = mostRecentTrack.date.uts;
                var howManyMinutesAgo = Math.round((currentTime - lastListenedTime) / 60);

                var howLongAgo;

                if (howManyMinutesAgo > 59) {
                    var howManyHoursAgo = Math.round(howManyMinutesAgo / 60);

                    if (howManyHoursAgo > 23) {
                        var howManyDaysAgo = Math.round(howManyHoursAgo / 24);

                        howLongAgo = howManyDaysAgo + ' days ago';
                    } else {
                        howLongAgo = howManyHoursAgo + ' hours ago';
                    }
                } else {
                    howLongAgo = howManyMinutesAgo + ' minutes ago';
                }

                if (howLongAgo.substring(0, 2) === '1 ') {
                    howLongAgo = howLongAgo.replace('s', '');
                }

                $('.scrobbles-subtext-track').html('<a href="http://www.last.fm/user/FriskyLingo/tracks?view=compact&page=1" class="inherit">' + howLongAgo + '</a>');
            }


            $('.track-name')
                .text(mostRecentTrack.name)
                .attr('href', mostRecentTrack.url);

            $('.artwork')
                .attr('href', mostRecentTrack.url);

            var artistInfo = {};

            jQuery.ajax({
                url: lfmApiRootUrl + 'method=artist.getInfo&artist=' + mostRecentTrack.artist['#text'] + lfmApiUserInfoUrl
            }).done(function(data) {
                //console.log(data.artist);
                artistInfo = data.artist;
                $('.artist-name a').text(mostRecentTrack.artist['#text']);

                if (data.artist.url) {
                    $('.artist-name a').attr('href', data.artist.url);
                }

                var imageUrl = '';
                var maxImageCount = 0;

                if (mostRecentTrack.album['#text'] !== '') {
                    //If the track DOES have an album, use the ALBUM artwork
                    jQuery.ajax({
                        url: lfmApiRootUrl + 'method=album.getInfo&artist=' + mostRecentTrack.artist['#text'] + '&album=' + mostRecentTrack.album['#text'] + lfmApiUserInfoUrl
                    }).done(function() {
                        //console.log(data.album);

                        maxImageCount = mostRecentTrack.image.length - 1;
                        imageUrl = mostRecentTrack.image[maxImageCount]['#text'];
                        if (!isMobile.any) {
                            imageUrl = imageUrl.replace('300x300', '500');
                        } else {
                            imageUrl = mostRecentTrack.image[maxImageCount]['#text'];
                        }

                        //console.log(imageUrl);

                        $('.art').css('background-image', 'url(' + imageUrl + ')');
                        $('.main-art').attr('src', imageUrl).attr('alt', 'Artwork for ' + mostRecentTrack.name);
                    });
                } else {
                    //If the track DOES NOT have an album, use ARTIST artwork
                    maxImageCount = artistInfo.image.length - 1;

                    imageUrl = artistInfo.image[maxImageCount]['#text'];
                    $('.art').css('background-image', 'url(' + imageUrl + ')');
                    $('.main-art').attr('src', imageUrl).attr('alt', 'Artwork for ' + mostRecentTrack.name);
                }
            });
        });
    }
};





$(document).ready(function() {
    updateNowPlaying.onReady();
    setUserInfo();
    setRecentTracks();
    //setWeeklyChartList();
    //setTopTracks('overall');
    //setTopArtists('overall');
    //setTopAlbums('overall');
    //getLibraryTracks();
});



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// LastFM API Functions
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////
// Set my LastFM user information
//////////////////////////////////////////////////////////
function setUserInfo() {
    $.ajax({
        url: lfmApiRootUrl + 'method=user.getInfo' + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('userInfo', data.user);

        //console.log(amplify.store("userInfo"));
    });
}

//////////////////////////////////////////////////////////
// Set my most recently scrobbled tracks
//////////////////////////////////////////////////////////
function setRecentTracks() {
    $.ajax({
        url: lfmApiRootUrl + 'method=user.getRecentTracks' + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('recentTracks', data.recenttracks);

        //console.log(amplify.store("recentTracks"));
    });
}

//////////////////////////////////////////////////////////
// Set my weekly chart list
//////////////////////////////////////////////////////////
function setWeeklyChartList() {
    $.ajax({
        url: lfmApiRootUrl + 'method=user.getWeeklyChartList' + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('weeklyChartList', data.weeklychartlist);

        //console.log(amplify.store("weeklyChartList"));
    });
}

//////////////////////////////////////////////////////////
// Set my weekly track chart
//////////////////////////////////////////////////////////
function setWeeklyTrackChart(beginDate, endDate) {
    var dateRange = '';

    if (beginDate != undefined) {
        dateRange = "&from='" + beginDate + "'&to='" + endDate + "'";
    }

    $.ajax({
        url: lfmApiRootUrl + 'method=user.getWeeklyTrackChart' + dateRange + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('weeklyTrackChart', data.weeklytrackchart);

        //console.log(amplify.store("weeklyTrackChart"));
    });
}

//////////////////////////////////////////////////////////
// Set my weekly artist chart
//////////////////////////////////////////////////////////
function setWeeklyArtistChart(beginDate, endDate) {
    var dateRange = '';

    if (beginDate != undefined) {
        dateRange = "&from='" + beginDate + "'&to='" + endDate + "'";
    }

    $.ajax({
        url: lfmApiRootUrl + 'method=user.getWeeklyArtistChart' + dateRange + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('weeklyArtistChart', data.weeklyartistchart);

        //console.log(amplify.store("weeklyArtistChart"));
    });
}

//////////////////////////////////////////////////////////
// Set my weekly album chart
//////////////////////////////////////////////////////////
function setWeeklyAlbumChart(beginDate, endDate) {
    var dateRange = '';

    if (beginDate != undefined) {
        dateRange = "&from='" + beginDate + "'&to='" + endDate + "'";
    }

    $.ajax({
        url: lfmApiRootUrl + 'method=user.getWeeklyAlbumChart' + dateRange + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('weeklyAlbumChart', data.weeklyalbumchart);

        //console.log(amplify.store("weeklyAlbumChart"));
    });
}

//////////////////////////////////////////////////////////
// Set my top tracks
//////////////////////////////////////////////////////////
function setTopTracks(period) {
    $.ajax({
        url: lfmApiRootUrl + 'method=user.getTopTracks' + '&period=' + period + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('topTracks', data.toptracks);

        //console.log(amplify.store("topTracks"));
    });
}

//////////////////////////////////////////////////////////
// Set my top artists
//////////////////////////////////////////////////////////
function setTopArtists(period) {
    $.ajax({
        url: lfmApiRootUrl + 'method=user.getTopArtists' + '&period=' + period + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('topArtists', data.topartists);

        //console.log(amplify.store("topArtists"));
    });
}

//////////////////////////////////////////////////////////
// Set my top albums
//////////////////////////////////////////////////////////
function setTopAlbums(period) {
    $.ajax({
        url: lfmApiRootUrl + 'method=user.getTopAlbums' + '&period=' + period + lfmApiUserInfoUrl
    }).done(function (data) {
        //console.log(data.album);

        amplify.store('topAlbums', data.topalbums);

        //console.log(amplify.store("topAlbums"));
    });
}

//////////////////////////////////////////////////////////
// Set the track info for a specific track
//////////////////////////////////////////////////////////
function setTrackInfo(artist, track) {
    $.ajax({
        url: lfmApiRootUrl + 'method=track.getInfo' + '&artist=' + artist + '&track=' + track + lfmApiUsernameInfoUrl
    }).done(function (data) {
        if (data) {
            if (data.track) {
                amplify.store('trackInfo', data.track);

                if (data.track.userplaycount) {
                    var playCount = data.track.userplaycount;
                    $('.scrobbles-subtext-track').html('');
                    $('.scrobbles-subtext-track').html('<a href="http://www.last.fm/user/FriskyLingo/library/music/' + artist + '/_/' + track + '" class="inherit">Track plays: <b>' + playCount + '</b></a>');
                }
            } else {
                amplify.store('trackInfo', '');
                $('.scrobbles-subtext-track').html();
            }
        }
    });
}

//////////////////////////////////////////////////////////
// Set the artist info for a specific artist
//////////////////////////////////////////////////////////
function setArtistInfo(artist) {
    $.ajax({
        url: lfmApiRootUrl + 'method=artist.getInfo' + '&artist=' + artist + lfmApiUsernameInfoUrl
    }).done(function (data) {
        if (data) {
            if (data.artist) {
                amplify.store('artistInfo', data.artist);

                if (data.artist.stats.userplaycount) {
                    var playCount = data.artist.stats.userplaycount;
                    $('.scrobbles-subtext-artist').html('');
                    $('.scrobbles-subtext-artist').html('<a href="http://www.last.fm/user/FriskyLingo/library/music/' + artist + '?sortBy=plays&sortOrder=desc" class="inherit">Artist plays: <b>' + playCount + '</b></a>');
                }
            } else {
                amplify.store('artistInfo', '');
                $('.scrobbles-subtext-artist').html();
            }
        }
    });
}

//////////////////////////////////////////////////////////
// Set the album info for a specific album
//////////////////////////////////////////////////////////
function setAlbumInfo(artist, album) {
    $.ajax({
        url: lfmApiRootUrl + 'method=album.getInfo' + '&artist=' + artist + '&album=' + album + lfmApiUsernameInfoUrl
    }).done(function (data) {
        if (data) {
            if (data.album) {
                amplify.store('albumInfo', data.album);

                if (data.album.userplaycount) {
                    var playCount = data.album.userplaycount;
                    $('.scrobbles-subtext-album').html('');
                    $('.scrobbles-subtext-album').html('<a href="http://www.last.fm/user/FriskyLingo/library/music/' + artist + '/' + album + '?sortBy=plays&sortOrder=desc" class="inherit">Album plays: <b>' + playCount + '</b></a>');
                }
            } else {
                amplify.store('albumInfo', '');
                $('.scrobbles-subtext-album').html();
            }
        }
    });
}

//////////////////////////////////////////////////////////
// Get my library tracks
//////////////////////////////////////////////////////////
function getLibraryTracks() {
    $.ajax({
        url: lfmApiRootUrl + 'method=library.getTracks' + '&user=FriskyLingo' + lfmApiUsernameInfoUrl
    }).done(function (data) {
        if (data) {
            if (data.tracks) {
                var totalNumberOfPages = data.tracks['@attr'].totalPages;

                for (var i = totalNumberOfPages; i >= 1; i--) {
                    //console.log('Processing page [' + i + '] of [' + totalNumberOfPages + ']');

                    $.ajax({
                        url: lfmApiRootUrl + 'method=library.getTracks' + '&user=FriskyLingo' + '&page=' + i + lfmApiUsernameInfoUrl
                    }).done(function (data2) {
                        if (data2) {
                            if (data2.tracks) {
                                var $tracks = $(data2.tracks.track);

                                var artist, name, album, playCount;

                                $tracks.each(function () {
                                    artist = $(this)[0].artist.name;
                                    name = $(this)[0].name;
                                    album = $(this)[0].album.name;
                                    playCount = $(this)[0].playcount;

                                    //console.log(name + "|" + artist + "|" + album +  "|" + playCount);
                                });
                            }
                        }
                    });
                }
            }
        }
    });
}






//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Helper Functions
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$