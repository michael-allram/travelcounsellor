<?php
header("Content-Type: text/html; charset=utf-8");


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
$name = urldecode($_GET['name']);
$street = urldecode($_GET['street']);
$rating = $_GET['rating'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];


if(!isset($_COOKIE['travelcounsellorid'])){
  $randomstring = generateRandomString(10);
  setcookie("travelcounsellorid",$randomstring, time()+36000, '/');
  $cookieId = $randomstring;
} else {
    $cookieId = $_COOKIE['travelcounsellorid'];
}

mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'", $conn);


$sql = "INSERT INTO my_route (cookie_id, places_id, name, street, rating, lat, lng)
VALUES ('$cookieId', '$placeId', '$name', '$street', '$rating', '$lat', '$lng')";
echo $sql;
echo $placeId . " ! ! " . $name . " ! ! " . $street . " ! ! " . $rating . " ! ! " . $lat . " ! ! " . $lng . " ! ! " . $cookieId;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();




?>
