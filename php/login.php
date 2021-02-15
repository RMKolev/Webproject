<?php
session_start();

require('./db.php');

	$username = $_POST['username'];
	$password = $_POST['password'];
	
	$Database = new Db();
	
	$usr = $Database->GetUser($username,$password);
	$response['success'] = false;
	
	$Database->getAllOffers();
	
	if($usr != -1)
	{
		$_SESSION['userID'] = $usr;
		$response['success'] = true;
		echo json_encode($response);
	}
	
	else
	{
		$response['errors'] = ['reason' => 'Wrong credentials'];
		echo json_encode($response);
	}


?>