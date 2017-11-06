
// Wait for user finishing typing
// callback: The callback function
// wait: The number of milliseconds to wait after the the last key press before firing the callback
// highlight: Highlights the element when it receives focus
// allowSubmit: Allows a non-multiline element to be submitted (enter key) regardless of captureLength
// captureLength: Minimum # of characters necessary to fire the callback

var options = {
    callback: function (value) { alert("street entered");},
    wait: 750,
    highlight: true,
    allowSubmit: false,
    captureLength: 2
}

$("#street").typeWatch( options );



function street_to_geo(street){
      //encodes the street string into url friendly format
      var street_encoded = encodeURIComponent(street);
      var uri = "http://nominatim.openstreetmap.org/search/" + street_encoded + "?format=json";
      alert(uri);
      //makes the the jquery call and gets json back 
      $.getJSON(uri, function(data) {
        //make js obj containing lat and long
        var obj = {latitude: data[0].lat, longitude: data[0].lon};
        alert(obj.latitude + " " + obj.longitude);
        //return obj; 
      });
      
    }


