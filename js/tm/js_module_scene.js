var scene = (function () {
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	// PRIVATE
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//////////////////////////////////////////
	// Properties
	//////////////////////////////////////////
	var privateVariable = 1;

	//////////////////////////////////////////
	// Methods
	//////////////////////////////////////////
	function privateMethod() {
		console.log('privateMethod() called');
	}

	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	// PUBLIC
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	var my = {};
	
	//////////////////////////////////////////
	// Properties
	//////////////////////////////////////////
	//The scene's release date [YYYY-MM-DD] (eg. "2015-04-28")
	my.releaseDate = null;
	
	//The scene's site (eg. "momsbangteens")
	my.site = null;
	
	//Abbreviated version of the site's name that the scene is from (eg. "MBT")
	my.siteType = null;
	
	//The title of the site the scene is from (eg. "Moms Bang Teens")
	my.siteTitle = null;
	
	//The scene's rating from the website (eg. "9.2")
	my.rating = null;
	
	//Number of votes contributing to scene's rating (eg. 587)
	my.votes = null;
	
	//
	my.favorites = null;
	
	//
	my.views = null;
	
	//The scene's title (eg. "Show Me Blow Me")
	my.title = null;
	
	//The scene's description (eg. "Blah blah blah. Blah blah blah.")
	my.description = null;
	
	//The scene's performers (eg. "Buster Jones")
	my.performers = [];
	
	//The scene's tags/keywords (eg. "blonde")
	my.tags = [];
	
	//The scene's ID (eg. 12345)
	my.sceneId = null;
	
	//
	my.sceneUrl = null;
	
	//
	my.downloadUrl = null;
	
	//
	my.siteFileName = null;
	
	//
	my.myFileName = null;
	
	//
	my.fileType = null;
	
	
	//////////////////////////////////////////
	// Methods
	//////////////////////////////////////////
	//Add performer
	my.addPerformer = function (performerName) {
		my.performers.push(performerName);
	};
	
	//Add tag
	my.addTag = function (tag) {
		my.tags.push(tag);
	};
	
	//Reset values
	my.reset = function () {
		console.log('resetting scene');
		
		my.releaseDate = null;
		my.site = null;
		my.siteType = null;
		my.siteTitle = null;
		my.rating = null;
		my.votes = null;
		my.favorites = null;
		my.views = null;
		my.title = null;
		my.description = null;
		my.performers = [];
		my.tags = [];
		my.sceneId = null;
		my.sceneUrl = null;
		my.downloadUrl = null;
		my.siteFileName = null;
		my.myFileName = null;
		my.fileType = null;
		
		console.log('scene info reset');
	};

	
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	// Return Public Interface
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	return my;
}());