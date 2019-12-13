<?php 
header('Content-Type: application/json');
include "data3.php";
$access = $_GET['level'];
$result = [$graphs['fatturato']];

 if ($access == $graphs['fatturato_by_agent']['access']) {
    $result[] = $graphs['fatturato_by_agent'];
} else if ($access == $graphs['team_efficiency']['access']) {
    $result[] = $graphs['fatturato_by_agent'];
    $result[] = $graphs['team_efficiency'];
}
echo json_encode($result);
