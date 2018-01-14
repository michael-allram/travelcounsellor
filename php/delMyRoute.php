<?php
header("Content-Type: text/html; charset=utf-8");

include 'db_connect.php';

$id = $_GET['id'];

$sql = "DELETE FROM my_route WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();




?>
