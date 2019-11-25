<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__ . "/../../config/database.php";
include_once __DIR__ . "/../../modelo/salon.php";

$database = new Database();
$db = $database->getConnection();
$salon = new Salon($db);

$salon->id = $number;

$data = json_decode(file_get_contents("php://input"));
if(
    !empty($data->nombre) &&
    !empty($data->edificio) &&
    !empty($data->ubicacion) 
) {
    $salon->nombre = $data->nombre;
    $salon->edificio = $data->edificio;
    $salon->ubicacion = $data->ubicacion;

    if($salon->updateData()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Data Updated"));
    }
    else{
        // set response code - 503 service unavailable
        http_response_code(503);
        // tell the user
        echo json_encode(array("message" => "Unable to update data"));
    }    
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update classroom."));
}

?>