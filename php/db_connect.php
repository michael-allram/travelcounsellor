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






?>
