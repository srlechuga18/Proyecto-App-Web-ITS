<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__."/../../config/database.php";
include_once __DIR__."/../../modelo/curso.php";

$database = new Database();
$db = $database->getConnection();
$curso = new Curso($db);

$data = json_decode(file_get_contents("php://input"));

if(   
!empty($data->nombre) &&
!empty($data->semestre) &&
!empty($data->descripcion) 
)
{
    $curso->nombre = $data->nombre;
    $curso->semestre = $data->semestre;
    $curso->description = $data->descripcion;

    if($curso->create()){
 
        // set response code - 201 created
        http_response_code(201);

        echo json_encode(array("message" => "Classroom created."));
    }
    else{
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create clasroom."));
    }
}else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create classrom. Data is incomplete."));
}

?>