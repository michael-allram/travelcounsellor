<?php
$latitude = "10.0";
$longitude = "20.0";
$radius = 
$type = 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='. $latitude . ','  . $longitude .'&radius=500&key=AIzaSyBBxg4WQz_rdeQT8_0b8rX9Y_7CEiBOB4E');
$result = curl_exec($ch);
echo $result;


?>
