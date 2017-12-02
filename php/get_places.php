<?php
$latitude = $_GET['lat'];
$longitude = $_GET['long'];
$radius = $_GET['radius'];
$type = $_GET['type'];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='. $latitude . ','  . $longitude .'&radius=' . $radius . '&type=' . $type . '&key=AIzaSyBBxg4WQz_rdeQT8_0b8rX9Y_7CEiBOB4E');
$data = curl_exec($ch);

echo $data[0].id;


?>
