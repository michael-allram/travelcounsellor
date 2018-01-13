<?php
header("Content-Type: text/html; charset=utf-8");

include 'db_connect.php';


if(!isset($_COOKIE['travelcounsellorid'])){
  return 0;
}

$cookieId = $_COOKIE['travelcounsellorid'];


$sql = "SELECT * FROM my_route WHERE cookie_id = '$cookieId'";
echo $sql;

if ($result = $mysqli->query($sql)) {

    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
        printf ("<tr><td>%s</td><td>%s</td><td>%f</td><td><a href='javascript:delete(id)'>%s</a></td></tr>", $row["name"], $row["street"], $row["rating"], $row["id"]);
    }

    /* free result set */
    $result->free();
}


$conn->close();




?>
