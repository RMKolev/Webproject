<?php
session_start();
require("./db.php");

$offerId = $_GET['id'];

$Database = new Db();

$result = $Database->GetOffer($offerId);
$response['success'] = false;
$response['userID'] = isset($_SESSION['userID']) ? $_SESSION['userID'] : -1;
if($result){
	$response['result'] = $result; 
	$user = $Database->getUsernameAndID($result['userid']);
	if($user)
	{
		$response['user'] = $user;
		$response['success'] = true;

	}
}
else{
	$response['errors'] = "Invalid Offer ID";
}

echo json_encode($response);
?>