/// <reference path="../../libs/jquery/jquery-1.8.2.js" />
/// <reference path="../../libs/jquery/jquery-ui.js" />
/// <reference path="../../Scripts/moment.js" />
/// <reference path="../../Scripts/sugar.js" />
/// <reference path="../../Scripts/store+json2.min.js" />

var siteTypes = 
[
    {site: 'Babes', siteType: 'B', siteTitle: 'Babes'},
    {site: 'Amateur Allure', siteType: 'AA', siteTitle: 'Amateur Allure'},
    {site: 'Massage Girls 18', siteType: 'MG18', siteTitle: 'Massage Girls 18'},
    {site: 'Fucked Hard 18', siteType: 'FH18', siteTitle: 'Fucked Hard 18'},
    {site: '2 Chicks Same Time', siteType: '2CST', siteTitle: '2 Chicks Same Time'},
    {site: 'American Daydreams', siteType: 'ADD', siteTitle: 'American Daydreams'},
    {site: 'Ass Masterpiece', siteType: 'AM', siteTitle: 'Ass Masterpiece'},
    {site: 'Diary Of A Milf', siteType: 'DOM', siteTitle: 'Diary Of A Milf'},
    {site: 'Diary Of A Nanny', siteType: 'DON', siteTitle: 'Diary Of A Nanny'},
    {site: 'Dirty Wives Club', siteType: 'NADWC', siteTitle: 'Dirty Wives Club'},
    {site: 'Fast Times At Nau', siteType: 'FTNA', siteTitle: 'Fast Times At Nau'},
    {site: 'Housewife 1 On 1', siteType: 'H1ON1', siteTitle: 'Housewife 1 On 1'},
    {site: 'I Have A Wife', siteType: 'IHW', siteTitle: 'I Have A Wife'},
    {site: 'Latin Adultery', siteType: 'LAD', siteTitle: 'Latin Adultery'},
    {site: "My Dad's Hot Girlfriend", siteType: 'MDHG', siteTitle: "My Dad's Hot Girlfriend"},
    {site: 'My First Sex Teacher', siteType: 'MFST', siteTitle: 'My First Sex Teacher'},
    {site: "My Friend's Hot Girl", siteType: 'MFHG', siteTitle: "My Friend's Hot Girl"},
    {site: "My Girlfriend's Busty Friend", siteType: 'MGBF', siteTitle: "My Girlfriend's Busty Friend"},
    {site: 'My Naughty Massage', siteType: 'MNM', siteTitle: 'My Naughty Massage'},
    {site: "My Sister's Hot Friend", siteType: 'MSHF', siteTitle: "My Sister's Hot Friend"},
    {site: "My Wife's Hot Friend", siteType: 'MWHF', siteTitle: "My Wife's Hot Friend"},
    {site: 'Naughty Athletics', siteType: 'NATH', siteTitle: 'Naughty Athletics'},
    {site: 'Naughty Office', siteType: 'NO', siteTitle: 'Naughty Office'},
    {site: 'Naughty Rich Sex', siteType: 'NRG', siteTitle: 'Naughty Rich Sex'},
    {site: 'Neighbor Affair', siteType: 'NAF', siteTitle: 'Neighbor Affair'},
    {site: "Tonight's Girlfriend", siteType: 'NATNGF', siteTitle: "Tonight's Girlfriend"},
    {site: 'Wives On Vacation', siteType: 'WOV', siteTitle: 'Wives On Vacation'},
    {site: 'milfhunter', siteType: 'MH', siteTitle: 'Milf Hunter'},
    {site: 'moneytalks', siteType: 'MT', siteTitle: 'Money Talks'},
    {site: 'bignaturals', siteType: 'BN', siteTitle: 'Big Naturals'},
    {site: 'momsbangteens', siteType: 'MBT', siteTitle: 'Moms Bang Teens'},
    {site: 'momslickteens', siteType: 'MLT', siteTitle: 'Moms Lick Teens'},
    {site: 'teenslovehugecocks', siteType: 'TLHC', siteTitle: 'Teens Love Huge Cocks'},
    {site: 'cumfiesta', siteType: 'CF', siteTitle: 'Cum Fiesta'},
    {site: 'welivetogether', siteType: 'WLT', siteTitle: 'We Live Together'},
    {site: 'inthevip', siteType: 'ITVIP', siteTitle: 'In The Vip'},
    {site: '8thstreetlatinas', siteType: '8SL', siteTitle: '8th Street Latinas'},
    {site: 'roundandbrown', siteType: 'RAB', siteTitle: 'Round And Brown'},
    {site: 'vipcrew', siteType: 'VIPC', siteTitle: 'Vipcrew'},
    {site: 'mikeinbrazil', siteType: 'MIB', siteTitle: 'Mike In Brazil'},
    {site: 'mikesapartment', siteType: 'MA', siteTitle: 'Mikes Apartment'},
    {site: 'captainstabbin', siteType: 'CS', siteTitle: 'Captain Stabbin'},
    {site: 'streetblowjobs', siteType: 'SB', siteTitle: 'Street Blowjobs'},
    {site: 'flowertucci', siteType: 'FT', siteTitle: 'Flower Tucci Official Site'},
    {site: 'cfnmsecret', siteType: 'CFNMS', siteTitle: 'CFNM Secret'},
    {site: 'milfnextdoor', siteType: 'MND', siteTitle: 'Milf Next Door'},
    {site: 'teamsquirt', siteType: 'TS', siteTitle: 'TeamSquirt'},
    {site: 'firsttimeauditions', siteType: 'FTA', siteTitle: 'First Time Auditions'},
    {site: 'pure18', siteType: 'P18', siteTitle: 'Pure18'},
    {site: 'monstercurves', siteType: 'MC', siteTitle: 'Monster Curves'},
    {site: '40inchplus', siteType: '40P', siteTitle: '40inchplus'},
    {site: 'seemywife', siteType: 'SMW', siteTitle: 'See My Wife'},
    {site: 'eurosexparties', siteType: 'ESP', siteTitle: 'Euro Sex Parties'},
    {site: 'saturdaynightlatinas', siteType: 'SNL', siteTitle: 'Saturday Night Latinas'},
    {site: 'hotbush', siteType: 'HB', siteTitle: 'Hot Bush'},
    {site: 'itsreal', siteType: 'IR', siteTitle: 'ItsReal'},
    {site: 'bikinicrashers', siteType: 'BC', siteTitle: 'Bikini Crashers'},
    {site: 'happytugs', siteType: 'HT', siteTitle: 'Happy Tugs'},
    {site: 'cumgirls', siteType: 'CG', siteTitle: 'Cum Girls'},
    {site: 'dangerousdongs', siteType: 'DD', siteTitle: 'Dangerous Dongs'},
    {site: 'extremeasses', siteType: 'EA', siteTitle: 'Extreme Asses'},
    {site: 'extremenaturals', siteType: 'EN', siteTitle: 'Extreme Naturals'},
    {site: 'realorgasms', siteType: 'RO', siteTitle: 'Real Orgasms'},
    {site: 'topshelfpussy', siteType: 'TSP', siteTitle: 'Top Shelf Pussy'},
    {site: 'wivesinpantyhose', siteType: 'WIPH', siteTitle: 'Wives in Pantyhose'},
    {site: 'bigtitsboss', siteType: 'BTB', siteTitle: 'Big Tits Boss'},
    {site: 'badtowtruck', siteType: 'BTT', siteTitle: 'Bad Tow Truck'},
    {site: 'rkprime', siteType: 'RKP', siteTitle: 'RK Prime'},
    {site: 'assesinpublic', siteType: 'AIP', siteTitle: 'Asses In Public'},
    {site: 'bustyandreal', siteType: 'BAR', siteTitle: 'Busty And Real'},
    {site: 'bigbuttslikeitbig', siteType: 'BBLIB', siteTitle: 'Big Butts Like It Big'},
    {site: 'brazzersexxtra', siteType: 'BEX', siteTitle: 'Brazzers Exxtra'},
    {site: 'babygotboobs', siteType: 'BGB', siteTitle: 'Baby Got Boobs'},
    {site: 'bigtitsatschool', siteType: 'BTAS', siteTitle: 'Big Tits At School'},
    {site: 'bigtitsatwork', siteType: 'BTAW', siteTitle: 'Big Tits At Work'},
    {site: 'bigtitsinsports', siteType: 'BTIS', siteTitle: 'Big Tits In Sports'},
    {site: 'bigtitsinuniform', siteType: 'BTIU', siteTitle: 'Big Tits In Uniform'},
    {site: 'bustyz', siteType: 'BTZ', siteTitle: 'Bustyz'},
    {site: 'buttsandblacks', siteType: 'BAB', siteTitle: 'Butts And Blacks'},
    {site: 'bigwetbutts', siteType: 'BWB', siteTitle: 'Big Wet Butts'},
    {site: 'brazzersvault', siteType: 'BZV', siteTitle: 'Brazzers Vault'},
    {site: 'doctoradventures', siteType: 'DA', siteTitle: 'Doctor Adventures'},
    {site: 'dirtymasseur', siteType: 'DM', siteTitle: 'Dirty Masseur'},
    {site: 'daywithapornstar', siteType: 'DWP', siteTitle: 'Day With A Pornstar'},
    {site: 'hotandmean', siteType: 'HAM', siteTitle: 'Hot And Mean'},
    {site: 'hotchicksbigasses', siteType: 'HCBA', siteTitle: 'Hot Chicks Big Asses'},
    {site: 'jugfuckers', siteType: 'JF', siteTitle: 'Jugfuckers'},
    {site: 'mommygotboobs', siteType: 'MGB', siteTitle: 'Mommy Got Boobs'},
    {site: 'momsincontrol', siteType: 'MIC', siteTitle: 'Moms In Control'},
    {site: 'milfslikeitbig', siteType: 'MLIB', siteTitle: 'Milfs Like It Big'},
    {site: 'pornstarslikeitbig', siteType: 'PLIB', siteTitle: 'Porn Stars Like It Big'},
    {site: 'racksandblacks', siteType: 'RAB', siteTitle: 'Racks And Blacks'},
    {site: 'realwifestories', siteType: 'RWS', siteTitle: 'Real Wife Stories'},
    {site: 'shesgonnasquirt', siteType: 'SGS', siteTitle: "She's Gonna Squirt"},
    {site: 'sexproadventures', siteType: 'SPA', siteTitle: 'Sex Pro Adventures'},
    {site: 'teenslikeitbig', siteType: 'TLIB', siteTitle: 'Teens Like It Big' },
    {site: 'teenslikeitblack', siteType: 'TLB', siteTitle: 'Teens Like It Black'},
    {site: 'zzseries', siteType: 'ZZS', siteTitle: 'Zz Series'}
];

var hideStuff = false;
var clickThroughScenes = false;
var justGetLinks = false;

$(document).ready(function () {
    console.log(new Date().toJSON().slice(0, 10));

    var theLinks = [];

    if (store.get('theLinks')) {
        theLinks = store.get('theLinks');
    }

    //Hide header stuff
    if (hideStuff === true) {
        $('div.lineup').hide();
        $('div#centered').find('div:eq(1), div#MyMenu1').hide();
        $('p:contains("Exclusive option")').parent('div').hide();
        $('div.gen12').parent('div').hide();
        $('div.p8.dloc').parent('div').hide();
        $('div#listpornstarsdiv, div#related, div.lfoo').hide();
        $('div.dfoo1, div.dfoo2, div.dfoo3, div.dsecure.genmed, div#who').hide();
    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    // Get the link
    //////////////////////////////////////////////////////////////////////////////////////////////
    var theLink = getLink();


    //////////////////////////////////////////////////////////////////////////////////////////////
    // Get the site
    //////////////////////////////////////////////////////////////////////////////////////////////
    var theSite = getSite($(document));


    //////////////////////////////////////////////////////////////////////////////////////////////
    // Get the "type" from the site
    //////////////////////////////////////////////////////////////////////////////////////////////
    var theType = getSiteType(theSite);


    if (!justGetLinks) {
        //$('div').hide();

        var data18DataLinks = [];
        var data18DataLinksProcessed = [];
        var data18DataLinksUnprocessed = [];

        ///////////////////////////////////////////////
        //Get the links
        ///////////////////////////////////////////////
        $.when(getTextFile('data/data18DataLinks.txt')).done(function (data) {
            data18DataLinks = data.split('\r\n');

            if (data18DataLinks.length > 0) {
                console.log('data18DataLinks: [' + data18DataLinks.length + ']');
            } else {
                console.log('!!-ERROR-!!' + '\t' + 'data18DataLinks data not found!');
            }

            ///////////////////////////////////////////////
            //Get the processed links
            ///////////////////////////////////////////////
            $.when(getTextFile('data/data18DataLinksProcessed.txt')).done(function(data) {
                data18DataLinksProcessed = data.split('\r\n');

                if (data18DataLinksProcessed.length > 1) {
                    console.log('data18DataLinksProcessed: [' + data18DataLinksProcessed.length + ']');
                } else {
                    console.log('!!-ERROR-!!' + '\t' + 'data18DataLinksProcessed data not found!');
                }

                //Get the list of unprocessed links
                data18DataLinksUnprocessed = data18DataLinks.subtract(data18DataLinksProcessed);
                console.log('data18DataLinksUnprocessed: [' + data18DataLinksUnprocessed.length + ']');

                ///////////////////////////////////////////////
                //Get the scene data
                ///////////////////////////////////////////////
                if (data18DataLinksUnprocessed.length > 0) {
					getSceneData(data18DataLinksUnprocessed.first(500));
                } else {
                    getSceneData([window.location.href]);
                }
                
            });
        });
    } else {
        //var theLinkInfo = [theType, theLink].join('\t');
		var theLinkInfo = theLink;

        //Append the data to the text file
        if (theLinks.indexOf(theLinkInfo) < 0) {
            theLinks.push(theLinkInfo);
            store.set('theLinks', theLinks);
            appendDataToTextFile(theLinkInfo, 'data/data18DataLinks.txt');
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////
    // Go to the next scene
    //////////////////////////////////////////////////////////////////////////////////////////////
    if (clickThroughScenes) {
        var timer = null;

        //var clickNextScene = function() {
        //    //Wait n seconds then click the "next scene" link
        //    $('#next_scene').click();

        //    timer = setTimeout(clickNextScene, 1000);
        //};

        function clickNextScene() {
            timer = setTimeout(function () {
                //Wait n seconds then click the "next scene" link
                $('#next_scene').click();
            }, 1000);
        }

        if ($('#next_scene').length > 0) {
            clickNextScene();
        } else {
            clearTimeout(timer);
            //logOutput(theType);
        }
    }
});


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

                var theSite = getSite($thePage);
                var theSceneId = getData18Id(theUrl);
                var theTitle = getTitle($thePage);
                var theSiteType = getSiteType(theSite);
                var theReleaseDate = getReleaseDate($thePage);
                var thePerformers = getPerformers($thePage);
                var theStory = getStory($thePage);
                var theCategories = getCategories($thePage);
                var thePlexFileName = createPlexFileName(theSceneId, theReleaseDate, theTitle, theSiteType);
                var theStudio = getStudio($thePage);

                var outputData = [
                    theSceneId,
                    theStudio,
					theSiteType,
					theSite,
					theReleaseDate,
					theTitle,
					thePerformers,
					theStory,
					theCategories,
                    thePlexFileName,
					theUrl
                ];

                var theData = outputData.join('\t');

                //Append the data to the text file
                appendDataToTextFile(theData, 'data/data18Data.txt');

                //Append the processed link to the "processed links" file
                appendDataToTextFile(theUrl, 'data/data18DataLinksProcessed.txt');
            }).fail(function () {
                console.log('FAIL!');
            });

            //console.log('finished [' + i + '/' + totalCounter + ']...');
            xhrs.push(xhr);
        });

        $.when.apply($, xhrs).done(function () {
            document.title = '!!-FINISHED-!!';
        });
    }
}





//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Functions for getting scene information
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
///////////////////////////////////////////////////////
// Get the link
///////////////////////////////////////////////////////
function getLink() {
    var returnData = '';

    returnData = window.location.href;

    return returnData;
}

///////////////////////////////////////////////////////
// Get the site
///////////////////////////////////////////////////////
function getSite($thePage) {
    var returnData = '';

    returnData = $thePage.find('div.p8.dloc').find('i:contains("Site")').prev('a').text().trim();

    return returnData;
}

///////////////////////////////////////////////////////
// Get the site type
///////////////////////////////////////////////////////
function getSiteType(theSite) {
    var returnData = '';

    var result = $.grep(siteTypes, function (e) { return e.siteTitle === theSite; });

    returnData = 'UNK';

    if (result.length === 1) {
        returnData = result[0].siteType;
    }

    return returnData;
}

///////////////////////////////////////////////////////
// Get the story
///////////////////////////////////////////////////////
function getStory($thePage) {
    var returnData = '';

    returnData = $thePage.find('p:contains("Story:")').text().replace('Story:', '').trim().compact();
    
    return returnData;
}

///////////////////////////////////////////////////////
// Get the Data18 ID
///////////////////////////////////////////////////////
function getData18Id(theLink) {
    var returnData = '';

    returnData = theLink.replace('http://www.data18.com/content/', '').trim();

    return returnData;
}

///////////////////////////////////////////////////////
// Get the performers
///////////////////////////////////////////////////////
function getPerformers($thePage) {
    var returnData = '';

    var $thePerformersElements = $thePage.find('p:contains("Starring:")').find('a:not(.gen11):not(:contains("Search")):not(:contains("Who\'s"))');
    var thePerformersArray = [];

    $thePerformersElements.each(function () {
        thePerformersArray.push($(this).text().trim().compact());
    });

    returnData = thePerformersArray.join('|');

    return returnData;
}

///////////////////////////////////////////////////////
// Get the scene date
///////////////////////////////////////////////////////
function getReleaseDate($thePage) {
    var returnData = '';

    var theDate = $thePage.find('a[title="Show me all updates from this date"]').text();
    returnData = moment(new Date(theDate)).format('YYYY-MM-DD');

    return returnData;
}

///////////////////////////////////////////////////////
// Get the scene title
///////////////////////////////////////////////////////
function getTitle($thePage) {
    var returnData = '';

    returnData = $thePage.find('h1').first().text().trim();

    return returnData;
}

///////////////////////////////////////////////////////
// Get the scene title
///////////////////////////////////////////////////////
function createPlexFileName(theSceneId, theDate, theTitle, theType) {
    var returnData = '';

    returnData = theSceneId + ' (' + theDate + ' ' + theTitle.trim() + ') ' + theType;

    return returnData;
}

///////////////////////////////////////////////////////
// Get the scene categories
///////////////////////////////////////////////////////
function getCategories($thePage) {
    var returnData = '';

    var $theCategoriesElements = $thePage.find('div#moviewrap').next('div').find('div:contains("Categories")').find('a:not(:contains("Filter"))');
    var theCategoriesArray = [];

    $theCategoriesElements.each(function () {
        theCategoriesArray.push($(this).text().replace('\n', '').trim().compact());
    });

    returnData = theCategoriesArray.join('|');

    return returnData;
}

///////////////////////////////////////////////////////
// Get the total number of scenes
///////////////////////////////////////////////////////
function getTotalScenes($thePage) {
    var returnData = '';

    var $divNavLineClone = $thePage.find('div#navline').clone();
    $divNavLineClone.find('span, a').remove();
    returnData = $divNavLineClone.text().replace('-', '').replace('#', '').trim();

    return returnData;
}

///////////////////////////////////////////////////////
// Get the studio/network
///////////////////////////////////////////////////////
function getStudio($thePage) {
    var returnData = '';

    returnData = $thePage.find('p:contains("distributed by") a.gen').text().trim();

    return returnData;
}





//////////////////////////////////////////////////////////////////////////////////////////////
// Create and log the output
//////////////////////////////////////////////////////////////////////////////////////////////
function logOutput(theType) {
    console.log(GM_getValue('data18data' + theType).length);
    var output = GM_getValue('data18data' + theType).join('\n');
    console.log(output);
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


function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}