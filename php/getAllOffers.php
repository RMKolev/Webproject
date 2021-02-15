<?php
session_start();
require('./db.php');
$database = new Db();

$rows = $database->getAllOffers();
$response['success'] = true;
http_response_code(200);
$response['rows'] = $rows;
$response['userID'] = isset($_SESSION['userID']) ? $_SESSION['userID'] : -1;
echo json_encode($response);

?>