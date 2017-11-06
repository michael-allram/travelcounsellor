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


