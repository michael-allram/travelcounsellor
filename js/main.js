
// Wait for user to finish typing
// callback: The callback function
// wait: The number of milliseconds to wait after the the last key press before firing the callback
// highlight: Highlights the element when it receives focus
// allowSubmit: Allows a non-multiline element to be submitted (enter key) regardless of captureLength
// captureLength: Minimum # of characters necessary to fire the callback

$(document).ready(function() {
	
	//stop loader.gif and overlay
	stop_loader();
	
		
	
	//enable typewatch
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


function start_loader(){
	$('#loader').fadeIn('slow');	
	$('#overlay').fadeIn('slow');
}

function stop_loader(){
	$('#loader').fadeOut('slow');	
	$('#overlay').fadeOut('slow');
	
}

function street_to_geo(street){
      start_loader();
      //encodes the street string into url friendly format
      var street_encoded = encodeURIComponent(street);
      var uri = "https://nominatim.openstreetmap.org/search/" + street_encoded + "?format=json";
      //alert(uri);
      //makes the the jquery call and gets json back 
      $.getJSON(uri, function(data) {
        //make js obj containing lat and long
        var obj = {latitude: data[0].lat, longitude: data[0].lon};
	stop_loader();
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

function get_places(lat, long, category){
	
}


function get_places2(lat, long, category) {
	//alert("get_places started");
	var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
	var method = "POST";
	var postData = "key=AIzaSyAjD6F_48FMF8Qw9E85aQn_1rXFaIwEqv8";	// TODO get key
	postData += "location=" + lat + "," + long;
	postData += "radius=5000";	// 5km, could be changed or added as a configurable later
	postData += "type=" + category;

	// if it is not true, it'll block ALL execution waiting for server response.
	var shouldBeAsync = true;

	var request = new XMLHttpRequest();

	// This function attached to the XMLHttpRequest "onload" property specifies how the HTTP response will be handled.
	// request.onreadystatechange can also be used if this doesn't work
	request.onload = function () {
		// You can get all kinds of information about the HTTP response.
		var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
		var data = request.responseText; // Returned data, e.g., an HTML document.
		//alert(status);
		var jsObj = null;

		if (status == 200) {
			//alert("status 200");
			jsObj = data.results;
			//alert(jsObj);
			add_details(jsObj, lat, long);
			sort_json(jsObj, 'rating_over_distance', false);	// false because we want descending order
			//alert(jsObj[0].short_name);
		}

		// TODO: call whatever needs to use the jsObj
		alert("finished loading");
	}

	request.open(method, url, shouldBeAsync);

	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	// Actually sends the request to the server.
	request.send(postData);
}

function add_details(json_object, lat, long) {
	for ( x in json_object) {
		json_object[x].distance = calc_distance(lat, lon, json_object[x].geometry.location.lat, json_object[x].geometry.location.lng);
		json_object[x].rating_over_distance = json_object[x].rating/json_object[x].distance;
	}
}

function sort_json(json_object, key_to_sort_by, ascending) {
    function sortByKey(a, b) {
        var x = a[key_to_sort_by];
        var y = b[key_to_sort_by];
        if (ascending ==  true) {
        	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        } else {
        	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    }

    json_object.sort(sortByKey);
}

//returns a Coordinate, could add some other functionality of what to do when geolocation is not supported
var pos;
function get_my_location(){
	start_loader();
	var options = {
	  enableHighAccuracy: true
	};
	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
	      
	      //return pos;
		var location = pos.lat + " " + pos.lng;
	      	//stop_loader();
		//alert(location);
	        get_places(-33.8670522,151.1957362,'restaurant');
	      
      }, 
      function(err){
	      stop_loader(); alert("could not get device position");
      		},
      options);
    } 
	
}

function get_weather(lat, lon){

	//if the function does not work, maybe the get_json.php should be in root, or path should be js/get_json.php

    var api_url = "js/get_json.php?";
    var type = "type=weather"

	api_request = api_url;
    api_request += type;
    api_request += "&lat="
    api_request += lat;
    api_request += "&lon="
    api_request += lon;

    //document.write(api_request);

    $(function () {
        $.getJSON(
            api_request,
            function (data) {
                $("#reply").html(JSON.stringify(data));
                return(JSON.stringify(data.weather[0].main));
            });
    });

}
