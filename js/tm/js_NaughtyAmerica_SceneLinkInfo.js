/// <reference path="../../Scripts/moment.js" />
/// <reference path="../../Scripts/sugar.js" />

var siteTypes =
[
    { site: "2chickssametime", siteType: "2CST", siteTitle: "2 Chicks Same Time" },
    { site: "americandaydreams", siteType: "ADD", siteTitle: "American Daydreams" },
    { site: "assmasterpiece", siteType: "AM", siteTitle: "Ass Masterpiece" },
    { site: "diaryofamilf", siteType: "DOM", siteTitle: "Diary of a Milf" },
    { site: "diaryofananny", siteType: "DON", siteTitle: "Diary of a Nanny" },
    { site: "dirtywivesclub", siteType: "NADWC", siteTitle: "Dirty Wives Club" },
    { site: "fasttimes", siteType: "FTNA", siteTitle: "Fast Times" },
    { site: "housewife1on1", siteType: "H1ON1", siteTitle: "Housewife 1 on 1" },
    { site: "ihaveawife", siteType: "IHW", siteTitle: "I Have a Wife" },
    { site: "latinadultery", siteType: "LAD", siteTitle: "Latin Adultery" },
    { site: "mydadshotgirlfriend", siteType: "MDHG", siteTitle: "My Dad's Hot Girlfriend" },
    { site: "myfirstsexteacher", siteType: "MFST", siteTitle: "My First Sex Teacher" },
    { site: "myfriendshotgirl", siteType: "MFHG", siteTitle: "My Friend's Hot Girl" },
    { site: "mygirlfriendsbustyfriend", siteType: "MGBF", siteTitle: "My Girlfriend's Busty Friend" },
    { site: "mynaughtymassage", siteType: "MNM", siteTitle: "My Naughty Massage" },
    { site: "mysistershotfriend", siteType: "MSHF", siteTitle: "My Sister's Hot Friend" },
    { site: "mywifeshotfriend", siteType: "MWHF", siteTitle: "My Wife's Hot Friend" },
    { site: "naughtyathletics", siteType: "NATH", siteTitle: "Naughty Athletics" },
    { site: "naughtyoffice", siteType: "NO", siteTitle: "Naughty Office" },
    { site: "naughtyrichgirls", siteType: "NRG", siteTitle: "Naughty Rich Girls" },
    { site: "neighboraffair", siteType: "NAF", siteTitle: "Neighbor Affair" },
    { site: "tonightsgirlfriend", siteType: "NATNGF", siteTitle: "Tonight's Girlfriend" },
    { site: "wivesonvacation", siteType: "WOV", siteTitle: "Wives on Vacation" },
    { site: "myfriendshotmom", siteType: "MFHM", siteTitle: "My Friend's Hot Mom" },
    { site: "mynaughtylatinmaid", siteType: "MNLM", siteTitle: "My Naughty Latin Maid" },
    { site: "mywifeismypornstar", siteType: "MWMP", siteTitle: "My Wife Is My Pornstar" },
    { site: "naughtyamerica", siteType: "NA", siteTitle: "Naughty America" },
    { site: "naughtybookworms", siteType: "NBW", siteTitle: "Naughty Bookworms" },
    { site: "naughtycountrygirls", siteType: "NCG", siteTitle: "Naughty Country Girls" },
    { site: "naughtyflipside", siteType: "NFS", siteTitle: "Naughty Flipside" },
    { site: "naughtyweddings", siteType: "NW", siteTitle: "Naughty Weddings" },
    { site: "seducedbyacougar", siteType: "SBC", siteTitle: "Seduced By A Cougar" },
    { site: "socalcoeds", siteType: "SCC", siteTitle: "Socal Coeds" },
    { site: "thepassenger", siteType: "PGR", siteTitle: "The Passenger" }
];

$(document).ready(function () {
    console.log('v8');

    var theLines = [];
    var xhrs = [];

    //Get all the new scenes
    var $gridItems = $('div.grid-item-large');

    //Loop through the grid items
    $gridItems.each(function () {
        var $scene = $(this);

        //Skip ANAL scenes
        if ($scene.find('div.anal-tag').length < 1) {
            var sceneLink = $scene.find('a:first').attr('href');
            var sceneTitle = $scene.find('a:first').attr('title').trim();
            var sceneId = sceneLink.split('-').last();

            var sceneModels = $scene.find('a.model-name').text().trim();
            sceneModels = sceneModels.split(' in ')[0].trim();
            sceneModels = replaceAll(sceneModels, ' & ', '|');

            var sceneSite = sceneTitle.split(' in ')[1].trim();

            var result = $.grep(siteTypes, function (e) { return e.siteTitle == sceneSite; });
            var sceneSiteType = 'UNK';

            if (result.length === 1) {
                sceneSiteType = result[0].siteType;
            }

            //Apr 28, 2016
            var sceneDate = moment($scene.find('p.entry-date').text().trim(), 'MMM D, YYYY').format('YYYY-MM-DD');


            var xhr = $.ajax({
                url: sceneLink,
                type: 'GET'
            }).done(function (data) {
                var $thePage = $(data);

                // Get the scene rating
                var theRating = $thePage.find('p.scene_rating_text>span.sceneRating').text().trim();

                // Get the scene file name that I would be downloading
                var theFileName = getSceneFileName($thePage.find('div#video_download').find('a'));

                //////////////////////////////////////////////////////////////////////////////////////////////
                // Create the line
                //////////////////////////////////////////////////////////////////////////////////////////////
                //Create the line
                var theLine = [sceneId, sceneDate, sceneModels, sceneLink, sceneTitle, sceneSiteType, theRating, theFileName].join('\t');

                //Add the line to the output array
                theLines.push(theLine);
            });

            xhrs.push(xhr);
        }
    });

    $.when.apply($, xhrs).done(function () {
        //Log the lines to the console
        console.log(theLines.join('\n'));

        //Append the data to the text file
        appendDataToTextFile(theLines.join('\r\n'), 'data/naData.txt');
    });
});

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

//////////////////////////////////////////////////////////////////////////////////////////////
// Append data to a file
//////////////////////////////////////////////////////////////////////////////////////////////
function appendDataToTextFile(theLineData, theFilePath) {
    var theDataObj = {
        data: theLineData + '\r\n',
        filePath: theFilePath
    };

    console.log('posting to PHP file');
    $.ajax({
        url: 'http://www.friskylingo.com/AppendToTextFileB.php',
        data: theDataObj,
        type: 'POST',
        crossDomain: true,
        success: function () {
            //console.log('SUCCESS!');
            //console.log(data);
        },
        error: function () {
            console.log('FAILED!');
            //console.log(data);
        }
    }).done(function () {
        //console.log('DONE!');
        //console.log(data);
    }).always(function () {
        //console.log('ALWAYS!');
        //console.log(data);
    });
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