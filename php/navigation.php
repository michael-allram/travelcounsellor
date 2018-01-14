<?php
header('Content-Type: text/html; charset=utf-8');
if(!isset($_COOKIE['travelcounsellorid'])){
	echo "no entry because of no cookie";	
	return 0;
}
	      
	$cookieId = $_COOKIE['travelcounsellorid'];
  
	include 'db_connect.php';


	$sql = "SELECT * FROM my_route WHERE cookie_id = '$cookieId'";
		

	if ($result = $conn->query($sql)) {
  
    		$row_cnt = $result->num_rows;
    		if($row_cnt < 1) {
      			echo "no results";
      			return 1; 
    		}
        
	    $output .= "www.google.at/maps/dir/";
	 while ($row = $result->fetch_assoc()) {
      $street = $row['street']; 
		  $output .= str_replace(" ", "+", $street);
      $output .= "/";
			 
	 }
			
	}
	$result->free();
	$conn->close();
  
  //echo "<a href='" . $output . "'></a>";
echo "hallo";
echo $output;
	


?>

	      
  					
			
  		
