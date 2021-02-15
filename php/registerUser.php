<?php
session_start();

require('./db.php');

$database = new Db();

$username = $_POST['username'];
$password = $_POST['password'];
$boardgamegeek = $_POST['boardgamegeek'];
$facebook = $_POST['facebook'];
$userTemplate = new UserTemplate($_POST);
$userRegistered = $database->registerUser($userTemplate);
$result['success'] = $userRegistered;

echo json_encode($result);
?>