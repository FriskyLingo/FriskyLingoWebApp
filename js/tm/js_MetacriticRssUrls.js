/// <reference path="../../Scripts/sugar.js" />
/// <reference path="../../Scripts/moment.js" />

$(document).ready(function () {
    console.log('v2');
	
	var $input = $('<input type="button" value="Add to RSS" id="btnAddRss"/>');
	$input.appendTo($('body'));
	
	var $title = $('h1.product_title span');
    
	$input.position({
		my: 'left bottom',
		at: 'right+10 bottom-2',
		of: 'h1.product_title span'
	});

    var theUrls = [];

    ///////////////////////////////////////////////
    //Get the current RSS URLs
    ///////////////////////////////////////////////
    $.when(getTextFile('data/movieRssUrls.txt')).done(function (data) {
        theUrls = data.split('\r\n');

        if (theUrls.length > 0) {
            console.log('theUrls: [' + theUrls.length + ']');
        } else {
            console.log('!!-ERROR-!!' + '\t' + 'theUrls data not found!');
        }
    });
	
	
	$(document).on('click', '#btnAddRss', function() {
		var theUrl = createRssUrl($title.text().trim());
		//appendDataToTextFile(theUrl, 'data/movieRssUrls.txt');
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
// Create RSS URL for media item
/////////////////////////////////////////////////////////////////////////////
function createRssUrl(title) {
	console.log(title);
	return title;
}



function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}