<?php 
header('Content-Type: application/json');
include "data2.php";
echo json_encode($graphs);
