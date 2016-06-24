var itunesApiUrls = [
"https://itunes.apple.com/search?term=Dark%20Fantasy%20Kanye%20West",
"https://itunes.apple.com/search?term=Gorgeous%20Kanye%20West%20feat.%20Kid%20Cudi%20&%20Raekwon",
"https://itunes.apple.com/search?term=Power%20Kanye%20West",
"https://itunes.apple.com/search?term=All%20of%20the%20Lights%20(interlude)%20Kanye%20West",
"https://itunes.apple.com/search?term=All%20of%20the%20Lights%20Kanye%20West",
"https://itunes.apple.com/search?term=Monster%20Kanye%20West%20feat.%20JAY%20Z,%20Rick%20Ross,%20Nicki%20Minaj%20&%20Bon%20Iver",
"https://itunes.apple.com/search?term=So%20Appalled%20Kanye%20West%20feat.%20Swizz%20Beatz,%20JAY%20Z,%20Pusha%20T,%20Cyhi%20the%20Prynce%20&%20RZA",
"https://itunes.apple.com/search?term=Devil%20in%20a%20New%20Dress%20Kanye%20West%20feat.%20Rick%20Ross",
"https://itunes.apple.com/search?term=Runaway%20Kanye%20West%20feat.%20Pusha%20T",
"https://itunes.apple.com/search?term=Hell%20of%20a%20Life%20Kanye%20West",
"https://itunes.apple.com/search?term=Blame%20Game%20Kanye%20West%20feat.%20John%20Legend",
"https://itunes.apple.com/search?term=Lost%20in%20the%20World%20Kanye%20West%20feat.%20Bon%20Iver",
"https://itunes.apple.com/search?term=Who%20Will%20Survive%20in%20America%20Kanye%20West"
];

function getTrackInfo(theUrl) {
	$.ajax({
  	  url: theUrl,
      type: "POST",
      dataType: 'jsonp',
		}).done(function(data){
			if (data && data.resultCount > 0) {
                var isExplicit = false;

                //$(data.results).each(function(index) {
                  //if ($(this)[0].trackExplicitness == 'explicit') {
                  if (data.results[0].trackExplicitness == 'explicit') {
                  //artistName
                  //collectionName
                  //trackName
                    console.log(data.results[0].trackName + '\t' + data.results[0].artistName);
                    return false;
                  }
                //});
			}
	});
}


$(document).ready(function(){
    $(itunesApiUrls).each(function(index) {
        getTrackInfo(itunesApiUrls[index]);
    });
});