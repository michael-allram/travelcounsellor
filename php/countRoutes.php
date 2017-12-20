<?php

include 'db_connect.php';
$cookie_id = $_COOKIE['travelcounsellorid'];
$sql = "SELECT COUNT(*) as COUNTED FROM my_route WHERE cookie_id = '$cookie_id'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row["COUNTED"];
} else {
    echo "0";
}
$conn->close();


?>
