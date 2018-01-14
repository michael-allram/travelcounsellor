<?php
header("Content-Type: text/html; charset=utf-8");

include 'db_connect.php';

if(!isset($_COOKIE['travelcounsellorid'])){
  return 0;
}

$cookieId = $_COOKIE['travelcounsellorid'];


$sql = "SELECT * FROM my_route WHERE cookie_id = '$cookieId'";


if ($result = $conn->query($sql)) {
  
    $row_cnt = $result->num_rows;
    if($row_cnt < 1) {
      return 0; 
    }
    $output .= "<div id='myRouteHeadline'>My Route</div>";
    $output .= "<div class='datatable'>";
      $output .= "<div class='table-header'>";
        $output .= "<div class='name'>Name</div>";
        $output .= "<div class='street'>Street</div>";
        $output .= "<div class='rating'>Rating</div>";
      $output .= "</div>";
      $output .= "<div class='row'>";
        $output .= "<div class='data'>";
          $output .= "<div class='name'>" . $row['name'] . "</div>";
          $output .= "<div class='street'>" . $row['street'] . "</div>";
          $output .= "<div class='rating'>" . $row['rating'] . "</div>";
          $output .= "<div class='del' onClick='delMyRoute(" . $row['id'] . ")>del</div>";
        
        
    //$output .= "<table>";
    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
       //$output .= "<tr class='row'><td>" . $row['name'] . "</td><td>" . $row['street']  . "</td><td>" . $row['rating']  . "</td><td onClick='delMyRoute(" . $row['id'] . ")'>DEL</td></tr>";
     
    }
    //$output .= "</table>";
    /* free result set */
    $result->free();
}
echo $output;


$conn->close();




?>
