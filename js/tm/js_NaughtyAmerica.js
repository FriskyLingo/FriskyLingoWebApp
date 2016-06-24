$("head").append(
    '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css">' +
    '<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css" rel="stylesheet" type="text/css">' +
    '<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/cupertino/jquery-ui.min.css" rel="stylesheet" type="text/css">'
);

var siteTypes = 
[
    {site: "2chickssametime", siteType: "2CST", siteTitle: "2 Chicks Same Time"},
    {site: "americandaydreams", siteType: "ADD", siteTitle: "American Daydreams"},
    {site: "assmasterpiece", siteType: "AM", siteTitle: "Ass Masterpiece"},
    {site: "diaryofamilf", siteType: "DOM", siteTitle: "Diary of a Milf"},
    {site: "diaryofananny", siteType: "DON", siteTitle: "Diary of a Nanny"},
    {site: "dirtywivesclub", siteType: "NADWC", siteTitle: "Dirty Wives Club"},
    {site: "fasttimes", siteType: "FTNA", siteTitle: "Fast Times"},
    {site: "housewife1on1", siteType: "H1ON1", siteTitle: "Housewife 1 on 1"},
    {site: "ihaveawife", siteType: "IHW", siteTitle: "I Have a Wife"},
    {site: "latinadultery", siteType: "LAD", siteTitle: "Latin Adultery"},
    {site: "mydadshotgirlfriend", siteType: "MDHG", siteTitle: "My Dad's Hot Girlfriend"},
    {site: "myfirstsexteacher", siteType: "MFST", siteTitle: "My First Sex Teacher"},
    {site: "myfriendshotgirl", siteType: "MFHG", siteTitle: "My Friend's Hot Girl"},
    {site: "mygirlfriendsbustyfriend", siteType: "MGBF", siteTitle: "My Girlfriend's Busty Friend"},
    {site: "mynaughtymassage", siteType: "MNM", siteTitle: "My Naughty Massage"},
    {site: "mysistershotfriend", siteType: "MSHF", siteTitle: "My Sister's Hot Friend"},
    {site: "mywifeshotfriend", siteType: "MWHF", siteTitle: "My Wife's Hot Friend"},
    {site: "naughtyathletics", siteType: "NATH", siteTitle: "Naughty Athletics"},
    {site: "naughtyoffice", siteType: "NO", siteTitle: "Naughty Office"},
    {site: "naughtyrichgirls", siteType: "NRG", siteTitle: "Naughty Rich Girls"},
    {site: "neighboraffair", siteType: "NAF", siteTitle: "Neighbor Affair"},
    {site: "tonightsgirlfriend", siteType: "NATNGF", siteTitle: "Tonight's Girlfriend"},
    {site: "wivesonvacation", siteType: "WOV", siteTitle: "Wives on Vacation"},
    {site: "myfriendshotmom", siteType: "MFHM", siteTitle: "My Friend's Hot Mom"},
    {site: "mynaughtylatinmaid", siteType: "MNLM", siteTitle: "My Naughty Latin Maid"},
    {site: "mywifeismypornstar", siteType: "MWMP", siteTitle: "My Wife Is My Pornstar"},
    {site: "naughtyamerica", siteType: "NA", siteTitle: "Naughty America"},
    {site: "naughtybookworms", siteType: "NBW", siteTitle: "Naughty Bookworms"},
    {site: "naughtycountrygirls", siteType: "NCG", siteTitle: "Naughty Country Girls"},
    {site: "naughtyflipside", siteType: "NFS", siteTitle: "Naughty Flipside"},
    {site: "naughtyweddings", siteType: "NW", siteTitle: "Naughty Weddings"},
    {site: "seducedbyacougar", siteType: "SBC", siteTitle: "Seduced By A Cougar"},
    {site: "socalcoeds", siteType: "SCC", siteTitle: "Socal Coeds"},
    {site: "thepassenger", siteType: "PGR", siteTitle: "The Passenger"}
];

var alreadyDownloadedFiles = [];
var downloadedSceneIds = [];
var excludedSceneIdsFromFile = [];

$(document).ready(function() {
    if (window.location.pathname.indexOf('sites') > -1) {
		document.title = 'NA-Site';
        $('div').hide();
        
        var theSite = replaceAll(window.location.pathname.replace('sites', ''), '/', '').trim();
        //console.log(theSite);

        //////////////////////////////////////////////////////////////////////////////////////////////
        // Get the "type" from the site
        //////////////////////////////////////////////////////////////////////////////////////////////
        var result = $.grep(siteTypes, function(e){ return e.site == theSite; });
        var theType = 'UNK';

        if (result.length == 1) {
            theType = result[0].siteType;
        }

        $('div#content table:eq(0), div#wrapper-footer, div.social-bar, div#wrapper, div#social-media-box, td#sideBar, div#feedback-tab').hide();
        $('div[style*="width:700px"]').css('width', '1000px');
        $('div[style*="width:220px"]').css('width', '520px');

        //console.log(GM_getValue('excludedDownloads').join('\n'));
        
        /*
        //Find all the scene links
        var $sceneLinks = $('p.pornstar-name>a');

        var sceneLinks = [];

        if (GM_getValue('sceneLinks' + theType)) {
            sceneLinks = GM_getValue('sceneLinks' + theType);
        }

        $sceneLinks.each(function() {
            if (sceneLinks.indexOf($(this).attr('href')) < 0) {
                sceneLinks.push($(this).attr('href'));
            }
        });

        GM_setValue('sceneLinks' + theType, sceneLinks);

        //logOutput('sceneLinks' + theType);
        */

        //////////////////////////////////////////////////////////////////////////////////////////////
        // Go to the next scene
        //////////////////////////////////////////////////////////////////////////////////////////////
        /*
        var timer = null;

        var clickNextScene = function() {
            //Wait n seconds then click the "next scene" link
            window.location.href = $('div#pagination_more_porn_videos:first').find('a.next').attr('href');

            timer = setTimeout(clickNextScene, 1000);
        };

        if ($('div#pagination_more_porn_videos:first').find('a.next').length > 0) {
            clickNextScene();
        } else {
            clearTimeout(timer);
            logOutput('sceneLinks' + theType);
        }
        */
    } else if (window.location.pathname.indexOf('scene') > -1) {
		document.title = 'NA-Scene';
        $('div#wrapper-footer, div.social-bar, div#wrapper, div#social-media-box, td#sideBar, div#feedback-tab').remove();
        $('div.right_side, div#tabs_member_options, div.box_headline_main, div#more_porn_videos_content_area, div#pagination_more_porn_videos').remove();
        $('div.box_headline_main, div#live_highlights_module_content_area, div#scene_synopsis, div#download_photo_sets, div.blue-bubble').remove();
        $('div#video_tab.pictures_tab').hide();
        $('div#fivemin').parent('div').remove();
        $('td.clip-section').remove();

        $('div#container').css('float', 'left');

        $('div#player_standard_def_img').width(700); // Units are assumed to be pixels
        $('div#player_standard_def_img').height(394);

        //var $newDiv = $('<div>').text('SOME TEST TEXT').css('background-color','white').css('color','red').width(300).css('z-index',99);
        //$newDiv.appendTo('body');


        var customSiteTypes = $.grep(siteTypes, function(e){
            return e.siteType == 'NO';
        });
        //var customSiteTypes = $.grep(siteTypes, function(e){ return e.siteType == 'H1ON1'; });
        
        //GM_setValue('sceneLinksProcessed' + 'H1ON1', []);
        //GM_setValue('sceneLinksWithRatings' + 'H1ON1', []);

        var doProcess = false;
        var doDownload = true;
        
        if (doProcess) {
            var $aboutThisFantasy = $('div#about_this_fantasy').clone();
            var $divImages = $('div.actor_large_image').parent('div').clone();

            $('div#container>table').remove();

            $('body').append([$aboutThisFantasy, $divImages]);

            $aboutThisFantasy.position({
                my: 'left top',
                at: 'right top',
                of: $('div#player_standard_def')
            }).css('background-color','white');

            $divImages.position({
                my: 'right top',
                at: 'right bottom',
                of: $aboutThisFantasy
            }).css('background-color','white');

            $('html').css('height',750);

            //$('div#content table:eq(0), div#wrapper-footer, div.social-bar, div#wrapper, div#social-media-box, td#sideBar, div#feedback-tab').remove();
            //$('div#video_player_area').remove();
            //$('div#actor').closest('table').remove();

            ///*
            
            $('div#actor').hide();
            
            var newDiv = $(document.createElement('div')); 
            newDiv.html('hello there');
            newDiv.dialog();



            var xhrs = [];
            var theMax = 650;
            var counter = 0;
            var theMaxSites = 20;
            var counterSites = 0;
            //var sceneLinksWithRatings = [];
            //var sceneLinksProcessed = [];
            var sceneLinks = [];




            $.each(customSiteTypes, function(j, item) {
                console.log('item.siteType' + '\t' + item.siteType);

                //////////////////////////////////////////////////////////////////////////////////////////////
                // Loop through each scene link saved in the data store
                //////////////////////////////////////////////////////////////////////////////////////////////
                sceneLinks = [];
                if (GM_getValue('sceneLinks' + item.siteType)) {
                    sceneLinks = GM_getValue('sceneLinks' + item.siteType);
                    //console.log('\t' + 'sceneLinks.length' + '\t' + sceneLinks.length);
                }

                //console.log('\t' + 'counterSites' + '\t' + counterSites);
                if (counterSites < theMaxSites) {
                    counterSites = counterSites + 1;

                    //////////////////////////////////////////////////////////////////////////////////////////////
                    // Get the data store
                    //////////////////////////////////////////////////////////////////////////////////////////////
                    var sceneLinksWithRatings = [];
                    if (GM_getValue('sceneLinksWithRatings' + item.siteType)) {
                        sceneLinksWithRatings = GM_getValue('sceneLinksWithRatings' + item.siteType);
                    }

                    var sceneLinksProcessed = [];
                    if (GM_getValue('sceneLinksProcessed' + item.siteType)) {
                        sceneLinksProcessed = GM_getValue('sceneLinksProcessed' + item.siteType);
                    }

                    var sceneLinksCount = sceneLinks.length;
                    var sceneLinksWithRatingsCount = sceneLinksWithRatings.length;
                    //console.log('\t' + 'sceneLinksCount' + '\t' + sceneLinksCount);
                    //console.log('\t' + 'sceneLinksWithRatingsCount' + '\t' + sceneLinksWithRatingsCount);


                    $.each(sceneLinks, function(i, theUrl) {
                        if (counter < sceneLinksCount && counter < theMax) {
                            counter = counter + 1;
                            
                            //console.log('sceneLinksProcessed' + item.siteType + ' length: ' + GM_getValue('sceneLinksProcessed' + item.siteType).length);

                            if (GM_getValue('sceneLinksProcessed' + item.siteType).indexOf(theUrl) < 0) {
                                //console.log('\t' + '\t' + 'i' + '\t' + i);
                                //console.log('\t' + '\t' + 'theUrl' + '\t' + theUrl);
                                //console.log('\t' + '\t' + 'counter' + '\t' + counter);
                                //console.log('\t' + '\t' + 'theMax' + '\t' + theMax);



                                var xhr = $.ajax({
                                    url: theUrl,
                                    type: 'GET'
                                }).done(function(data) {
                                    newDiv.html(item.siteType + ': ' + '[' + (i + 1) + '] of [' + sceneLinksCount + '] - [' + sceneLinksWithRatingsCount + ']');
                                    //console.log('\t' + '\t' + 'newDive.html' + '\t' + newDiv.html());

                                    var $thePage = $(data);
                                    
                                    // Get the scene rating
                                    var theRating = getSceneRating($thePage.find('p.scene_rating_text>span'));
                                    
                                    // Get the scene actors
                                    var theActors = getSceneActors($thePage.find('div.new_title').find('a[href*="pornstar"]'));

                                    // Get the scene file name that I would be downloading
                                    var theFileName = getSceneFileName($(document).find('div#video_download').find('a'));

                                    // Get the scene release date
                                    var theReleaseDate = getSceneReleaseDate($thePage.find('p.site-name:contains("Release")'), 'MMMM D, YYYY');

                                    //////////////////////////////////////////////////////////////////////////////////////////////
                                    // Create the line
                                    //////////////////////////////////////////////////////////////////////////////////////////////
                                    var theLineData = [item.siteType, theUrl, theRating, theFileName, theActors, theReleaseDate];
                                    var theLine = theLineData.join('\t').replace('\n', ' ');
                                    //console.log('\t' + '\t' + 'theLine' + '\t' + theLine);

                                    if (GM_getValue('sceneLinksWithRatings' + item.siteType).indexOf(theLine) < 0) {
                                        sceneLinksWithRatings.push(theLine);
                                    }

                                    if (GM_getValue('sceneLinksProcessed' + item.siteType).indexOf(theUrl) < 0) {
                                        sceneLinksProcessed.push(theUrl);
                                    }

                                    GM_setValue('sceneLinksProcessed' + item.siteType, sceneLinksProcessed);
                                    GM_setValue('sceneLinksWithRatings' + item.siteType, sceneLinksWithRatings);
                                    
                                    //console.log('sceneLinksProcessed' + item.siteType + ' length: ' + GM_getValue('sceneLinksProcessed' + item.siteType).length);
                                });

                                xhrs.push(xhr);
                            }
                        }
                    });
                }
            });



            $.when.apply($, xhrs).done(function(){
                newDiv.html('all are complete');

                $.each(customSiteTypes, function(p, site) {
                    //if (GM_getValue('sceneLinksWithRatings' + site.siteType).length > 0) {
                    console.log(site.siteType + ': ' + GM_getValue('sceneLinksWithRatings' + site.siteType).length);
                    //}
                    //console.log('$.each(siteTypes, function(p, site) {' + '\t' + site.siteType);
                    //console.log(site.siteType + ': ' + GM_getValue('sceneLinksWithRatings' + site.siteType).length);
                    //logOutput('sceneLinksWithRatings' + site.siteType);
                });
            });
        } else {
            $('div#actor').hide();

            //Create new UI elements
            createUiElements();

        }
        //*/
        alreadyDownloadedFiles = GM_getResourceText('downloadedFiles').paragraphs();
        downloadedSceneIds = GM_getResourceText('downloadedSceneIds').paragraphs();
        excludedSceneIdsFromFile = GM_getResourceText('excludedSceneIds').paragraphs();
		
		console.log('alreadyDownloadedFiles: ' + alreadyDownloadedFiles.length);
		console.log('downloadedSceneIds: ' + downloadedSceneIds.length);
		console.log('excludedSceneIdsFromFile: ' + excludedSceneIdsFromFile.length);
		
        //console.log('excludedSceneIdsFromFile: ' + excludedSceneIdsFromFile.length);
    }
    
    /*
    console.log(GM_getValue('naughtyAmericaSceneData').length);
    console.log(GM_getValue('naughtyAmericaSceneData').first());
    console.log(GM_getValue('downloadedFiles').length);
    console.log(GM_getValue('downloadedFiles').first());
    */
});



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// DOM events
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// "Process" and/or "Dry Run" button click
//////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', '#btnProcess, #btnDryRun', function (event) {
    event.preventDefault();

    var isDryRun = false;

    if ($(this).attr('id') == 'btnDryRun') {
        isDryRun = true;
        console.log('Dry Run button clicked');
        console.log('##################################################\nPERFORMING DRY RUN - NOTHING WILL BE DOWNLOADED\n##################################################');
    } else {
        console.log('Process button clicked');
    }

    //Perform downloading
    doDownload($(this).attr('id'), isDryRun);
});

//////////////////////////////////////////////////////////////////////////////////////////////
// "Download Manually" button click
//////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', '#btnDownloadManually', function (event) {
    event.preventDefault();

    console.log('"Download Manually" button clicked');

    var theDownloadUrl = $('#textDownloadManually').val();
    var theMultDownloadUrls = $('#textareaDownloadMultiple').val();


    if (theDownloadUrl.length > 0) {
        //Download a single URL
        loopAndDownload(theDownloadUrl);
    } else if (theMultDownloadUrls.length > 0) {
        //Download multiple URLs
        doDownload($(this).attr('id'), false);
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
// "Print URLs" button click
//////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', '#btnPrintUrls', function (event) {
    event.preventDefault();

    var sceneLinksWithRatings = GM_getValue('naughtyAmericaSceneData');
    var excludedDownloads = GM_getValue('excludedDownloads');


    var excludedSceneIdsFromStorage = [];
    excludedDownloads.each(function (exc) {
        var excSceneId = exc.anchorNoExtension.split('__')[1];

        if (isNumeric(excSceneId)) {
            excludedSceneIdsFromStorage.push(excSceneId.toString());
        }
    });


    var itemsWithRating = sceneLinksWithRatings.findAll(function (item) {
        return item.sceneRating == $('#ddlRating option:selected').val();
    });
    var itemsWithRatingCount = itemsWithRating.length;


    var theFilteredUrls = itemsWithRating.findAll(function (item) {
        //return item.siteType == selectedSiteType && item.rating == selectedRating;
        return $.inArray(item.sceneId.toString(), excludedSceneIdsFromFile) < 0 &&
            $.inArray(item.sceneId.toString(), excludedSceneIdsFromStorage) < 0 &&
            $.inArray(item.sceneId.toString(), downloadedSceneIds) < 0;
    });

    var theOutput = [];
    theFilteredUrls.each(function (tfu) {
        theOutput.push(tfu.sceneUrl);
    });
    console.log(theOutput.join('\n'));
});

//////////////////////////////////////////////////////////////////////////////////////////////
// "Print Excluded Scene IDs" button click
//////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', '#btnPrintExcludedSceneIds', function (event) {
    event.preventDefault();

    var excludedDownloads = GM_getValue('excludedDownloads');

    var excludedSceneIdsFromStorage = [];
    excludedDownloads.each(function (exc) {
        var excSceneId = exc.anchorNoExtension.split('__')[1];

        if (isNumeric(excSceneId)) {
            excludedSceneIdsFromStorage.push(excSceneId.toString());
        }
    });

    var allExcludedSceneIds = excludedSceneIdsFromFile.union(excludedSceneIdsFromStorage);

    var theOutput = [];
    allExcludedSceneIds.each(function (sceneId) {
        theOutput.push(sceneId);
    });
    console.log(theOutput.join('\n'));
});



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Download stuff
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// DOWNLOAD
//////////////////////////////////////////////////////////////////////////////////////////////
function doDownload(elementId, isDryRun) {
    var selectedSiteType = $('#ddlSiteType option:selected').val();
    var selectedRating = $('#ddlRating option:selected').val();
    var selectedStartFrom = $('#ddlStartFrom option:selected').val();
    var selectedIntervalType = $('#ddlIntervalType option:selected').val();
    var theTimeInterval = $('#textInterval').val();
    var theMaxItems = $('#textMaxItems').val();
    var theDownloadUrl = $('#textDownloadManually').val();
    var theMultDownloadUrls = $('#textareaDownloadMultiple').val();

    if (theMaxItems.length === 0) {
        theMaxItems = 1000;
    }

    var sceneLinksWithRatings = [];
	if (GM_getValue('naughtyAmericaSceneData')) {
		sceneLinksWithRatings = GM_getValue('naughtyAmericaSceneData');
	}
	
	var excludedDownloads = [];
	if (GM_getValue('excludedDownloads')) {
		excludedDownloads = GM_getValue('excludedDownloads');
	}


    var excludedSceneIdsFromStorage = [];
    excludedDownloads.each(function(exc) {
        var excSceneId = exc.anchorNoExtension.split('__')[1];

        if (isNumeric(excSceneId)) {
            excludedSceneIdsFromStorage.push(excSceneId.toString());
        }
    });


	var itemsWithRating = [];
	
    itemsWithRating = sceneLinksWithRatings.findAll(function(item) {
        return item.sceneRating == selectedRating; 
    });
    var itemsWithRatingCount = itemsWithRating.length;


	var theFilteredUrls = [];
	
    theFilteredUrls = itemsWithRating.findAll(function(item) {
        //return item.siteType == selectedSiteType && item.rating == selectedRating;
        return $.inArray(item.sceneId.toString(), excludedSceneIdsFromFile) < 0 &&
			$.inArray(item.sceneId.toString(), excludedSceneIdsFromStorage) < 0 &&
			$.inArray(item.sceneId.toString(), downloadedSceneIds) < 0; 
    });


    var theInterval;

    if ($('#textInterval').val().length === 0) {
        theInterval = (30).seconds();
    } else {
        if (selectedIntervalType == 'ms') {
            theInterval = (parseInt(theTimeInterval)).milliseconds();
        } else if (selectedIntervalType == 's') {
            theInterval = (parseInt(theTimeInterval)).seconds();
        } else if (selectedIntervalType == 'm') {
            theInterval = (parseInt(theTimeInterval)).minutes();
        } else if (selectedIntervalType == 'h') {
            theInterval = (parseInt(theTimeInterval)).hours();
        }
    }


    if (selectedStartFrom == 'beginning') {
        theFilteredUrls = theFilteredUrls.first(theMaxItems);
    } else if (selectedStartFrom == 'end') {
        theFilteredUrls = theFilteredUrls.last(theMaxItems);
    }

    if (elementId == 'btnDownloadManually' && theMultDownloadUrls.length > 0) {
        theFilteredUrls = [];

        $.each(theMultDownloadUrls.split('\n'), function(i, url) {
            var linkObj = {
                sceneUrl: url
            };
            console.log(url);
            theFilteredUrls.push(linkObj);
        });
    }

    var urlCount = theFilteredUrls.length;
    var currentCount = urlCount;
    console.log('\t' + 'Selected Rating: ' + selectedRating);
    console.log('\t' + 'Unfiltered URL Count: ' + itemsWithRatingCount);
    console.log('\t' + 'Filtered URL Count: ' + urlCount);

    if (!isDryRun) {
        var id = setInterval(downloadIt, theInterval);
    }

    function downloadIt() {
        if (theFilteredUrls.length <= 0) {
            console.log('------FINISHED------');
            clearInterval(id);
        } else {
            currentCount = (urlCount - (theFilteredUrls.length - 1));
            console.log('\nDownloading [' + currentCount + '] of [' + urlCount + ']');
            loopAndDownload(theFilteredUrls.first().sceneUrl);
            theFilteredUrls.removeAt(0);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Loop through links and download links
//////////////////////////////////////////////////////////////////////////////////////////////
function loopAndDownload(theUrl) {
    var totalCounter = 0;
    var excludedCounter = 0;

    //totalCounter = theFilteredUrls.length;
    
    //$.each(theFilteredUrls, function(i, theLink) {    
    var xhr = $.ajax({
        url: theUrl,
        type: 'GET'
    }).done(function(data) {
        console.log('\t' + 'theUrl: ' + theUrl);
            
        //Get a reference to the web page
        var $thePage = $(data);

        //Get the scene genres/tags
        var theSceneTags = getSceneTags($thePage.find('p.site-name').has('strong:contains("Categories")').first().find('a'));
		$.each(theSceneTags.split('|'), function(i, t) {
			scene.addTag(t.trim());
		});
        //console.log(theSceneTags);
            
        //Create the anchor
        var anchor = createTheAnchor($thePage, theUrl);
        console.log('\t' + 'anchor: ' + anchor);
            
        //Determine if the download should be excluded
        var excludeObj = isExcluded(theSceneTags, anchor);
        //console.log(excludeObj);
            
        //If it shouldn't be excluded, download it
        if (!excludeObj.isExcluded) {
            //Get the download link
            var theDownloadLink = getDownloadLink($thePage, anchor);
			scene.downloadUrl = theDownloadLink;
			//console.log(scene);
                
            //console.log('\t' + theDownloadLink.replace(anchor,''));
            //console.log('\t' + theDownloadLink);
                
            //console.log(anchor);
                
            GM_download(theDownloadLink, anchor);
            //window.open(theDownloadLink, '_blank');
        } else {
            console.log('\t\t' + '!!!-EXCLUDED-!!!: [' + excludeObj.exclusionReason + ']');
            excludedCounter = excludedCounter + 1;
        }
    }).fail(function() {
        console.log('FAIL!');
    });

    //xhrs.push(xhr);
    //});
    
    /*
    $.when.apply($, xhrs).done(function(){
        console.log('all are complete');
        console.log('Total Items:\t[' + totalCounter.toString() + ']' + '\n' + 
                    'Excluded Items:\t[' + excludedCounter.toString() + ']' + '\n' + 
                    'Should Have:\t[' + (totalCounter - excludedCounter).toString() + ']');
    });
    */
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Click the download link for the appropriate video file
//////////////////////////////////////////////////////////////////////////////////////////////
function downloadTheFile(fileName, anchor) {
    var $aVideoLink = $('a[href*="' + fileName + '"]');
    var theDownloadLink = $aVideoLink.attr('href') + '#' + anchor;

    //console.log(theDownloadLink);
    window.location.href = theDownloadLink;
}




//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Download preparation
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// Determine if the video should be excluded
//////////////////////////////////////////////////////////////////////////////////////////////
function isExcluded(theSceneTags, theAnchor) {
    var excludeObj = {
        isExcluded: false,
        exclusionReason: ''
    };

    var excludedTags = [
        "Anal",
        "Braces",
        "Double Penetration",
        "Foot Fetish",
        "Interracial",
        "Lesbian",
        "Squirting",
        "Threesome BBG",
        "Virtual Reality",
        "VR Porn"
    ];

    $.each(theSceneTags.split('|'), function (i, theTag) {
        //console.log('\t' + theTag);

        if (excludeObj.isExcluded === false) {
            if (excludedTags.indexOf(theTag) > -1) {
                excludeObj.isExcluded = true;
                excludeObj.exclusionReason = theTag;
                return false;
            }
        }
    });

    if (excludeObj.isExcluded) {
        var excludedObj = {
            anchor: theAnchor,
            anchorNoExtension: theAnchor.replace(/\.[^/.]+$/, ''),
            reason: excludeObj.exclusionReason
        };

        var excludedDownloads = [];

        if (GM_getValue('excludedDownloads')) {
            excludedDownloads = GM_getValue('excludedDownloads');

            if (excludedDownloads.indexOf(excludedObj) < 0) {
                excludedDownloads.push(excludedObj);
            }
        } else {
            excludedDownloads.push(excludedObj);
        }

        GM_setValue('excludedDownloads', excludedDownloads);
    }

    return excludeObj;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Create the anchor
//////////////////////////////////////////////////////////////////////////////////////////////
function createTheAnchor($selector, theLink) {
    // Get the scene ID
    var theSceneId = getSceneID(theLink);
	scene.sceneId = theSceneId.toNumber();
    //console.log('Scene ID: [' + theSceneId + ']');

    // Get the scene rating
    var theSceneRating = getSceneRating($selector.find('p.scene_rating_text>span'));
	scene.rating = theSceneRating.toNumber();
    //console.log('Scene Rating: [' + theSceneRating + ']');

    // Get the scene actors
    var theSceneActors = getSceneActors($selector.find('div.new_title').find('a[href*="pornstar"]'));
	$.each(theSceneActors.split('|'), function(i, a) {
		scene.addPerformer(a.trim());
	});
    //console.log('Scene Actors: [' + theSceneActors + ']');

    // Get the scene file name that I would be downloading
    var theSceneFileName = getSceneFileName($selector.find('div#video_download').find('a'));
	scene.siteFileName = theSceneFileName;
    //console.log('Scene File Name: [' + theSceneFileName + ']');

    // Get the scene release date
    var theSceneReleaseDate = getSceneReleaseDate($selector.find('p.site-name:contains("Release")'), 'MMMM D, YYYY');
	scene.releaseDate = theSceneReleaseDate;
    //console.log('Scene Release Date: [' + theSceneReleaseDate + ']');

    // Get the scene site name
    var theSceneSiteName = getSceneSiteName($selector.find('p.scene_site_title').find('a'));
	scene.site = theSceneSiteName;
    //console.log('Scene Site Name: [' + theSceneSiteName + ']');

    // Get the scene type
    var theSceneType = getSceneType(theSceneSiteName);
	scene.siteType = theSceneType;
    //console.log('Scene Type: [' + theSceneType + ']');

    var theAnchor = theSceneType + '__' + theSceneId + '__' + theSceneReleaseDate + '__' + theSceneRating + '__' + theSceneFileName;
	scene.myFileName = theAnchor;

    //console.log(theAnchor);

    return theAnchor;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the download link
//////////////////////////////////////////////////////////////////////////////////////////////
function getDownloadLink($selector, anchor) {
    // Get the scene file name that I would be downloading
    var theSceneFileName = getSceneFileName($selector.find('div#video_download').find('a'));

    var $aVideoLink = $selector.find('a[href*="' + theSceneFileName + '"]');
    var theDownloadLink = $aVideoLink.attr('href') + '#' + anchor;

    return theDownloadLink;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Create and log the output
//////////////////////////////////////////////////////////////////////////////////////////////
function getVideoFileName(theFileNames) {
    var theFileToDownload = '';
    var filteredFiles = theFileNames;

    //Remove 4K files
    filteredFiles.remove(/.*_4k.*/);

    //Remove 1080p files
    filteredFiles.remove(/.*_1080.*/);

    //Remove WMV standard files
    filteredFiles.remove(/.*_512k.*/);

    if (filteredFiles.findAll(/.*720.mp4/).length > 0) {
        //1st option
        theFileToDownload = filteredFiles.find(/.*720.mp4/);
    } else if (filteredFiles.findAll(/.*720.f4v/).length > 0) {
        //2nd option
        theFileToDownload = filteredFiles.find(/.*720.f4v/);
    } else if (filteredFiles.findAll(/.*_2k.wmv/).length > 0) {
        //3nd option
        theFileToDownload = filteredFiles.find(/.*_2k.wmv/);
    } else if (filteredFiles.findAll(/.*large.*/).length > 0) {
        //4th option
        theFileToDownload = filteredFiles.find(/.*large.*/);
    }

    //console.log('theFileToDownload: [' + theFileToDownload + ']');

    return theFileToDownload;
}



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Get scene information
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene type from the site name
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneType(siteName) {
    var result = $.grep(siteTypes, function(e){ return e.siteTitle == siteName; });
    var theType = 'UNK';

    if (result.length == 1) {
        theType = result[0].siteType;
    }
    
    return theType;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene rating
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneRating($selector) {
    return $selector.text().trim();
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene actors
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneActors($selector) {
    var theActors = $selector.map(function(i, actorElement) {
        return $(actorElement).text().trim();
    }).toArray().join('|').trim();
    
    return theActors;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene file name that I would be downloading
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneFileName($selector) {
    var theFileNames = $selector.map(function(i, fileLink) {
        return $(fileLink).attr('href').match(/[^\/?#]+(?=$|[?#])/);
    }).toArray();

    var theFileName = getVideoFileName(theFileNames);
    
    return theFileName;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene site name
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneSiteName($selector) {
    return $selector.text().trim();
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene genres/tags
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneTags($selector) {
    var theSceneTags = $selector.map(function(i, genreElement) {
        return $(genreElement).text().trim();
    }).toArray().unique().join('|').trim();
    
    return theSceneTags;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene release date
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneReleaseDate($selector, originalDateFormat) {
    var theReleaseDate = $selector.text().replace('Release','').replace('Date','').replace(':','').trim();
    theReleaseDate = moment(theReleaseDate, originalDateFormat).format('YYYY-MM-DD');
    return theReleaseDate;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene ID
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneID(theLink) {
    var theIdWithSlashes = theLink.match(/\/(\d+)\//g)[0];
    var theId = theIdWithSlashes.match(/(\d+)/g)[0];
    return theId;
}


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Create UI elements functions
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// Create dropdown
//////////////////////////////////////////////////////////////////////////////////////////////
function createDropdown(options, className, id, bootstrapIt) {
    //<select name="speed" id="speed">
    var $dropdown = $('<select>').addClass(className).attr('id', id);

    if (bootstrapIt) {
        $dropdown.attr('data-actions-box', 'true').attr('multiple', '');
    }

    $.each(options, function (i, theOption) {
        var $option = $('<option>').val(theOption.value).text(theOption.text);
        $option.appendTo($dropdown);
    });

    return $dropdown;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Create new UI elements
//////////////////////////////////////////////////////////////////////////////////////////////
function createUiElements() {
    var $divSelections = $('<div>').attr('id', 'divSelections');
    var $tblSelections = $('<table>').attr('id', 'tblSelections');

    var $tr1 = $('<tr>').attr('id', 'tr1');
    var $tr1td1 = $('<td>').attr('id', 'tr1td1').html('<b>Site Type: </b>').css('color', '#337AB7');
    var $tr1td2 = $('<td>').attr('id', 'tr1td2').css('padding-left', '20px');
    var $tr1td3 = $('<td>').attr('id', 'tr1td3').html('<b>Start From: </b>').css('color', '#337AB7');
    var $tr1td4 = $('<td>').attr('id', 'tr1td4').css('padding-left', '20px');

    var $tr2 = $('<tr>').attr('id', 'tr2');
    var $tr2td1 = $('<td>').attr('id', 'tr2td1').html('<b>Rating: </b>').css('color', '#337AB7');
    var $tr2td2 = $('<td>').attr('id', 'tr2td2').css('padding-left', '20px');
    var $tr2td3 = $('<td>').attr('id', 'tr2td3').html('<b>Max Items: </b>').css('color', '#337AB7');
    var $tr2td4 = $('<td>').attr('id', 'tr2td4').css('padding-left', '20px');

    var $tr3 = $('<tr>').attr('id', 'tr3');
    var $tr3td1 = $('<td>').attr('id', 'tr3td1').html('<b>Interval: </b>').css('color', '#337AB7');
    var $tr3td2 = $('<td>').attr('id', 'tr3td2').css('padding-left', '20px');
    var $tr3td3 = $('<td>').attr('id', 'tr3td3').html('<b>Interval Type: </b>').css('color', '#337AB7');
    var $tr3td4 = $('<td>').attr('id', 'tr3td4').css('padding-left', '20px');

    var $tr4 = $('<tr>').attr('id', 'tr4');
    var $tr4td1 = $('<td>').attr('id', 'tr4td1').html('<b>Manual Link: </b>').css('color', '#337AB7');
    var $tr4td2 = $('<td>').attr('id', 'tr4td2').css('padding-left', '20px');
    var $tr4td3 = $('<td>').attr('id', 'tr4td3').html('<b>Multiple Links: </b>').css('color', '#337AB7');
    var $tr4td4 = $('<td>').attr('id', 'tr4td4').css('padding-left', '20px');

    $tr4.append([$tr4td1, $tr4td2, $tr4td3, $tr4td4]);
    $tr3.append([$tr3td1, $tr3td2, $tr3td3, $tr3td4]);
    $tr2.append([$tr2td1, $tr2td2, $tr2td3, $tr2td4]);
    $tr1.append([$tr1td1, $tr1td2, $tr1td3, $tr1td4]);

    $tblSelections.append([$tr1, $tr2, $tr3, $tr4]);
    $divSelections.append($tblSelections);
    $divSelections.appendTo('body');


    ///////////////////////////////////////////////////////////
    //Create site type dropdown
    ///////////////////////////////////////////////////////////
    var theOptions = [];
    $.each(siteTypes, function (i, item) {
        var theOption = {
            value: item.siteType,
            text: item.siteTitle
        };

        theOptions.push(theOption);
    });
    var $typeDropdown = createDropdown(theOptions, 'site-type selectpicker', 'ddlSiteType', false);
    $typeDropdown.appendTo($tr1td2);


    ///////////////////////////////////////////////////////////
    //Create "Start From" dropdown
    ///////////////////////////////////////////////////////////
    theOptions = [];
    var opt1 = {
        value: 'beginning',
        text: 'Beginning'
    };

    var opt2 = {
        value: 'end',
        text: 'End'
    };

    theOptions.push(opt1);
    theOptions.push(opt2);

    var $startFromDropdown = createDropdown(theOptions, 'start-from selectpicker', 'ddlStartFrom', false);
    $startFromDropdown.appendTo($tr1td4);


    ///////////////////////////////////////////////////////////
    //Create ratings dropdown
    ///////////////////////////////////////////////////////////
    theOptions = [];
    Number.range(7.0, 10.0).every(0.1, function (n) {
        var theOption = {
            value: n.round(1).format(1),
            text: n.round(1).format(1)
        };

        theOptions.push(theOption);
    });
    var $ratingsDropdown = createDropdown(theOptions, 'select-rating selectpicker', 'ddlRating', false);
    $ratingsDropdown.appendTo($tr2td2);
    //Set default rating value in dropdown
    $ratingsDropdown.find('option[value="7.6"]').attr('selected', true);


    ///////////////////////////////////////////////////////////
    //Create the "Max Items" textbox
    ///////////////////////////////////////////////////////////
    var $maxItemsTextbox = $('<input>')
        .attr('id', 'textMaxItems')
        .attr('name', 'textMaxItems')
        .attr('placeholder', 'max items to process')
        .addClass('form-control input-md');
    $maxItemsTextbox.appendTo($tr2td4);


    ///////////////////////////////////////////////////////////
    //Create the interval textbox
    ///////////////////////////////////////////////////////////
    var $intervalTextbox = $('<input>')
        .attr('id', 'textInterval')
        .attr('name', 'textInterval')
        .attr('placeholder', 'interval')
        .addClass('form-control input-md');
    $intervalTextbox.appendTo($tr3td2);


    ///////////////////////////////////////////////////////////
    //Create the "Download Manually" textbox
    ///////////////////////////////////////////////////////////
    var $textDownloadManually = $('<input>')
        .attr('id', 'textDownloadManually')
        .attr('name', 'textDownloadManually')
        .attr('placeholder', 'manual download link')
        .addClass('form-control input-md');
    $textDownloadManually.appendTo($tr4td2);


    ///////////////////////////////////////////////////////////
    //Create the "Download Multiple Links" textarea
    ///////////////////////////////////////////////////////////
    var $downloadMultipleTextarea = $('<textarea>')
        .attr('id', 'textareaDownloadMultiple')
        .attr('name', 'textareaDownloadMultiple')
        .attr('placeholder', 'download multiple links')
        .attr('rows', '3')
        .addClass('form-control');
    $downloadMultipleTextarea.appendTo($tr4td4);


    ///////////////////////////////////////////////////////////
    //Create "Interval Type" dropdown
    ///////////////////////////////////////////////////////////
    theOptions = [];
    var opt11 = { value: 'ms', text: 'Milliseconds' };
    var opt12 = { value: 's', text: 'Seconds' };
    var opt13 = { value: 'm', text: 'Minutes' };
    var opt14 = { value: 'h', text: 'Hours' };

    theOptions.push(opt11);
    theOptions.push(opt12);
    theOptions.push(opt13);
    theOptions.push(opt14);

    var $intervalTypeDropdown = createDropdown(theOptions, 'interval-type selectpicker', 'ddlIntervalType', false);
    $intervalTypeDropdown.appendTo($tr3td4);

    //Set default interval type value in dropdown
    $intervalTypeDropdown.find('option[value="s"]').attr('selected', true);


    ///////////////////////////////////////////////////////////
    //Create the "Process" button
    ///////////////////////////////////////////////////////////
    var $btnProcess = $('<button>').attr('id', 'btnProcess').attr('type', 'button').addClass('btn btn-primary').text('Process');
    $btnProcess.appendTo('body');

    ///////////////////////////////////////////////////////////
    //Create the "Dry Run" button
    ///////////////////////////////////////////////////////////
    var $btnDryRun = $('<button>').attr('id', 'btnDryRun').attr('type', 'button').addClass('btn btn-info').text('Dry Run');
    $btnDryRun.appendTo('body');

    ///////////////////////////////////////////////////////////
    //Create the "Print URLs" button
    ///////////////////////////////////////////////////////////
    var $btnPrintUrls = $('<button>').attr('id', 'btnPrintUrls').attr('type', 'button').addClass('btn btn-warning').text('Print URLs');
    $btnPrintUrls.appendTo('body');

    ///////////////////////////////////////////////////////////
    //Create the "Download Manually" button
    ///////////////////////////////////////////////////////////
    var $btnDownloadManually = $('<button>').attr('id', 'btnDownloadManually').attr('type', 'button').addClass('btn btn-success').text('Download Manually');
    $btnDownloadManually.appendTo('body');
	
	///////////////////////////////////////////////////////////
    //Create the "Print Excluded Scene IDs" button
    ///////////////////////////////////////////////////////////
    var $btnPrintExcludedSceneIds = $('<button>').attr('id', 'btnPrintExcludedSceneIds').attr('type', 'button').addClass('btn btn-warning').text('Print Excluded Scene IDs');
    $btnPrintExcludedSceneIds.appendTo('body');
}


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Helper functions
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// Create and log the output
//////////////////////////////////////////////////////////////////////////////////////////////
function logOutput(theObjectName) {
    if (GM_getValue(theObjectName)) {
        var output = GM_getValue(theObjectName).join('\n');
        console.log(output);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Determine if object is numeric
//////////////////////////////////////////////////////////////////////////////////////////////
function isNumeric(num){
    return !isNaN(num);
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Functions for replacing all occurrences of a substring in a string
//////////////////////////////////////////////////////////////////////////////////////////////
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}