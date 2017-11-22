<?php

//header for returning json file:
header('Content-type: application/json');
//remove later: display errors on:
//ini_set('display_errors','On');

if( $_GET["type"] === weather){

//$lat = "47.2";
//$lon = "11.4";
$lat = $_GET["lat"];
$lon = $_GET["lon"];

$apikey = "9f0df58f5f90d016769679752362fe02";
$api_url = "http://api.openweathermap.org";
$api_request = $api_url;
$api_request .=  "/data/2.5/weather?lat=";
$api_request .= $lat;
$api_request .= "&lon=";
$api_request .= $lon;
$api_request .= "&APPID=";
$api_request .= $apikey;

}
//elseif ($GET["type"] === //typeOf Etienne do.... {} //store under


//allow url fopen
ini_set("allow_url_fopen",1);

$json_file = file_get_contents($api_request);
//$json_decoded =	json_decode($json_file, TRUE);

echo $json_file;
//echo $api_request;
?>
