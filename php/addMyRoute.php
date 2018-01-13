<?php

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

include 'db_connect.php';

$placeId = $_GET['id'];
$name = $_GET['name'];
$street = $_GET['street'];
$rating = $_GET['rating'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];


if(!isset($_COOKIE['travelcounsellorid'])){
  $randomstring = generateRandomString(10);
  setcookie("travelcounsellorid",$randomstring);
}

$cookieId = $_COOKIE['travelcounsellorid'];

$sql = "INSERT INTO my_route (cookie_id, places_id, name, street, rating, lat, lng)
VALUES ('$cookieId', '$placeId', '$name', '$street', $rating, $lat, $lng)";

echo $placeId . " ! ! " . $name . " ! ! " . $street . " ! ! " . $rating . " ! ! " . $lat . " ! ! " . $lng . " ! ! " . $cookieId;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();




?>
