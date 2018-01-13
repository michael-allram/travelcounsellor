<?php
header("Content-Type: text/html; charset=utf-8");

include 'db_connect.php';

echo "TEST";
if(!isset($_COOKIE['travelcounsellorid'])){
  return 0;
}

$cookieId = $_COOKIE['travelcounsellorid'];


$sql = "SELECT * FROM 'my_route'";
echo $sql;

if ($result = $mysqli->query($sql)) {
    echo "<table>";
    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
       echo $row['street'];
    }
    echo "</table>";
    /* free result set */
    $result->free();
}


$conn->close();




?>
