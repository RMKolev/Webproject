<?php
require('./db.php');
session_start();
$offerID = $_GET['id'];
$userID = isset($_SESSION['userID']) ? $_SESSION['userID'] : -1;

$Database = new Db();
$success = $Database->deleteOffer($offerID,$userID);
$response['success'] = true;
if($success != true)
{
	$response['success'] = false;
	$response['errorCode'] = $success;
}

echo json_encode($response);
?>