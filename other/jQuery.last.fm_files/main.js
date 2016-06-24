$('.albums').lfm({
   APIkey: 'fc649436b9874100c0615546e3fba578',
   User: 'FriskyLingo',
   Behavior: "hover",	//or click
   limit: 8, 		// 1 album - 50 albums
   period: "3month"	//overall|7day|1month|3month|6month|12month
});

$(document).ready(function() {
	var lfmApiRootUrl = "http://ws.audioscrobbler.com/2.0/?";
	var userName = "FriskyLingo";
	var apiKey = "fc649436b9874100c0615546e3fba578";
	var lfmApiUserInfoUrl = '&user=' + userName + '&api_key=' + apiKey +'&format=json';
	
	/*
	user.getArtistTracks
	user.getBannedTracks
	user.getEvents
	user.getFriends
	user.getInfo
	user.getLovedTracks
	user.getNeighbours
	user.getNewReleases
	user.getPastEvents
	user.getPersonalTags
	user.getPlaylists
	user.getRecentStations
	user.getRecentTracks
	user.getRecommendedArtists
	user.getRecommendedEvents
	user.getShouts
	user.getTopAlbums
	user.getTopArtists
	user.getTopTags
	user.getTopTracks
	user.getWeeklyAlbumChart
	user.getWeeklyArtistChart
	user.getWeeklyChartList
	user.getWeeklyTrackChart
	user.shout
	user.signUp
	user.terms
	*/
	
	
	var lfmUserInfo = {};
	
	//Get last.fm information for user
	$.ajax({
	  url: lfmApiRootUrl + 'method=user.getInfo' + lfmApiUserInfoUrl
	}).done(function(data){
		lfmUserInfo = data.user;
		console.log(lfmUserInfo);
	});
	
	var lfmUserRecentTracks = {};
		
	//Get last.fm recent tracks for user
	$.ajax({
	  url: lfmApiRootUrl + 'method=user.getRecentTracks' + lfmApiUserInfoUrl
	}).done(function(data){
		lfmUserRecentTracks = data.recenttracks;
		console.log(lfmUserRecentTracks);
	});
});