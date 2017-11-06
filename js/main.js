
// Wait for user to finish typing
// callback: The callback function
// wait: The number of milliseconds to wait after the the last key press before firing the callback
// highlight: Highlights the element when it receives focus
// allowSubmit: Allows a non-multiline element to be submitted (enter key) regardless of captureLength
// captureLength: Minimum # of characters necessary to fire the callback

$(document).ready(function() {
            
	alert("mainjs loaded");
	$('#street').typeWatch({
		captureLength: 2,
		wait: 1750,
    		highlight: true,
		callback: function(value) {
			//alert("typing finished");
			street_to_geo(value);
		}
	});
});


function street_to_geo(street){
      //encodes the street string into url friendly format
      var street_encoded = encodeURIComponent(street);
      var uri = "http://nominatim.openstreetmap.org/search/" + street_encoded + "?format=json";
      //alert(uri);
      //makes the the jquery call and gets json back 
      $.getJSON(uri, function(data) {
        //make js obj containing lat and long
        var obj = {latitude: data[0].lat, longitude: data[0].lon};
        alert(obj.latitude + " " + obj.longitude);
        //return obj; 
      });
}

function calc_distance(lat1, lon1, lat2, lon2) {
	var unit = "K";
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit=="K") { dist = dist * 1.609344; }
	if (unit=="N") { dist = dist * 0.8684; }
	return dist;
}


