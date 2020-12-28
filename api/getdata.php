<?php
header("Access-Control-Allow-Origin: *");
include 'conn.php';



$queryResult = $connect->query("SELECT * FROM tb_match_details ORDER By id DESC");


$result = array();

while($fetchData=$queryResult->fetch_assoc()){
	
	$result[] = $fetchData;
	
}
echo json_encode($result);
?>