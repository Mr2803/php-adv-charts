<?php 
header('Content-Type: application/json');
include "data3.php";
echo json_encode($graphs);
