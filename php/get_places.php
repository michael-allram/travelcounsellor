<?php
$latitude = $_GET['lat'];
$longitude = $_GET['long'];
$radius = $_GET['radius'];
$type = $_GET['type'];

//function to calculate distance
function distance($lat1, $lon1, $lat2, $lon2, $unit) {
  if($lat1 == NULL || $lat2 == NULL || $lon1 == NULL || $lon2 == NULL) {return "";}
  $theta = $lon1 - $lon2;
  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
  $dist = acos($dist);
  $dist = rad2deg($dist);
  $miles = $dist * 60 * 1.1515;
  $unit = strtoupper($unit);

  if ($unit == "K") {
    return ($miles * 1.609344);
  } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
        return $miles;
      }
}

//perform request
$json=file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='. $latitude . ','  . $longitude .'&radius=' . $radius . '&type=' . $type . '&key=AIzaSyBBxg4WQz_rdeQT8_0b8rX9Y_7CEiBOB4E');

//decode json
$data =  json_decode($json);

//make table with content
echo "<table>";

echo "<tr><td>Name</td><td>Street</td><td>Rating</td><td>Distance</td><td>is open?</td></tr>";

for($i=0;$i<20;$i++){
  $placeid = $data->results[$i]->place_id;
  if($placeid == "") {break;}
  echo "<tr onClick=\"showDetails('$placeid')\">";
  echo "<td>" . $data->results[$i]->name . "</td>";
  echo "<td>" . $data->results[$i]->vicinity . "</td>";
  echo "<td>" . $data->results[$i]->rating . "</td>";
  echo "<td>" . round(distance($latitude,$longitude,$data->results[$i]->geometry->location->lat,$data->results[$i]->geometry->location->lng,"K")*1000) . "</td>";
  echo "<td>" . $data->results[$i]->opening_hours->open_now . "</td>";
  echo "<td onClick=\"addMyRoute('$placeid')\">add</td>";
  echo "</tr>";
}
echo "</table>";



?>
