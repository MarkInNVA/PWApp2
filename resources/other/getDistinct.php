<?php

$field = $_GET['field']; 

//$nURL = "http://igsaaaegaser003.er.usgs.gov/arcgis/rest/services/pw/PW_Prod_20140401/MapServer/0/query?";
$nURL = "http://eerscmap.usgs.gov/arcgis/rest/services/pw/PW_20140401/MapServer/0/query?";

$nWhere = "where=1%3D1";

$nFields = "&outFields=".$field."&returnGeometry=false&orderByFields=".$field."&returnDistinctValues=true&f=pjson ";

$getD = $nURL.$nWhere.$nFields;

$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $getD );
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	$outputD = curl_exec($ch);

curl_close($ch);

$json_D = json_decode($outputD,true);

echo json_encode(array(
	'data' => $json_D['features'] ,
	)
);

?>

