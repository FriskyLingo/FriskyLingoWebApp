$(document).ready(function() {
	console.log('v0.6');
	var brazzersSceneNames = [];

	///////////////////////////////////////////////
	//Get the scenes I already have
	///////////////////////////////////////////////
	$.when(getTextFile('data/bDownloadedSceneNames.txt')).done(function(data){
	    //console.log('DONE getting bDownloadedSceneNames.txt');
		
	    brazzersSceneNames = data.split('\r\n');
		
	    if (brazzersSceneNames.length > 0) {
	        //console.log('brazzersSceneNames: [' + brazzersSceneNames.length + ']');
		} else {
	        console.log('!!-ERROR-!!' + '\t' + 'brazzersSceneNames data not found!');
	    }

	    var sceneTitlesOnPage = getSceneTitles($(document));

	    if (sceneTitlesOnPage.length > 0) {
	        //console.log('sceneTitlesOnPage: [' + sceneTitlesOnPage.length + ']');

	        //console.log('--Getting scene titles that have already been downloaded..');

	        var alreadyDownloadedScenes = brazzersSceneNames.intersect(sceneTitlesOnPage);

	        //console.log('----Found [' + alreadyDownloadedScenes.length + '] scenes already downloaded');

	        if (alreadyDownloadedScenes.length > 0) {
	            //console.log('----Hiding already downloaded scenes on page...');

	            $.each(alreadyDownloadedScenes, function(index, value) {
	                var $theScene = $(document).find('div.scene-card-title a:contains("' + value + '")').closest('div.release-card-wrap');
	                $theScene.hide();
	            });

	            //console.log('----Done hiding scenes');
	        }
	    } else {
	        console.log('!!-ERROR-!!' + '\t' + 'sceneTitlesOnPage data not found!');
	    }

	    //Hide anal scenes
	    $(document).find('span.promoted-tag:contains("Anal")').closest('div.release-card-wrap').hide();
	    $(document).find('div.scene-card-title a:contains(" Anal")').closest('div.release-card-wrap').hide();
	    $(document).find('div.scene-card-title a:contains("Anal ")').closest('div.release-card-wrap').hide();

	    //Output scene titles and links to console
	    var theOutput = [];

	    $('div.scene-card-title:visible').each(function() {
	        var theSceneTitle = $(this).find('a').attr('title').compact().trim();
	        var theSceneLink = window.location.origin + $(this).find('a').attr('href');
	        var theOutputLine = theSceneTitle + '\t' + theSceneLink;

	        theOutput.push(theOutputLine);
	    });

	    console.log(theOutput.join('\r\n'));
	});
});


//////////////////////////////////////////////////////////////////////////////////////////////
// Get text file using AJAX
//////////////////////////////////////////////////////////////////////////////////////////////
function getTextFile(filePath) {
	return $.ajax({
		url: 'http://www.friskylingo.com/' + filePath,
		type: 'GET',
		dataType: 'text',
		crossDomain: true
	});
}



//////////////////////////////////////////////////////////////////////////////////////////////
// Get all the scene titles on the page
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneTitles($thePage) {
    var returnData = [];

    var $sceneTitles = $thePage.find('div.scene-card-title a');

    $sceneTitles.each(function() {
        var theSceneTitle = $(this).text().compact().trim();
        returnData.push(theSceneTitle);
    });

	return returnData;
}