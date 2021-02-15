<?php
session_start();

require('db.php');
$response['success'] = false;

if(!is_null($_SESSION['userID'])){
	$_POST['userID'] = $_SESSION['userID'];
	
	$request = new OfferTemplate($_POST);
	
	$Database = new Db();
	$Database->registerOffer($request);
	
	$response['success'] = true;
	http_response_code(200);
	echo json_encode($response);
}

else{
	
	$response['errors'] = ['reason' => 'User not logged in.'];
	echo json_encode($response);
}

?>