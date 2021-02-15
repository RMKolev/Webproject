<?php
session_start();
$response['userID'] = isset($_SESSION['userID']) ? $_SESSION['userID'] : -1;
echo json_encode($response);
?>