<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__."/../../config/database.php";
include_once __DIR__."/../../modelo/salon.php";

$database = new Database();
$db = $database->getConnection();
$salon = new Salon($db);

$salon->id = $number;

if($salon->delete()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "classroom was deleted."));
}
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete classroom."));
}
?>