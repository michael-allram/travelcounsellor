<?php
header("Content-Type: text/html; charset=utf-8");

include 'db_connect.php';

if(!isset($_COOKIE['travelcounsellorid'])){
  return 0;
}

$cookieId = $_COOKIE['travelcounsellorid'];


$sql = "SELECT * FROM my_route";


if ($result = $conn->query($sql)) {
    $output .= "<table>";
    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
       $output .= "<tr><td>" . $row['street'] . "</td></tr>";
     
    }
    $output .= "</table>";
    /* free result set */
    $result->free();
}
echo $output;


$conn->close();




?>
