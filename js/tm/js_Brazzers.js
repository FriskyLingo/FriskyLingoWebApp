/// <reference path="../../libs/jquery/jquery-1.8.2.js" />
/// <reference path="../../libs/jquery/jquery-ui.js" />
/// <reference path="../../Scripts/moment.js" />
/// <reference path="../../Scripts/sugar.js" />


$('head').append(
    '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css">' +
    '<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css" rel="stylesheet" type="text/css">' +
    '<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/cupertino/jquery-ui.min.css" rel="stylesheet" type="text/css">'
);

var siteTypes = 
[
    { site: 'assesinpublic', siteType: 'AIP', siteTitle: 'Asses In Public' },
    { site: 'busty&real', siteType: 'BAR', siteTitle: 'Busty & Real' },
    { site: 'bigbuttslikeitbig', siteType: 'BBLIB', siteTitle: 'Big Butts Like It Big' },
    { site: 'brazzersexxtra', siteType: 'BEX', siteTitle: 'Brazzers Exxtra' },
    { site: 'babygotboobs', siteType: 'BGB', siteTitle: 'Baby Got Boobs' },
    { site: 'bigtitsatschool', siteType: 'BTAS', siteTitle: 'Big Tits at School' },
    { site: 'bigtitsatwork', siteType: 'BTAW', siteTitle: 'Big Tits at Work' },
    { site: 'bigtitsinsports', siteType: 'BTIS', siteTitle: 'Big Tits In Sports' },
    { site: 'bigtitsinuniform', siteType: 'BTIU', siteTitle: 'Big Tits In Uniform' },
    { site: 'bustyz', siteType: 'BTZ', siteTitle: 'Bustyz' },
    { site: 'bigwetbutts', siteType: 'BWB', siteTitle: 'Big Wet Butts' },
    { site: 'brazzersvault', siteType: 'BZV', siteTitle: 'Brazzers Vault' },
    { site: 'doctoradventures', siteType: 'DA', siteTitle: 'Doctor Adventures' },
    { site: 'dirtymasseur', siteType: 'DM', siteTitle: 'Dirty Masseur' },
    { site: 'daywithapornstar', siteType: 'DWP', siteTitle: 'Day With A Pornstar' },
    { site: 'hotandmean', siteType: 'HAM', siteTitle: 'Hot And Mean' },
    { site: 'hotchicksbigasses', siteType: 'HCBA', siteTitle: 'Hot Chicks Big Asses' },
    { site: 'jugfuckers', siteType: 'JF', siteTitle: 'JugFuckers' },
    { site: 'mommygotboobs', siteType: 'MGB', siteTitle: 'Mommy Got Boobs' },
    { site: 'momsincontrol', siteType: 'MIC', siteTitle: 'Moms in control' },
    { site: 'milfslikeitbig', siteType: 'MLIB', siteTitle: 'Milfs Like it Big' },
    { site: 'pornstarslikeitbig', siteType: 'PLIB', siteTitle: 'Pornstars Like it Big' },
    { site: 'realwifestories', siteType: 'RWS', siteTitle: 'Real Wife Stories' },
    { site: 'shesgonnasquirt', siteType: 'SGS', siteTitle: 'Shes Gonna Squirt' },
    { site: 'sexproadventures', siteType: 'SPA', siteTitle: 'SexPro Adventures' },
    { site: 'teenslikeitbig', siteType: 'TLIB', siteTitle: 'Teens Like It Big' },
    { site: 'zzseries', siteType: 'ZZS', siteTitle: 'ZZ Series' }
];

var bData = [];
var alreadyDownloadedSceneIds = [];

$(document).ready(function () {
    console.log('document is ready!');

    //Set tab title
    document.title = 'B-Scene';


    //Hide/remove content on page
    hideAndRemoveElements();


    //Get the scene data
    $.when(getJsonFile('data/bData.json')).done(function (data) {
        bData = data;
        console.log('bData: [' + bData.length + ']');
    });
    

    //Get scene IDs that have already been downloaded
    $.when(getTextFile('data/bDownloadedSceneIds.txt')).done(function(data) {
        alreadyDownloadedSceneIds = data.paragraphs();
        console.log('alreadyDownloadedSceneIds: [' + alreadyDownloadedSceneIds.length + ']');

        //Create new UI elements
        createUiElements();
    });
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

    if ($(this).attr('id') === 'btnDryRun') {
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

    var itemsWithRating = bData.findAll(function (item) {
        return item.rating == $('#ddlRating option:selected').val();
    });

    var theFilteredUrls = itemsWithRating.findAll(function (item) {
        return $.inArray(item.sceneId.toString(), alreadyDownloadedSceneIds) < 0;
    });

    var theOutput = [];
    theFilteredUrls.each(function (tfu) {
        theOutput.push(tfu.sceneLink);
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

	var itemsWithRating = [];
    itemsWithRating = bData.findAll(function(item) {
        return item.rating == selectedRating; 
    });
    var itemsWithRatingCount = itemsWithRating.length;


	var theFilteredUrls = [];
    theFilteredUrls = itemsWithRating.findAll(function(item) {
        //return item.siteType == selectedSiteType && item.rating == selectedRating;
        return $.inArray(item.sceneId.toString(), alreadyDownloadedSceneIds) < 0; 
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
                downloadLink: url
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
            loopAndDownload(theFilteredUrls.first());
            theFilteredUrls.removeAt(0);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Loop through links and download links
//////////////////////////////////////////////////////////////////////////////////////////////
function loopAndDownload(theItem) {
    var theDownloadLink = theItem.downloadLink;
    var theSceneLink = theItem.sceneLink;


    var theFileExtensionFromTheLink = theDownloadLink.split('/')[5];
    theFileExtensionFromTheLink = theFileExtensionFromTheLink.first(3);

    var theSceneTitleFromTheLink = theSceneLink.split('/')[6];


    var theAnchor = '#' + theItem.siteType + '__' + theItem.sceneId + '__' + theItem.releaseDate + '__' + theItem.rating + '__' + theSceneTitleFromTheLink + '.' + theFileExtensionFromTheLink;
    console.log(theItem.downloadLink + theAnchor);
    window.open(theItem.downloadLink + theAnchor, '_blank');
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
        'Anal',
        'Braces',
        'Double Penetration',
        'Foot Fetish',
        'Interracial',
        'Lesbian',
        'Squirting',
        'Threesome BBG',
        'Virtual Reality',
        'VR Porn'
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
    console.log('creating UI elements');
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
    var $typeDropdown = createDropdown(theOptions, 'site-type', 'ddlSiteType', false);
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

    var $startFromDropdown = createDropdown(theOptions, 'start-from', 'ddlStartFrom', false);
    $startFromDropdown.appendTo($tr1td4);


    ///////////////////////////////////////////////////////////
    //Create ratings dropdown
    ///////////////////////////////////////////////////////////
    theOptions = [];
    Number.range(9.0, 10.0).every(0.1, function (n) {
        var theOption = {
            value: n.round(1).format(1),
            text: n.round(1).format(1)
        };

        theOptions.push(theOption);
    });
    var $ratingsDropdown = createDropdown(theOptions, 'select-rating', 'ddlRating', false);
    $ratingsDropdown.appendTo($tr2td2);
    //Set default rating value in dropdown
    $ratingsDropdown.find('option[value="9.5"]').attr('selected', true);


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

    var $intervalTypeDropdown = createDropdown(theOptions, 'interval-type', 'ddlIntervalType', false);
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
// Get json file using AJAX
//////////////////////////////////////////////////////////////////////////////////////////////
function getJsonFile(filePath) {
    return $.ajax({
        dataType: 'json',
        url: 'http://www.friskylingo.com/' + filePath,
        crossDomain: true,
        type: 'GET'
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('FAIL!!!');
        console.log('\t' + textStatus);
        console.log('\t' + errorThrown);
        console.log(jqXHR);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Hide/Remove elements on page
//////////////////////////////////////////////////////////////////////////////////////////////
function hideAndRemoveElements() {
    console.log('hiding/removing data elements');
    //$('div#wrapper-footer, div.social-bar, div#wrapper, div#social-media-box, td#sideBar, div#feedback-tab').remove();
    //$('div.right_side, div#tabs_member_options, div.box_headline_main, div#more_porn_videos_content_area, div#pagination_more_porn_videos').remove();
    //$('div.box_headline_main, div#live_highlights_module_content_area, div#scene_synopsis, div#download_photo_sets, div.blue-bubble').remove();
    //$('div#video_tab.pictures_tab').hide();
    //$('div#fivemin').parent('div').remove();
    //$('td.clip-section').remove();
    $('div, header, footer').remove();
    $('body').css('background', '');
}

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
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}