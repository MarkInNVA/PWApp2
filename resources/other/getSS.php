<?php

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('America/New_York');


$myExtent = array(
  'xmin' => $_GET['xmin'], 
  'ymin' => $_GET['ymin'], 
  'xmax' => $_GET['xmax'], 
  'ymax' => $_GET['ymax'], 
); 

$myCriteria = urlencode($_GET["criteria"]);

$jsonExtent = json_encode($myExtent);

//$urlBase = "http://igsaaaegaser003.er.usgs.gov/arcgis/rest/services/pw/PW_Prod_20140401/MapServer/0/query?";
$urlBase = "http://eerscmap.usgs.gov/arcgis/rest/services/pw/PW_20140401/MapServer/0/query?";

$urlWhere = "where=" . $myCriteria ;
$urlOptions = "&outFields=*&returnGeometry=false";
$urlGeometry = "&geometry=" . $jsonExtent;

$urlReturnType = "&f=json";

$url = $urlBase . $urlWhere . $urlOptions . $urlGeometry . $urlReturnType;

$result = file_get_contents($url);

if (!$result)
{
        print "Unable to retrieve data";
        exit;
}

$obj = json_decode($result, true);

$numColumns = count( $obj['fields'] );
$numRows =  count( $obj['features'] );

// output headers so that the file is downloaded rather than displayed
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=data.csv');

// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');

$lSpacer = '';

$workArray = array();
$workArray[] = 'Number of samples:';
$workArray[] = $lSpacer;
$workArray[] = $numRows;
fputcsv($output, $workArray);
unset($workArray);

$workArray = array();
$workArray[] = 'Where clause:';
$workArray[] = $lSpacer;
$workArray[] = $_GET["criteria"];
fputcsv($output, $workArray);
unset($workArray);

$workArray = array();
$workArray[] = 'Extent geometry (102100):';
$workArray[] = $lSpacer;
$workArray[] = $jsonExtent;
fputcsv($output, $workArray);
unset($workArray);

// ----------

$workArray = array();
for ($ss = 0; $ss < 3; $ss++) {
  $workArray[] = $lSpacer;
  fputcsv($output, $workArray);
}

unset($workArray);

// ----------

// output the column headings
$workArray = array();


for ($j = 1; $j < $numColumns; $j++) {    
  $workArray[] =  $obj['fields'][$j]['name'];
}
//$workArray now has headers

fputcsv($output, $workArray);

// fetch the data
unset($workArray);
$workArray = array();

for ($f = 0; $f < $numRows; $f++) {
//  print $f . '<p>';  
  for ($j = 1; $j < $numColumns; $j++) {
      $test = $obj['fields'][$j]['name'];
      $theThing =   $obj['features'][$f]['attributes'][$test] ;
      $workArray[] = $theThing;
      // print "$j: " . $theThing . ' | ';
  }
//  var_dump($workArray);
  fputcsv($output, $workArray);
  unset($workArray);
  $workArray = array();
  // print  '<p>';  
}

exit;
