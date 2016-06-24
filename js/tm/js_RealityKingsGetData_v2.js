/// <reference path="../../Scripts/sugar.js" />
/// <reference path="../../Scripts/moment.js" />

var siteTypes = 
[
    { site: '40inchplus', siteType: '40P', siteTitle: '40 Inch Plus' },
    { site: '8thstreetlatinas', siteType: '8SL', siteTitle: '8th Street Latinas' },
    { site: 'badtowtruck', siteType: 'BTT', siteTitle: 'Bad Tow Truck' },
    { site: 'bignaturals', siteType: 'BN', siteTitle: 'Big Naturals' },
    { site: 'bigtitsboss', siteType: 'BTB', siteTitle: 'Big Tits Boss' },
    { site: 'bikinicrashers', siteType: 'BC', siteTitle: 'Bikini Crashers' },
    { site: 'captainstabbin', siteType: 'CS', siteTitle: 'Captain Stabbin' },
    { site: 'cfnmsecret', siteType: 'CFNMS', siteTitle: 'CFNM Secret' },
    { site: 'cumfiesta', siteType: 'CF', siteTitle: 'Cum Fiesta' },
    { site: 'cumgirls', siteType: 'CG', siteTitle: 'Cum Girls' },
    { site: 'dangerousdongs', siteType: 'DD', siteTitle: 'Dangerous Dongs' },
    { site: 'eurosexparties', siteType: 'ESP', siteTitle: 'Euro Sex Parties' },
    { site: 'extremeasses', siteType: 'EA', siteTitle: 'Extreme Asses' },
    { site: 'extremenaturals', siteType: 'EN', siteTitle: 'Extreme Naturals' },
    { site: 'firsttimeauditions', siteType: 'FTA', siteTitle: 'First Time Auditions' },
    { site: 'flowertucci', siteType: 'FT', siteTitle: 'Flower Tucci' },
    { site: 'girlsofnaked', siteType: 'GON', siteTitle: 'Girls of Naked' },
    { site: 'happytugs', siteType: 'HT', siteTitle: 'Happy Tugs' },
    { site: 'hdlove', siteType: 'HDL', siteTitle: 'HD Love' },
    { site: 'hotbush', siteType: 'HB', siteTitle: 'Hot Bush' },
    { site: 'inthevip', siteType: 'ITVIP', siteTitle: 'In the VIP' },
    { site: 'megacockcravers', siteType: 'MCC', siteTitle: 'Mega Cock Cravers' },
    { site: 'mikeinbrazil', siteType: 'MIB', siteTitle: 'Mike in Brazil' },
    { site: 'mikesapartment', siteType: 'MA', siteTitle: 'Mike\'s Apartment' },
    { site: 'milfhunter', siteType: 'MH', siteTitle: 'Milf Hunter' },
    { site: 'milfnextdoor', siteType: 'MND', siteTitle: 'Milf Next Door' },
    { site: 'momsbangteens', siteType: 'MBT', siteTitle: 'Moms Bang Teens' },
    { site: 'momslickteens', siteType: 'MLT', siteTitle: 'Moms Lick Teens' },
    { site: 'moneytalks', siteType: 'MT', siteTitle: 'Money Talks' },
    { site: 'monstercurves', siteType: 'MC', siteTitle: 'Monster Curves' },
    { site: 'nofaces', siteType: 'NF', siteTitle: 'No Faces' },
    { site: 'pure18', siteType: 'P18', siteTitle: 'Pure 18' },
    { site: 'realorgasms', siteType: 'RO', siteTitle: 'Real Orgasms' },
    { site: 'rkprime', siteType: 'RKP', siteTitle: 'RK Prime' },
    { site: 'roundandbrown', siteType: 'RAB', siteTitle: 'Round and Brown' },
    { site: 'saturdaynightlatinas', siteType: 'SNL', siteTitle: 'Saturday Night Latinas' },
    { site: 'seemywife', siteType: 'SMW', siteTitle: 'See My Wife' },
    { site: 'streetblowjobs', siteType: 'SB', siteTitle: 'Street BlowJobs' },
    { site: 'teamsquirt', siteType: 'TS', siteTitle: 'Team Squirt' },
    { site: 'teenslovehugecocks', siteType: 'TLHC', siteTitle: 'Teens Love Huge Cocks' },
    { site: 'topshelfpussy', siteType: 'TSP', siteTitle: 'Top Shelf Pussy' },
    { site: 'vipcrew', siteType: 'VIPC', siteTitle: 'VIP Crew' },
    { site: 'welivetogether', siteType: 'WLT', siteTitle: 'We Live Together' },
    { site: 'wivesinpantyhose', siteType: 'WIPH', siteTitle: 'Wives in Pantyhose' }
];

$(document).ready(function () {
    //console.log(new Date().toJSON().slice(0,10));

    var theLinks = [];
    var theLinksProcessed = [];
    var theLinksUnprocessed = [];

    ///////////////////////////////////////////////
    //Get the links
    ///////////////////////////////////////////////
    $.when(getTextFile('data/rkLinks_v2.txt')).done(function (data) {
        console.log('DONE getting rkLinks_v2.txt');

        theLinks = data.split('\n');

        if (theLinks.length > 0) {
            console.log('theLinks: [' + theLinks.length + ']');
        } else {
            console.log('!!-ERROR-!!' + '\t' + 'theLinks data not found!');
        }

        ///////////////////////////////////////////////
        //Get the processed links
        ///////////////////////////////////////////////
        $.when(getTextFile('data/rkLinksProcessed_v2.txt')).done(function (data) {
            console.log('DONE getting rkLinksProcessed_v2.txt');

            theLinksProcessed = data.split('\n');

            if (theLinksProcessed.length > 0) {
                console.log('theLinksProcessed: [' + theLinksProcessed.length + ']');
            } else {
                console.log('!!-ERROR-!!' + '\t' + 'theLinksProcessed data not found!');
            }

            //Get the list of unprocessed links
            theLinksUnprocessed = theLinks.subtract(theLinksProcessed);
            console.log('theLinksUnprocessed: [' + theLinksUnprocessed.length + ']');

            ///////////////////////////////////////////////
            // PROCESS
            ///////////////////////////////////////////////
            if (window.location.href.indexOf('videos/all-sites') > -1) {
                var currentLinks = getSceneLinks();
                theLinks = theLinks.union(currentLinks);

                var timer;

                function clickNextScene() {
                    timer = setTimeout(function () {
                        //Wait n seconds then click the "next page" link
                        console.log('\t' + 'triggering next page click');

                        var theNextPageLink = $('div.pager__inner a:contains("«")').attr('href');
                        var currentOrigin = window.location.origin;

                        window.location.href = currentOrigin + theNextPageLink;
                    }, 2000);
                }

                if ($('div.pager__inner a:contains("«")').length > 0 && window.location.href.indexOf('alltime/60') < 0) {
                    console.log('clicking next page');

                    if (currentLinks.length > 0) {
                        //Append the links to the "links" file
                        appendDataToTextFile(currentLinks.join('\n'), 'data/rkLinks_v2.txt');
                    }

                    clickNextScene();
                } else {
                    console.log('not clicking next page');

                    clearTimeout(timer);

                    if (currentLinks.length > 0) {
                        //Append the links to the "links" file
                        appendDataToTextFile(currentLinks.join('\n'), 'data/rkLinks_v2.txt');
                    }

                    //console.log(theLinks);
                }
            } else {
                $('div#pornportal-wrapper, section.footer-trusted, footer, section.comments-box').hide();
                $('section.related-releases-placeholder, section.timeline-placeholder, #player_api').hide();
                $('div.bg-wrapper').removeClass('bg-wrapper');

                console.log('getting scene data for each link');
                //Get scene data for each link
                console.log('\t' + 'NOW get the scene data');
                getSceneData(theLinksUnprocessed.first(500));
                //console.log(theLinksUnprocessed.join('\n'));
            }
        });
    });
});


/////////////////////////////////////////////////////////////////////////////
// Get text file using AJAX
/////////////////////////////////////////////////////////////////////////////
function getTextFile(filePath) {
    return $.ajax({
        url: 'http://www.friskylingo.com/' + filePath,
        type: 'GET',
        dataType: 'text',
        crossDomain: true
    });
}


/////////////////////////////////////////////////////////////////////////////
// Get the data for each scene
/////////////////////////////////////////////////////////////////////////////
function getSceneData(unprocessedLinks) {
    var xhrs = [];
    var totalCounter = 0;
    var processedCounter = 0;

    totalCounter = unprocessedLinks.length;

    var doProcess = true;

    console.log('unprocessedLinks.length: ' + totalCounter);

    if (doProcess) {
        $.each(unprocessedLinks, function (i, theUrl) {
            var xhr = $.ajax({
                url: theUrl,
                type: 'GET'
            }).done(function (data) {
                processedCounter = processedCounter + 1;
                var percentComplete = ((processedCounter / totalCounter) * 100).round() + '%';
                document.title = percentComplete + ' [' + processedCounter + '/' + totalCounter + ']';

                //Get a reference to the web page
                var $thePage = $(data);

                //Get the scene ID from the URL
                var theSceneId = getSceneId(theUrl);

                //Get the scene's site name
                var theSiteName = getSiteName($thePage);

                //Get the scene's site abbreviation
                var theSiteAbbreviation = getSiteAbbreviation(theSiteName);

                //Get the scene release date
                var theReleaseDate = getReleaseDate($thePage);

                //Get the scene Likes
                var theSceneLikes = getSceneLikes($thePage, theSceneId);

                //Get the scene Dislikes
                var theSceneDislikes = getSceneDislikes($thePage, theSceneId);

                //Get the scene rating
                var theRating = getSceneRating(theSceneLikes, theSceneDislikes);

                //Get the scene name
                var theSceneName = getSceneTitle($thePage);

                var outputData = [
                    'Reality Kings', //Studio

                    theSiteName, //Site Name
                    theSiteAbbreviation, //Site Abbreviation

                    theSceneId, //Scene ID
                    theSceneName, //Scene Title
                    theReleaseDate, //Scene Release Date
                    moment(theReleaseDate).year(), //Scene Release Year
                    theUrl, //Scene Link
                    getDescription($thePage), //Scene Description
                    getPerformers($thePage), //Scene Performers
                    getTags($thePage), //Scene Categories
                    getSceneViews($thePage), //Scene Views
                    getTotalVotes(theSceneLikes, theSceneDislikes), //Scene Total Votes
                    theSceneLikes, //Scene Likes
                    theSceneDislikes, //Scene Dislikes
                    theRating, //Scene Rating
                    getSceneDownloadLink(theSiteAbbreviation, theSceneId, theReleaseDate, theRating, theSceneName) //Scene Download Link
                ];

                //console.log(outputData);

                var theData = outputData.join('\t');

                //Append the data to the text file
                appendDataToTextFile(theData, 'data/rkData_v2.txt');

                //Append the processed link to the "processed links" file
                appendDataToTextFile(theUrl, 'data/rkLinksProcessed_v2.txt');
            }).fail(function () {
                console.log('FAIL!');
            });

            //console.log('finished [' + i + '/' + totalCounter + ']...');
            xhrs.push(xhr);
        });

        $.when.apply($, xhrs).done(function () {
            document.title = '!!-FINISHED-!!';
            console.log('==================================================================================');
        });
    }
}


/////////////////////////////////////////////////////////////////////////////
// Append data to a file
/////////////////////////////////////////////////////////////////////////////
function appendDataToTextFile(theLineData, theFilePath) {
    var theDataObj = {
        data: theLineData + '\n',
        filePath: theFilePath
    };

    //console.log('posting to PHP file');
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



/////////////////////////////////////////////////////////////////////////////
// Get scene links from the page
/////////////////////////////////////////////////////////////////////////////
function getSceneLinks() {
    var returnData = [];

    $('h3.card-info__title a').each(function () {
        var theLink = window.location.origin + $(this).attr('href');
        //console.log(theLink);
        returnData.push(theLink);
    });

    return returnData;
}



//################################################################################################################
// Functions to get scene info
//################################################################################################################
/////////////////////////////////////////////////////////////////////////////
// Scene Total Votes
/////////////////////////////////////////////////////////////////////////////
function getTotalVotes(theLikesCount, theDislikesCount) {
    var returnData;
    returnData = theLikesCount + theDislikesCount;

    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene ID
/////////////////////////////////////////////////////////////////////////////
function getSceneId(theUrl) {
    var returnData = '';

    returnData = theUrl.split('/')[5].trim().toNumber();
    //console.log('Scene ID\n\t\t' + returnData);

    return returnData;
}


/////////////////////////////////////////////////////////////////////////////
// Scene Title
/////////////////////////////////////////////////////////////////////////////
function getSceneTitle($thePage) {
    var returnData = '';
    
    returnData = $thePage.find('h2.player-header__title').text().compact().trim();
    //console.log('Scene Title\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene Performers
/////////////////////////////////////////////////////////////////////////////
function getPerformers($thePage) {
    var returnData = '';
    
    returnData = $.map(
		$thePage.find('div.player-header__actors a'),
		function (element) {
		    return $(element).text();
		})
		.join('|');
    //console.log('Scene Performers\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Site Title
/////////////////////////////////////////////////////////////////////////////
function getSiteName($thePage) {
    var returnData = '';
    
    returnData = $thePage.find('a.player-header__logo.site-logo').attr('title').trim();
    //console.log('Site Name\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Site Abbreviation
/////////////////////////////////////////////////////////////////////////////
function getSiteAbbreviation(theSiteName) {
    var returnData = '';

    var theCurrentSite = siteTypes.find(function (s) {
        return s.siteTitle.toLowerCase() === theSiteName.toLowerCase();
    });

    if (theCurrentSite) {
        returnData = theCurrentSite.siteType;
    } else {
        console.log('Error getting site abbreviation for [' + theSiteName + ']');
    }
    
    //console.log('Site Abbreviation\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene date
/////////////////////////////////////////////////////////////////////////////
function getReleaseDate($thePage) {
    var returnData = '';
    
    returnData = moment($thePage.find('time.player-header__date').text().compact().trim(), 'MMMM Do, YYYY').format('YYYY-MM-DD');
    //console.log('Release Date\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene desecription
/////////////////////////////////////////////////////////////////////////////
function getDescription($thePage) {
    var returnData = '';
   
    returnData = $thePage.find('div.player-description').text().compact().trim();
    //console.log('Scene Description\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene categories
/////////////////////////////////////////////////////////////////////////////
function getTags($thePage) {
    var returnData = '';
    
    returnData = $.map(
		$thePage.find('div.player-tags a.btn'),
		function (element) {
		    return $(element).text();
		})
		.join('|');
    //console.log('Scene Categories\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene rating
/////////////////////////////////////////////////////////////////////////////
function getSceneRating(theLikes, theDislikes) {
    var returnData;

    var totalVotes = theLikes + theDislikes;
    returnData = ((theLikes / totalVotes) * 10).format(1, '', '.');
    //console.log('Scene Rating\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene Likes
/////////////////////////////////////////////////////////////////////////////
function getSceneLikes($thePage, theSceneId) {
    var returnData = '';

    returnData = $thePage.find('em[data-storage-key="vote:release:like:' + theSceneId + '"]').text().compact().trim().toNumber();
    //console.log('Scene Likes\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene Dislikes
/////////////////////////////////////////////////////////////////////////////
function getSceneDislikes($thePage, theSceneId) {
    var returnData = '';

    returnData = $thePage.find('em[data-storage-key="vote:release:dislike:' + theSceneId + '"]').text().compact().trim().toNumber();
    //console.log('Scene Dislikes\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene Views
/////////////////////////////////////////////////////////////////////////////
function getSceneViews($thePage) {
    var returnData = '';

    returnData = $thePage.find('div.player-stats__likes em').last().text().compact().trim().toNumber();
    //console.log('Scene Views\n\t\t' + returnData);

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene Download Link
/////////////////////////////////////////////////////////////////////////////
function getSceneDownloadLink(theSiteAbbreviation, theSceneId, theReleaseDate, theRating, theTitle) {
    var returnData = '';

    var theAnchor = theSiteAbbreviation + '__' + theSceneId + '__' + theReleaseDate + '__' + theRating + '__' + theTitle + '.mp4';
    theAnchor = replaceAll(theAnchor, ' ', '');
    returnData = 'http://new.members.realitykings.com/video/download/' + theSceneId + '/1080/#' + theAnchor;
    //console.log('Download Link\n\t\t' + returnData);

    return returnData;
}



//################################################################################################################
// Helper Functions
//################################################################################################################
//////////////////////////////////////////////////////////////////////////////////////////////
// Get URL query parameter by name
//////////////////////////////////////////////////////////////////////////////////////////////
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}