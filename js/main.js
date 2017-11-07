
// Wait for user to finish typing
// callback: The callback function
// wait: The number of milliseconds to wait after the the last key press before firing the callback
// highlight: Highlights the element when it receives focus
// allowSubmit: Allows a non-multiline element to be submitted (enter key) regardless of captureLength
// captureLength: Minimum # of characters necessary to fire the callback

$(document).ready(function() {

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

function get_places(lat,long,category){
	var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
	var method = "POST";
	var postData = "key=AIzaSyARggcxgxIl3yr-G4A_oeK15zOW2FPFY5Q";	//location=-33.8670522,151.1957362&radius=500&type=restaurant&
	postData += "location=" + lat + "," + long;
	postData += "radius=5000";	// 5km, could be changed or added as a configurable later
	postData += "type=" + category;

	// if it is not true, it'll block ALL execution waiting for server response.
	var shouldBeAsync = true;

	var request = new XMLHttpRequest();

	// This function attached to the XMLHttpRequest "onload" property specifies how
	// the HTTP response will be handled.
	// request.onreadystatechange can also be used if this doesn't work
	request.onload = function () {
	   // You can get all kinds of information about the HTTP response.
	   var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
	   var data = request.responseText; // Returned data, e.g., an HTML document.
	}

	request.open(method, url, shouldBeAsync);

	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	// Actually sends the request to the server.
	request.send(postData);

	// because the call/answer is abynchronous I'm not sure the following is correct
	// we couls also treat the data in the function above and call whatever needs to know what the date is from there instead of returning it
	var jsObj = null;

	if (status == 200) {
		jsObj = data.results;
		// TODO: order the data
	}

	return jsObj;
}
