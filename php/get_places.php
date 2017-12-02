$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://maps.googleapis.com/maps/api/place/search/json?location='. $latitude . ','  . $longitude .'&radius=500&name=test&sensor=false&key=(api key)');
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$result = curl_exec($ch);
echo $result;
