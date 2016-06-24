var echoNestSearchStrings = [
"http://developer.echonest.com/api/v4/song/search?api_key=LFGJQQFN1VNH2R2EC&artist=the+black+keys&title=fever"
];

function findTrack(echoNestUrl) {
    console.log(echoNestUrl);
    
	$.ajax({
  	  url: echoNestUrl,
      type: "GET",
      dataType: "jsonp"
		}).done(function(){
        console.log("done");
            //console.log(data);
			//if (data && data.resultCount > 0) {
                //var isExplicit = false;

                //$(data.results).each(function(index) {
                  //if ($(this)[0].trackExplicitness == 'explicit') {
                  //if (data.results[0].trackExplicitness == 'explicit') {
                  //artistName
                  //collectionName
                  //trackName
                    //console.log(data.results[0].trackName + '\t' + data.results[0].artistName);
                    //return false;
                  //}
                //});
			//}
	});
}

function getTrackInfo(theUrl) {
	$.ajax({
  	  url: theUrl,
      type: "POST",
      dataType: 'jsonp',
		}).done(function(data){
            console.log(data);
			//if (data && data.resultCount > 0) {
                //var isExplicit = false;

                //$(data.results).each(function(index) {
                  //if ($(this)[0].trackExplicitness == 'explicit') {
                  //if (data.results[0].trackExplicitness == 'explicit') {
                  //artistName
                  //collectionName
                  //trackName
                    //console.log(data.results[0].trackName + '\t' + data.results[0].artistName);
                    //return false;
                  //}
                //});
			//}
	});
}


$(document).ready(function(){
    $(echoNestSearchStrings).each(function(index) {
        findTrack(echoNestSearchStrings[index]);
    });
});