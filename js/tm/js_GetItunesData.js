$(document).ready(function() {
	$.when(getJsonFile('data/aggregate.json')).done(function (data) {
		$.each(data, function() {
			var theResult = $(this)[0];
			var theReleaseDate = moment(theResult.releaseDate).format('YYYY-MM-DD');
			var theReleaseYear = moment(theResult.releaseDate).format('YYYY');
			var theCollectionName = theResult.collectionName;
			
			if (theReleaseYear < 1990 && 
			theCollectionName.indexOf('Remastered') < 0 && 
			theCollectionName.indexOf('Deluxe') < 0 && 
			theCollectionName.indexOf('Greatest') < 0) {
				console.log(theResult);
			}
		});
	});
});

/////////////////////////////////////////////////////////////////////////////
// Get json file using AJAX
/////////////////////////////////////////////////////////////////////////////
function getJsonFile(filePath) {
    return $.ajax({
        url: 'http://www.friskylingo.com/' + filePath,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    });
}