$("head").append(
    '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"' +
    ' rel="stylesheet" type="text/css">' +
    '<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css"' +
    ' rel="stylesheet" type="text/css">' +
    '<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/cupertino/jquery-ui.min.css"' +
    ' rel="stylesheet" type="text/css">'
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

var showStuff = false;

$(document).ready(function() {
	console.log('v11');
	
    if (window.location.pathname.indexOf('scene') > -1) {
		document.title = 'A-Scene';
		$('div#wrapper-footer, div.social-bar, div#wrapper').remove();
		$('div#social-media-box, td#sideBar, div#feedback-tab').remove();
        $('div.right_side, div#tabs_member_options, div.box_headline_main').remove();
        $('div#more_porn_videos_content_area, div#pagination_more_porn_videos').remove();
        $('div.box_headline_main, div#live_highlights_module_content_area').remove();
        $('div#scene_synopsis, div#download_photo_sets, div.blue-bubble').remove();
        $('div#video_tab.pictures_tab').hide();
        $('div#fivemin').parent('div').remove();
        $('td.clip-section').remove();

        $('div#container').css('float', 'left');

        $('div#player_standard_def_img').width(700); // Units are assumed to be pixels
        $('div#player_standard_def_img').height(394);

        createUiElements();
	} else if (window.location.pathname.indexOf('watch') > -1) {
		$('div, header, footer, aside').toggle(showStuff);
		createUiElements();
    } else {
		document.title = 'NA-Page';
		$('div').toggle(showStuff);
	}
});



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// DOM events
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// "Download Manually" button click
//////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', '#btnDownloadManually', function (event) {
    event.preventDefault();

    console.log('"Download Manually" button clicked');

    var theMultDownloadUrls = $('#textareaDownloadMultiple').val();

    if (theMultDownloadUrls.length > 0) {
        //Download multiple URLs
        doDownload($(this).attr('id'), false);
    }
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Download stuff
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// DOWNLOAD
//////////////////////////////////////////////////////////////////////////////////////////////
function doDownload(elementId, isDryRun) {
    var theMultDownloadUrls = $('#textareaDownloadMultiple').val();

	var theFilteredUrls = [];

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
    console.log('\t' + 'Filtered URL Count: ' + urlCount);

    if (!isDryRun) {
        var theInterval = 2;
        var id = setInterval(downloadIt, theInterval);
    }

    function downloadIt() {
        if (theFilteredUrls.length <= 0) {
            console.log('------FINISHED------');
            clearInterval(id);
        } else {
            currentCount = (urlCount - (theFilteredUrls.length - 1));
            console.log('\nDownloading [' + currentCount + '] of [' + urlCount + ']');
            console.log(theFilteredUrls.first().sceneUrl);
            var theUrl = theFilteredUrls.first().sceneUrl.split('#')[0];
            var theAnchor = theFilteredUrls.first().sceneUrl.split('#')[1];
            loopAndDownload(theUrl, theAnchor);
            theFilteredUrls.removeAt(0);
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Loop through links and download links
//////////////////////////////////////////////////////////////////////////////////////////////
function loopAndDownload(theUrl, theAnchor) {  
    var xhr = $.ajax({
        url: theUrl,
        type: 'GET'
    }).done(function(data) {
        console.log('\t' + 'theUrl: ' + theUrl);
            
        //Get a reference to the web page
        var $thePage = $(data);

        //Create the anchor
        console.log('\t' + 'anchor: ' + theAnchor);
            
        //Get the download link
        var theDownloadLink = getDownloadLink($thePage, theAnchor);
		scene.downloadUrl = theDownloadLink;
		console.log(scene);
                
        //GM_download(theDownloadLink, theAnchor);
        window.open(theDownloadLink);
		console.log('\t' + 'theDownloadLink: ' + theDownloadLink);
    }).fail(function() {
        console.log('FAIL!');
    });

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
// Get the download link
//////////////////////////////////////////////////////////////////////////////////////////////
function getDownloadLink($selector, anchor) {
    // Get the scene file name that I would be downloading
    var theSceneFileName = getSceneFileName($selector.find('div#video_download').find('a'));
    var theExtension = theSceneFileName.split('.')[1];

    var $aVideoLink = $selector.find('a[href*="' + theSceneFileName + '"]');
    var theDownloadLink = $aVideoLink.attr('href') + '#' + anchor + '.' + theExtension;

    return theDownloadLink;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the file name to download
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

//////////////////////////////////////////////////////////////////////////////////////////////
// Get the scene file name that I would be downloading
//////////////////////////////////////////////////////////////////////////////////////////////
function getSceneFileName($selector) {
    var theFileNames = $selector.map(function (i, fileLink) {
        return $(fileLink).attr('href').match(/[^\/?#]+(?=$|[?#])/);
    }).toArray();

    var theFileName = getVideoFileName(theFileNames);

    return theFileName;
}

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Create UI elements functions
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//////////////////////////////////////////////////////////////////////////////////////////////
// Create new UI elements
//////////////////////////////////////////////////////////////////////////////////////////////
function createUiElements() {
    var $divSelections = $('<div>').attr('id', 'divSelections');
    var $tblSelections = $('<table>').attr('id', 'tblSelections').css('width', '90%');

    var $tr4 = $('<tr>').attr('id', 'tr4');
    var $tr4td4 = $('<td>').attr('id', 'tr4td4').css('padding-left', '20px');

    $tr4.append([$tr4td4]);

    $tblSelections.append([$tr4]);
    $divSelections.append($tblSelections);
    $divSelections.appendTo('body');



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
    //Create the "Download Manually" button
    ///////////////////////////////////////////////////////////
    var $btnDownloadManually = $('<button>')
        .attr('id', 'btnDownloadManually')
        .attr('type', 'button')
        .addClass('btn btn-success')
        .text('Download Manually');
    $btnDownloadManually.appendTo('body');
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