<?php
$place_id = $_GET['place_id'];

$json=file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?placeid=' . $place_id . '&key=AIzaSyBBxg4WQz_rdeQT8_0b8rX9Y_7CEiBOB4E');
//decode json
$data =  json_decode($json);

echo $data->result->photos[0]->photo_reference;
echo $data->result->name;
echo "hallo";




?>
