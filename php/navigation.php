<?php
header('Content-Type: text/html; charset=utf-8');
if(!isset($_COOKIE['travelcounsellorid'])){
	header("Location: https://www.travelcounsellor.eu"); /* Redirect browser */
	exit();
}
	      
	$cookieId = $_COOKIE['travelcounsellorid'];
  
	include 'db_connect.php';


	$sql = "SELECT * FROM my_route WHERE cookie_id = '$cookieId'";
		

	if ($result = $conn->query($sql)) {
  
    		$row_cnt = $result->num_rows;
    		if($row_cnt < 1) {
      			header("Location: https://www.travelcounsellor.eu"); /* Redirect browser */
			exit();
    		}
        
	    $output .= "https://www.google.at/maps/dir/";
	 while ($row = $result->fetch_assoc()) {
		$name = $row['name'];
		$output .= str_replace(" ", "+", $name);
		$output .= ", ";
      		$street = $row['street']; 
		$output .= str_replace(" ", "+", $street);
     		$output .= "/";
			 
	 }
			
	}
	$result->free();
	$conn->close();
  
header("Location: "$output""); /* Redirect browser */
exit();


	


?>

	      
  					
			
  		
