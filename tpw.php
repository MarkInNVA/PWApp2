<?php
/**
 * PHPExcel
 *
 * Copyright (C) 2006 - 2014 PHPExcel
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2014 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt  LGPL
 * @version    1.8.0, 2014-03-02
 */

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('America/New_York');


$myExtent = array(
  "xmin" => $_POST["xmin"], 
  "ymin" => $_POST["ymin"], 
  "xmax" => $_POST["xmax"], 
  "ymax" => $_POST["ymax"], 
); 

$myCriteria = $_POST["criteria"];
//var_dump($myExtent);
//  {"xmin":-14385548.492204271,"ymin":5724785.964167407,"xmax":-12500917.122805476,"ymax":6606563.522464963,"spatialReference":{"wkid":102100}}

//echo json_encode($myExtent);
// echo PHP_EOL;
$jsonExtent = json_encode($myExtent);
//   echo $j;
// echo 'end testing post'.PHP_EOL;



$urlBase = "http://igsaaaegaser003/arcgis/rest/services/pw/pw_app4iddb/MapServer/0/query?";
$urlWhere = "where=" . $myCriteria;
$urlOptions = "&outFields=*&returnGeometry=false";
$urlGeometry = "&geometry=" . $jsonExtent;
$urlOrder = "&orderByFields=Ca"; 
$urlReturnType = "&f=json";

$url = $urlBase . $urlWhere . $urlOptions . $urlGeometry . $urlOrder . $urlReturnType;
//echo $url;

$result = file_get_contents($url);

if (!$result)
{
        print "Unable to retrieve data";
        exit;
}

$obj = json_decode($result, true);



$numColumns = count($obj['fields']);
$numRows =  count($obj['features']);


if (PHP_SAPI == 'cli')
  die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once dirname(__FILE__) . './Classes/PHPExcel.php';


// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

// Rename worksheet
$objPHPExcel->getActiveSheet()->setTitle('USGS Produced Waters Samples');


// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);
$row = 1;

$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow(0, $row, 'Selected by: ' . $urlWhere);
$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow(5, $row, 'Number of samples: ' . $numRows);

$row++;
$row++;

for ($j = 0; $j < $numColumns; $j++) {    
//    print $obj['fields'][$j]['name'] . PHP_EOL;
    $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j, $row, $obj['fields'][$j]['name']);
}


for ($f = 0; $f < $numRows; $f++) {
// //   print $f . PHP_EOL;  
  $row++;
  for ($j = 0; $j < $numColumns; $j++) {
// //       print $j . ' | ';
        $test = $obj['fields'][$j]['name'];
        $theThing =   $obj['features'][$f]['attributes'][$test] ;
        // print $theThing . PHP_EOL;
        if ($test == 'API') {
          $objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($j,$row,$theThing,PHPExcel_Cell_DataType::TYPE_STRING);
        } elseif ($test == 'DATESAMPLE') {
            $objPHPExcel->getActiveSheet()->SetCellValueByColumnAndRow($j, $row, PHPExcel_Shared_Date::PHPToExcel($theThing));
            $objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($j, $row)->getNumberFormat()->setFormatCode('dd/mm/yyyy');

//            $objPHPExcel->getActiveSheet()->setCellValueExplicitByColumnAndRow($j,$row,$theThing,PHPExcel_Style_NumberFormat::FORMAT_DATE_XLSX14);
        } else {
          $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j, $row,$theThing);
        }
//        $worksheet->write($f,$j, $theThing , $regularFormat);
// //        var_dump($obj['features'][0]['attributes'][$test] ) ;
  }
// //  print PHP_EOL;
}


// $row = 1; // 1-based index
// while($row_data = mysql_fetch_assoc($result)) {
//     $col = 0;
//     foreach($row_data as $key=>$value) {
//         $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col, $row, $value);
//         $col++;
//     }
//     $row++;
// }

// Add some data
// $objPHPExcel->setActiveSheetIndex(0)
//             ->setCellValue('A1', 'Hello')
//             ->setCellValue('B2', 'world!')
//             ->setCellValue('C1', 'Hello')
//             ->setCellValue('D2', 'world!');

// Miscellaneous glyphs, UTF-8
// $objPHPExcel->setActiveSheetIndex(0)
//             ->setCellValue('A4', 'Miscellaneous glyphs')
//             ->setCellValue('A5', 'éàèùâêîôûëïüÿäöüç');


// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="USGS_Prod_Waters_export.xls"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');
exit;
