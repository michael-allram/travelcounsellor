<?php
header("Content-Type: text/html; charset=utf-8");

include 'db_connect.php';

if(!isset($_COOKIE['travelcounsellorid'])){
  echo "no routes - no cookie set";
  return 1;
}

$cookieId = $_COOKIE['travelcounsellorid'];


$sql = "SELECT * FROM my_route WHERE cookie_id = '$cookieId'";


if ($result = $conn->query($sql)) {
  
    $row_cnt = $result->num_rows;
    if($row_cnt < 1) {
      echo "no routes";
      return 1; 
    }
    //$output .= "<div id='myRouteHeadline'>My Route</div>";
    $output .= "<div class='datatable'>";
      $output .= "<div class='table-header'>";
        $output .= "<div class='name'>Name</div>";
        $output .= "<div class='street'>Street</div>";
        $output .= "<div class='rating'>Rating</div>";
      $output .= "</div>";
      
          
       
        
    //$output .= "<table>";
    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
       //$output .= "<tr class='row'><td>" . $row['name'] . "</td><td>" . $row['street']  . "</td><td>" . $row['rating']  . "</td><td onClick='delMyRoute(" . $row['id'] . ")'>DEL</td></tr>";
          $output .= "<div class='row'>";
            $output .= "<div class='data'>";
              $output .= "<div class='name'>" . $row['name'] . "</div>";
              $output .= "<div class='street'>" . $row['street'] . "</div>";
              $output .= "<div class='rating'>" . $row['rating'] . "</div>";
              //$output .= "<div class='del' onClick='delMyRoute(" . $row['id'] . ")>del</div>";
            $output .= "</div>";
            $output .= "<div class='add-button' onClick='delMyRoute(" . $row['id'] . ")'>";
              $output .= "<i class='fa fa-trash' aria-hidden='true'></i>";
              $output .= " del";
            $output .= "</div>";
          $output .= "</div>";
      
         
    }
  
    //$output .= "</table>";
      $output .= "</div>";
     
  
  
    /* free result set */
    $result->free();
}
echo $output;


$conn->close();




?>
