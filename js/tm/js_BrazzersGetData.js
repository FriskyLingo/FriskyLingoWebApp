$(document).ready(function() {
	var brazzersLinks = [];
	var brazzersLinksProcessed = [];
	var brazzersSceneData = [];
	var brazzersLinksUnprocessed = [];

	///////////////////////////////////////////////
	//Get the links
	///////////////////////////////////////////////
	$.when(getTextFile('data/bLinks.txt')).done(function(data){
		//console.log('DONE getting bLinks.txt');
		
		brazzersLinks = data.split('\r\n');
		
		if (brazzersLinks.length > 0) {
			console.log('brazzersLinks: [' + brazzersLinks.length + ']');
		} else {
			console.log('!!-ERROR-!!' + '\t' + 'brazzersLinks data not found!');
		}
		
		///////////////////////////////////////////////
		//Get the processed links
		///////////////////////////////////////////////
		$.when(getTextFile('data/bLinksProcessed.txt')).done(function(data){
			//console.log('DONE getting bLinksProcessed.txt');
			
			brazzersLinksProcessed = data.split('\r\n');
			
			if (brazzersLinksProcessed.length > 0) {
				console.log('brazzersLinksProcessed: [' + brazzersLinksProcessed.length + ']');
			} else {
				console.log('!!-ERROR-!!' + '\t' + 'brazzersLinksProcessed data not found!');
			}
			
			//Get the list of unprocessed links
			brazzersLinksUnprocessed = brazzersLinks.subtract(brazzersLinksProcessed);
			console.log('brazzersLinksUnprocessed: [' + brazzersLinksUnprocessed.length + ']');
			
			///////////////////////////////////////////////
			//Get the scene data
			///////////////////////////////////////////////
			//$.when(getTextFile('data/bData.txt')).done(function(data){
				//console.log('DONE getting bData.txt');
				/*
				brazzersSceneData = data.split('\r\n');
				
				if (brazzersSceneData.length > 0) {
					console.log('brazzersSceneData: [' + brazzersSceneData.length + ']');
				} else {
					console.log('!!-ERROR-!!' + '\t' + 'brazzersSceneData data not found!');
				}
				*/
				///////////////////////////////////////////////
				// PROCESS
				///////////////////////////////////////////////
				if (window.location.href.indexOf('videos') > -1) {
					$('header, div#pornportal-wrapper, section.section-filter, section.section-header, section.footer-trusted, footer').hide();
					$('div.bg-wrapper').removeClass('bg-wrapper');
					
					brazzersLinks = brazzersLinks.union(getSceneLinks());
					
					var timer;
					
					function clickNextScene() {
						timer = setTimeout(function(){
							//Wait n seconds then click the "next scene" link
							console.log('\t' + 'triggering next page click');
							var theNextPageLink = $('li.paginationui-nav.next a').attr('href');
							var currentOrigin = window.location.origin;
							window.location.href = currentOrigin + theNextPageLink;
						}, 2000);
					}

					if ($('li.paginationui-nav.next').length > 0 && window.location.href.indexOf('page/60') < 0) {
						console.log('clicking next page');
						clickNextScene();
					} else {
						console.log('not clicking next page');
						clearTimeout(timer);
						logOutput();
					}
				} else {
					$('div#pornportal-wrapper, section.footer-trusted, footer, section.comments-box').hide();
					$('section.related-releases-placeholder, section.timeline-placeholder, #player_api').hide();
					$('div.bg-wrapper').removeClass('bg-wrapper');

					//Get scene data for each link
					//console.log('\t' + 'NOW get the scene data');
					getSceneData(brazzersLinksUnprocessed.first(300));
					//console.log(brazzersLinksUnprocessed.join('\n'));
				}
			//});
		});
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
// Get the data for each scene
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneData(unprocessedLinks) {
	var xhrs = [];
    var totalCounter = 0;
    var processedCounter = 0;
	
    totalCounter = unprocessedLinks.length;
    
	var doProcess = true;
	
	console.log('unprocessedLinks.length: ' + totalCounter);
	
	if (doProcess) {
		$.each(unprocessedLinks, function(i, theUrl) {
			var xhr = $.ajax({
				url: theUrl,
				type: 'GET'
			}).done(function(data) {
				processedCounter = processedCounter + 1;
				var percentComplete = ((processedCounter/totalCounter) * 100).round() + '%';
				document.title = percentComplete + ' [' + processedCounter + '/' + totalCounter + ']';
				
				//Get a reference to the web page
				var $thePage = $(data);
				
				var likes = getLikes($thePage);
				var dislikes = getDislikes($thePage);
				var views = getViews($thePage);

				var outputData = [
					getSiteAbbreviation($thePage),
					getSiteTitle($thePage),
					getReleaseDate($thePage),
					getSceneTitle($thePage),
					calculateRating(likes, dislikes, views),
					getPerformers($thePage),
					getDescription($thePage),
					getTags($thePage),
					getLikes($thePage),
					getDislikes($thePage),
					getViews($thePage),
					getPreferredDownload($thePage),
					theUrl
				];

				var theData = outputData.join('\t');
				
				//Append the data to the text file
				appendDataToTextFile(theData, 'data/bData.txt');
				
				//Append the processed link to the "processed links" file
				appendDataToTextFile(theUrl, 'data/bLinksProcessed.txt');
			}).fail(function() {
				console.log('FAIL!');
			});

			//console.log('finished [' + i + '/' + totalCounter + ']...');
			xhrs.push(xhr);
		});

		$.when.apply($, xhrs).done(function(){
			document.title = '!!-FINISHED-!!';
			console.log('==================================================================================');
			//console.log(GM_getValue('brazzersData').join('\n'));
		});
	}
}


//////////////////////////////////////////////////////////////////////////////////////////////
// Append data to a file
//////////////////////////////////////////////////////////////////////////////////////////////
function appendDataToTextFile(theLineData, theFilePath) {
	var theDataObj = {
		data: theLineData + '\r\n',
		filePath: theFilePath
	};

	//console.log('posting to PHP file');
	$.ajax({
		url: 'http://www.friskylingo.com/AppendToTextFileB.php',
		data: theDataObj,
		type: 'POST',
		crossDomain: true,
		success: function() {
			//console.log('SUCCESS!');
			//console.log(data);
		},
		error: function() {
			console.log('FAILED!');
			//console.log(data);
		}
	}).done(function() {
		//console.log('DONE!');
		//console.log(data);
	}).always(function() {
		//console.log('ALWAYS!');
		//console.log(data);
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////
// Create and log the output
//////////////////////////////////////////////////////////////////////////////////////////////
function logOutput() {
	var output = GM_getValue('brazzersLinks').join('\n');
	console.log(output);
}


//////////////////////////////////////////////////////////////////////////////////////////////
// Get scene links from the page
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneLinks() {
	var returnData = [];
	
	$('div.scene-card-title a').each(function() {
		var theLink = window.location.origin + $(this).attr('href');
		returnData.push(theLink);
	});
	
	return returnData;
}





function getLikes($thePage) {
	var returnData;
	returnData = $thePage.find('var#like-amount').text().trim().toNumber();

	return returnData;
}

function getDislikes($thePage) {
	var returnData;
	returnData = $thePage.find('var#dislike-amount').text().trim().toNumber();

	return returnData;
}

function getViews($thePage) {
	var returnData;
	returnData = $thePage.find('var#views-amount').text().trim().remove(' ').toNumber();

	return returnData;
}

function getSceneTitle($thePage) {
	var returnData = '';
	returnData = $thePage.find('section.scene-header-placeholder h1').text().compact().trim();

	return returnData;
}

function getPerformers($thePage) {
	var returnData = '';
	var $performers = $thePage.find('section.scene-header-placeholder h2 a');
	
	var thePerformers = [];
	$performers.each(function() {
		var thePerformer = $(this).text().trim();
		thePerformers.push(thePerformer);
	});
	
	returnData = thePerformers.join('|');

	return returnData;
}

function getSiteTitle($thePage) {
	var returnData = '';
	returnData = $thePage.find('a.scene-view-label span.label-text').text().compact().trim();

	return returnData;
}

function getSiteAbbreviation($thePage) {
	var returnData = '';
	returnData = $thePage.find('a.scene-view-label span.label-left-box').text().trim().toUpperCase();

	return returnData;
}

function getReleaseDate($thePage) {
	var returnData = '';
	var theDate = $thePage.find('div.scene-description-placeholder time').text().trim();
	var theMoment = moment(new Date(theDate)).format('YYYY-MM-DD');
	returnData = theMoment;

	return returnData;
}

function getDescription($thePage) {
	var returnData = '';
	returnData = $thePage.find('div.description-tags-placeholder p').text().compact().trim();

	return returnData;
}

function getTags($thePage) {
	var returnData = '';
	var $tags = $thePage.find('div.description-tags-placeholder li a');
	
	var theTags = [];
	$tags.each(function() {
		var theTag = $(this).text().compact().trim();
		theTags.push(theTag);
	});
	
	returnData = theTags.join('|');

	return returnData;
}

function getDownloadType($li) {
	var returnData = '';
	returnData = $li.find('a span').text().trim();

	return returnData;
}

function getDownloadSize($li) {
	var returnData;
	var theSize = $li.find('a var').text().trim();
	
	var theKilobytes;
	if (theSize.has('GiB')) {
		theKilobytes = ((theSize.remove('GiB').trim().toNumber()) * 1000000);
	} else if (theSize.has('MB')) {
		theKilobytes = ((theSize.remove('MB').trim().toNumber()) * 1000);
	}
	
	returnData = theKilobytes;

	return returnData;
}

function getDownloadLink($li) {
	var returnData = '';
	returnData = window.location.origin + $li.find('a').attr('href');

	return returnData;
}


function getPreferredDownload($thePage) {
	var $downloadOptions = $thePage.find('ul#video-download-format li');
	
	var options = [];
	
	$downloadOptions.each(function() {
		var downloadType = getDownloadType($(this));
		var downloadSize = getDownloadSize($(this));
		var downloadLink = getDownloadLink($(this));
		
		var downloadOption = {
			type: downloadType,
			size: downloadSize,
			link: downloadLink
		};
		
		options.push(downloadOption);
	});
	
	options = options.sortBy(function(n) {
		return n.size;
	}, true);
	
	var bestOption;
	
	//Get the 720p MP4 video, if it exists
	
	bestOption = options.find(function(n) {
		//console.log('\t' + 'Get the 720p MP4 video, if it exists');
		return (n.type.has('720') || n.link.has('720')) && (n.type.toLowerCase().has('mp4') || n.link.toLowerCase().has('mp4'));
	});
	
	//Get any 720p video, if it exists
	
	if (bestOption == undefined) {
		//console.log('\t' + 'Get any 720p video, if it exists');
		bestOption = options.find(function(n) {
			return n['type'].has('720') || n['link'].has('720'); 
		});
	}
	
	//Get any 1080p video, if it exists
	
	if (bestOption == undefined) {
		//console.log('\t' + 'Get any 1080p video, if it exists');
		bestOption = options.find(function(n) {
			return n['type'].has('1080') || n['link'].has('1080'); 
		});
	}
	
	//Get the biggest file
	
	if (bestOption == undefined) {
		//console.log('\t' + 'Get the biggest file');
		bestOption = options.first();
	}
	
	//console.log(bestOption);
	var theBestOptionString = bestOption.type + '\t' + bestOption.size + '\t' + bestOption.link;
	
	return theBestOptionString;
}

function calculateRating(likes, dislikes) {
	var returnData;
	
	var totalVotes = likes + dislikes;
	var theRating = ((likes/totalVotes) * 10).round(2);
	
	returnData = theRating;
	
	return returnData;
}