<?php
$servername = "localhost";
$username = "admin_tc";
$password = "Cdq1m6@6";
$database = "admin_travelcounsellor";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if (!$conn->set_charset("utf8")) {
      printf("Error loading character set utf8: %s\n", $conn->error);
  } else {
      //printf("Current character set: %s\n", $conn->character_set_name());
  }




?>
