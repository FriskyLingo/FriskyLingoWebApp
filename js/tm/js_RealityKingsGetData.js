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
    { site: 'hotbush', siteType: 'HB', siteTitle: 'Hot Bush' },
    { site: 'inthevip', siteType: 'ITVIP', siteTitle: 'In The VIP' },
    { site: 'megacockcravers', siteType: 'MCC', siteTitle: 'Mega Cock Cravers' },
    { site: 'mikeinbrazil', siteType: 'MIB', siteTitle: 'Mike In Brazil' },
    { site: 'mikesapartment', siteType: 'MA', siteTitle: 'Mikes Apartment' },
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
    { site: 'roundandbrown', siteType: 'RAB', siteTitle: 'Round And Brown' },
    { site: 'saturdaynightlatinas', siteType: 'SNL', siteTitle: 'Saturday Night Latinas' },
    { site: 'seemywife', siteType: 'SMW', siteTitle: 'See My Wife' },
    { site: 'streetblowjobs', siteType: 'SB', siteTitle: 'Street Blowjobs' },
    { site: 'teamsquirt', siteType: 'TS', siteTitle: 'Team Squirt' },
    { site: 'teenslovehugecocks', siteType: 'TLHC', siteTitle: 'Teens Love Huge Cocks' },
    { site: 'topshelfpussy', siteType: 'TSP', siteTitle: 'Top Shelf Pussy' },
    { site: 'vipcrew', siteType: 'VIPC', siteTitle: 'VIP crew' },
    { site: 'welivetogether', siteType: 'WLT', siteTitle: 'We Live Together' },
    { site: 'wivesinpantyhose', siteType: 'WIPH', siteTitle: 'Wives in Pantyhose' }
];

$(document).ready(function () {
    console.log(new Date().toJSON().slice(0,10));

    var theLinks = [];
    var theLinksProcessed = [];
    var theLinksUnprocessed = [];

    ///////////////////////////////////////////////
    //Get the links
    ///////////////////////////////////////////////
    $.when(getTextFile('data/rkLinks.txt')).done(function (data) {
        console.log('DONE getting rkLinks.txt');

        theLinks = data.split('\n');

        if (theLinks.length > 0) {
            console.log('theLinks: [' + theLinks.length + ']');
        } else {
            console.log('!!-ERROR-!!' + '\t' + 'theLinks data not found!');
        }

        ///////////////////////////////////////////////
        //Get the processed links
        ///////////////////////////////////////////////
        $.when(getTextFile('data/rkLinksProcessed.txt')).done(function (data) {
            console.log('DONE getting rkLinksProcessed.txt');

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
            if (window.location.href.indexOf('browse.updates') > -1) {
                var currentLinks = getSceneLinks();
                theLinks = theLinks.union(currentLinks);

                //console.log(currentLinks.join('\n'));

                var timer;

                function clickNextScene() {
                    timer = setTimeout(function () {
                        //Wait n seconds then click the "next page" link
                        console.log('\t' + 'triggering next page click');

                        var theNextPageLink = $('p.pagination.pagination-top a:contains("«")').attr('href');
                        var currentOrigin = window.location.origin;

                        window.location.href = currentOrigin + theNextPageLink;
                    }, 2000);
                }

                if ($('p.pagination.pagination-top a:contains("«")').length > 0 && window.location.href.indexOf('alltime/60') < 0) {
                    console.log('clicking next page');

                    if (currentLinks.length > 0) {
                        //Append the links to the "processed links" file
                        appendDataToTextFile(currentLinks.join('\n'), 'data/rkLinks.txt');
                    }

                    clickNextScene();
                } else {
                    console.log('not clicking next page');

                    clearTimeout(timer);

                    if (currentLinks.length > 0) {
                        //Append the links to the "processed links" file
                        appendDataToTextFile(currentLinks.join('\n'), 'data/rkLinks.txt');
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
                getSceneData(theLinksUnprocessed.first(1000));
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
                var theSceneId = getParameterByName('id', theUrl);
                //console.log(theSceneId);

                //Get the scene release date
                var theReleaseDate = getReleaseDate($thePage);

                //["13370", "", "", "2016-05-28", "", "NaN", "", "", "", NaN, NaN, "http://members.realitykings.com/?a=update.view&id=13370&site=monstercurves"]
                var outputData = [
                    theSceneId,                         //GOOD
                    theReleaseDate,                     //GOOD
					getSiteAbbreviation(theUrl),        //GOOD
					getSiteTitle(theUrl),               //GOOD
                    getSceneRating($thePage),           //GOOD
					getPerformers($thePage),            //GOOD
                    'Reality Kings',                    //GOOD
                    moment(theReleaseDate).year(),      //GOOD
					getSceneTitle($thePage),            //GOOD
					getDescription($thePage),           //GOOD
					getTags($thePage),                  //GOOD
					getVotes($thePage),                 //GOOD
					theUrl                              //GOOD
                ];

                //console.log(outputData);

                var theData = outputData.join('\t');

                //Append the data to the text file
                appendDataToTextFile(theData, 'data/rkData.txt');

                //Append the processed link to the "processed links" file
                appendDataToTextFile(theUrl, 'data/rkLinksProcessed.txt');
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

    $('div.browsewrap div.item.curved p.thumb a').each(function () {
        var theLink = window.location.origin + $(this).attr('href');
        console.log(theLink);
        returnData.push(theLink);
    });

    return returnData;
}



//################################################################################################################
// Functions to get scene info
//################################################################################################################
/////////////////////////////////////////////////////////////////////////////
// Votes
/////////////////////////////////////////////////////////////////////////////
function getVotes($thePage) {
    var returnData;
    returnData = $thePage.find('.updaterating #hover-test').text().compact().trim()
        .replace('Avg. Rating: ', '')
        .remove(/\d+\.\d+/g)
        .remove(/\(/g)
        .replace(' Votes)', '')
        .compact()
        .trim();

    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene title
/////////////////////////////////////////////////////////////////////////////
function getSceneTitle($thePage) {
    var returnData = '';
    returnData = $thePage.find('.breadcrumbbar p').text().split('|')[3].trim().capitalize(true);
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Performers
/////////////////////////////////////////////////////////////////////////////
function getPerformers($thePage) {
    var returnData = '';
    var $performers = $thePage.find('div.updatetext').find('p:contains("Cast:")').find('a');

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
// Site Title
/////////////////////////////////////////////////////////////////////////////
function getSiteTitle(theUrl) {
    var returnData = '';
    
    //Get the "site" query parameter
    var siteParameter = getParameterByName('site', theUrl);

    //Get the "siteTitle" that matches the "site"
    var theSite = siteTypes.find(function (s) {
        return s.site === siteParameter;
    });

    returnData = theSite.siteTitle;

    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Site Abbreviation
/////////////////////////////////////////////////////////////////////////////
function getSiteAbbreviation(theUrl) {
    var returnData = '';

    //Get the "site" query parameter
    var siteParameter = getParameterByName('site', theUrl);

    //Get the "siteType" that matches the "site"
    var theSite = siteTypes.find(function (s) {
        return s.site === siteParameter;
    });

    returnData = theSite.siteType;
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene date
/////////////////////////////////////////////////////////////////////////////
function getReleaseDate($thePage) {
    var returnData = '';
    var theDate = $thePage.find('div.updatedate').text().compact().trim();
    var theMoment = moment(new Date(theDate), 'dddd MMMM DD, YYYY').format('YYYY-MM-DD'); //Friday May 27, 2016
    returnData = theMoment;
    //console.log(returnData);
    return returnData;
}

/////////////////////////////////////////////////////////////////////////////
// Scene desecription
/////////////////////////////////////////////////////////////////////////////
function getDescription($thePage) {
    var returnData = '';
    returnData = $thePage.find('div.updatetext div.clear:first')
        .next('p')
        .text()
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
    var $tags = $thePage.find('div.updatetext').find('p:contains("Tags:")').find('a');

    var theTags = [];
    $tags.each(function () {
        var theTag = $(this).text().trim();
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
    returnData = $thePage.find('.updaterating #hover-test').text().compact().trim()
        .replace('Avg. Rating: ', '')
        .remove(/ \(\d+ Votes\)/g)
        .toNumber()
        .round(1)
        .format(1);

    //console.log(returnData);
    return returnData;
}


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