<?php


$row = $_POST["row"];
$inp = file_get_contents("./product-detail.json");
$tempArray = json_decode($inp);

array_splice($tempArray,$row,1);

$jsonData = json_encode($tempArray);
file_put_contents("./product-detail.json", $jsonData);

?>