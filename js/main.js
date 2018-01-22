
// Wait for user to finish typing
// callback: The callback function
// wait: The number of milliseconds to wait after the the last key press before firing the callback
// highlight: Highlights the element when it receives focus
// allowSubmit: Allows a non-multiline element to be submitted (enter key) regardless of captureLength
// captureLength: Minimum # of characters necessary to fire the callback


$(document).ready(function() {

	//stop loader.gif and overlay
	showMyRoute();
	stop_loader();
	//enable typewatch
	//$('#street').typeWatch({
	//	captureLength: 2,
	//	wait: 1750,
    	//	highlight: true,
	//	callback: function(value) {
	//		//alert("typing finished");
	//		street_to_geo(value);
	//	}
	//});
});


function start_loader(){
	$('#loader').fadeIn('slow');
	$('#overlay').fadeIn('slow');
}

function stop_loader(){
	$('#loader').fadeOut('slow');
	$('#overlay').fadeOut('slow');
}

function addMyRoute(id, name, street, rating, lat, lng){
	$.ajax({
  		method: "GET",
  		url: "/php/addMyRoute.php",
  		data: { id: id, name: name, street: street, rating: rating, lat: lat, lng: lng}
	})
  	.done(function( msg ) {
		//alert("finished");
    	alert(msg);
	showMyRoute();
  	});
}

function delMyRoute(id) {
	$.ajax({
  		method: "GET",
  		url: "/php/delMyRoute.php",
  		data: { id: id }
	})
  	.done(function( msg ) {
		//alert("finished");
    	alert(msg);
	showMyRoute();
  	});	
}

function showMyRoute(){
	$.ajax({
  		method: "GET",
  		url: "/php/showMyRoute.php"
	})
  	.done(function( data ) {
			$('#myRoute').html(data);
			if(data == "no places") {
				$('#navigation').hide();	
			} else {
				$('#navigation').show();	
			}
			//alert("data loaded");
			
		
    	
  	});
}

function geo_to_street(lat,long){
	var uri = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1";
	$.getJSON(uri, function(data) {

        var obj = {road: data.address.road, city: data.address.city, village: data.address.village,  house_number: data.address.house_number, country: data.address.country };
		if(obj.city == undefined) {
			var city = obj.village;  
		} else {
			var city = obj.city;	
		}
		//alert(obj.city + obj.village + city);
		var string = obj.road + " " + obj.house_number + " " + city + " " + obj.country;
		$('#street').val(string);
		stop_loader();
    });
}

function get_weather2(lat, lon) {
	var location = lat + ", " + lon;
	$.simpleWeather({
    location: location,
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      //html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      //html += '<li class="currently">'+weather.currently+'</li>';
      //html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
	
}

function street_to_geo(){
    start_loader();
    var street = $('#street').val();
    if(street == "") {alert("please enter your starting position!"); stop_loader(); return;}
    //encodes the street string into url friendly format
    var street_encoded = encodeURIComponent(street);
    var uri = "https://nominatim.openstreetmap.org/search/" + street_encoded + "?format=json";
    //alert(uri);
    //makes the the jquery call and gets json back
    $.getJSON(uri, function(data) {
	    //make js obj containing lat and long
		if(data==""){alert("starting position not found"); stop_loader(); return;}

	    var obj = {latitude: data[0].lat, longitude: data[0].lon};
		//return obj;
		//stop_loader();
	        //alert(obj.latitude + " " + obj.longitude);

		get_places2(obj.latitude, obj.longitude);
	    	

		//get_places(obj.latitude, obj.longitude);
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

function get_places(lat, long) {
	var category = $('#category').val();

	$.ajax({
  		method: "GET",
  		url: "/php/get_places.php",
  		data: { lat: lat, long: long, radius: "1000", type: category }
	})
  	.done(function( msg ) {
		//alert("finished");
    	$('#main-area').html(msg);
		stop_loader();
  	});
}

function get_places2(lat, long) {
	var category = $('#category').val();

	$.ajax({
  		method: "GET",
  		url: "/php/get_places2.php",
  		data: { lat: lat, long: long, radius: "1000", type: category }
	})
  	.done(function( msg ) {
  		msg = JSON.parse(msg)
		//alert("finished");
    	//$('#main-area').html(msg);
    	add_details(msg, lat, long)
    	sort_json(msg, 'rating_over_distance', false);
    	$('#main-area').html(json_to_table(msg));
		get_weather2(lat, long);
		stop_loader();
		
  	});
}

function json_to_table(json_object) {
	var str = "<div class=\"datatable\">";
	str += "<div class=\"table-header\"><div class=\"name\">Name</div><div class=\"street\">Street</div><div class=\"rating\">Rating</div><div class=\"distance\">Distance</div><div class=\"opened\">Open</div></div>";

	for(i in json_object) {
		var placeid = json_object[i].place_id;
		if(placeid == "") {break;}
		str += "<div class=\"row\"><div class=\"data\" onClick=\"showDetails('placeid')\">";
		str += "<div class=\"name\">" + json_object[i].name + "</div>";
		str += "<div class=\"street\">" + json_object[i].vicinity + "</div>";
		str += "<div class=\"rating\">" + json_object[i].rating + "</div>";
		str += "<div class=\"distance\">" + json_object[i].distance + "</div>";
		if (json_object[i].opening_hours) {
			if (json_object[i].opening_hours.open_now) {
				str += "<div class=\"opened\">" + 
					"<i class=\"fa fa-check\" aria-hidden=\"true\" style=\"color: green;\"></i>" 
					+ "</div>";
			} else {
				str += "<div class=\"opened\">" +
					"<i class=\"fa fa-times\" aria-hidden=\"true\"></i>"
					+ "</div>";
			}
		}
		str +="</div>";
		var name = encodeURI(json_object[i].name);
		var street = encodeURI(json_object[i].vicinity);
		//street = street.replace(",","-");
		var rating = json_object[i].rating;
		var lat = json_object[i].geometry.location.lat;
		var lng = json_object[i].geometry.location.lng;
		
		
		
		str += "<div class=\"add-button\" onClick=\"addMyRoute('" + 
			placeid + "','" + name + "','" + street + "'," + rating + "," + lat + "," + lng
			+ ")\"><i class=\"fa fa-bookmark-o\" aria-hidden=\"true\"></i> add</div>";
		str += "</div>";
	}
	

	return str;
}

function add_details(json_object, lat, long) {
	for (x in json_object) {
		json_object[x].distance = Math.round(1000 * calc_distance(lat, long, json_object[x].geometry.location.lat, json_object[x].geometry.location.lng));
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

		    // return pos;
		    $('#street').val("");
			var location = pos.lat + " " + pos.lng;
		    geo_to_street(pos.lat,pos.lng);
		    //stop_loader();
			//alert(location);
		    //get_places(pos.lat,pos.lng);
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
