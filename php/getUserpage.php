
<?php 

require("./db.php");

$id = $_GET['id'];

$Database = new Db();
$userdata = $Database->getUserDetails($id);
$response['success'] = false;

if($userdata)
{
	$response['success'] = true;
	$response['user'] = $userdata;
}
else{
	$response['errors'] = "Invalid User";
	echo json_encode($response);
	return;
}

$result = $Database->getUserOffers($id);


if($result){
	$response['success'] = true;
	$response['rows'] = $result;
}

echo json_encode($response);
?>