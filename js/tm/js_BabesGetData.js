/// <reference path="../../Scripts/sugar.js" />
/// <reference path="../../Scripts/moment.js" />

$(document).ready(function () {
    console.log('v5');

    var theLinks = [];
    var theLinksProcessed = [];
    var theLinksUnprocessed = [];

    ///////////////////////////////////////////////
    //Get the links
    ///////////////////////////////////////////////
    $.when(getTextFile('data/babesLinks.txt')).done(function (data) {
        //console.log('DONE getting babesLinks.txt');

        theLinks = data.split('\r\n');

        if (theLinks.length > 0) {
            console.log('theLinks: [' + theLinks.length + ']');
        } else {
            console.log('!!-ERROR-!!' + '\t' + 'theLinks data not found!');
        }

        ///////////////////////////////////////////////
        //Get the processed links
        ///////////////////////////////////////////////
        $.when(getTextFile('data/babesLinksProcessed.txt')).done(function (data) {
            //console.log('DONE getting babesLinksProcessed.txt');

            theLinksProcessed = data.split('\r\n');

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
            if (window.location.href.indexOf('videos') > -1 && window.location.href.indexOf('videos/view') < 0) {
                var currentLinks = getSceneLinks();
                theLinks = theLinks.union(currentLinks);

                console.log(currentLinks.join('\r\n'));

                var timer;

                function clickNextScene() {
                    timer = setTimeout(function () {
                        //Wait n seconds then click the "next page" link
                        console.log('\t' + 'triggering next page click');
                        var theNextPageLink = $('li.paginationui-nav.next a').attr('href');
                        var currentOrigin = window.location.origin;
                        window.location.href = currentOrigin + theNextPageLink;
                    }, 2000);
                }

                if ($('li.paginationui-nav.next').length > 0 && window.location.href.indexOf('alltime/60') < 0) {
                    console.log('clicking next page');

                    //Append the links to the "processed links" file
                    appendDataToTextFile(currentLinks.join('\r\n'), 'data/babesLinks.txt');

                    clickNextScene();
                } else {
                    console.log('not clicking next page');

                    clearTimeout(timer);

                    //Append the links to the "processed links" file
                    appendDataToTextFile(currentLinks.join('\r\n'), 'data/babesLinks.txt');

                    console.log(theLinks);
                }
            } else {
                $('div#pornportal-wrapper, section.footer-trusted, footer, section.comments-box').hide();
                $('section.related-releases-placeholder, section.timeline-placeholder, #player_api').hide();
                $('div.bg-wrapper').removeClass('bg-wrapper');

                //Get scene data for each link
                //console.log('\t' + 'NOW get the scene data');
                getSceneData(theLinksUnprocessed.first(300));
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
                var theSceneId = theUrl.split('/')[7];

                var outputData = [
                    theSceneId,
					'B',
					'Babes',
					getReleaseDate($thePage),
					getSceneTitle($thePage),
					getSceneRating($thePage),
					getPerformers($thePage),
					getDescription($thePage),
					getTags($thePage),
					getLikes($thePage),
					getViews($thePage),
					theUrl
                ];

                var theData = outputData.join('\t');

                //Append the data to the text file
                appendDataToTextFile(theData, 'data/babesData.txt');

                //Append the processed link to the "processed links" file
                appendDataToTextFile(theUrl, 'data/babesLinksProcessed.txt');
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
        data: theLineData + '\r\n',
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

    $('.release-wrapper.scene h2.release-title a').each(function () {
        var theLink = window.location.origin + $(this).attr('href');
        returnData.push(theLink);
    });

    return returnData;
}



//################################################################################################################
// Functions to get scene info
//################################################################################################################
/////////////////////////////////////////////////////////////////////////////
// Likes
/////////////////////////////////////////////////////////////////////////////
function getLikes($thePage) {
    var returnData;
    returnData = $thePage.find('div.likes_views-count span:contains("Likes")').text()
        .replace('Likes', '')
        .replace(',', '')
        .compact()
        .trim()
        .toNumber();
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Views
/////////////////////////////////////////////////////////////////////////////
function getViews($thePage) {
    var returnData;
    returnData = $thePage.find('div.likes_views-count span:contains("Views")').text()
        .replace('Views', '')
        .replace(',', '')
        .compact()
        .trim()
        .toNumber();
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene title
/////////////////////////////////////////////////////////////////////////////
function getSceneTitle($thePage) {
    var returnData = '';
    returnData = $thePage.find('div.model-info h1').text().compact().trim();
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Performers
/////////////////////////////////////////////////////////////////////////////
function getPerformers($thePage) {
    var returnData = '';
    var $performers = $thePage.find('div.model-info a.model-name');

    var thePerformers = [];
    $performers.each(function () {
        var thePerformer = $(this).text().trim();
        thePerformers.push(thePerformer);
    });

    returnData = thePerformers.join('|');
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene date
/////////////////////////////////////////////////////////////////////////////
function getReleaseDate($thePage) {
    var returnData = '';
    var theDate = $thePage.find('div.model-info li:contains("Date")').text().replace('Date:', '').compact().trim();
    var theMoment = moment(new Date(theDate)).format('YYYY-MM-DD');
    returnData = theMoment;
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene desecription
/////////////////////////////////////////////////////////////////////////////
function getDescription($thePage) {
    var returnData = '';
    returnData = $thePage.find('div.model-info li:contains("Description")').text()
        .replace('Description:', '')
        .replace('Show more', '')
        .replace('Show less', '')
        .compact()
        .trim();
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene categories
/////////////////////////////////////////////////////////////////////////////
function getTags($thePage) {
    var returnData = '';
    var $tags = $thePage.find('div.model-info li:contains("Categories") a').not(':contains("Show more"), :contains("Show less")');

    var theTags = [];
    $tags.each(function () {
        var theTag = $(this).text().compact().trim();
        theTags.push(theTag);
    });

    returnData = theTags.join('|');
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene rating
/////////////////////////////////////////////////////////////////////////////
function getSceneRating($thePage) {
    var returnData;
    returnData = replaceAll($thePage.find('div.likesperc-count').text().trim(), '%', '').toNumber();
    returnData = (returnData / 10).round(1).format(1);
    //console.log(returnData);
    return returnData;
}



function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}