<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__ . "/../../config/database.php";
include_once __DIR__ . "/../../modelo/horario.php";

$database = new Database();
$db = $database->getConnection();
$horario = new Horario($db);

$horario->id = $number;

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->diaDeLaSemana) &&
    !empty($data->hora) &&
    !empty($data->cicloEscolar) &&
    !empty($data->profesor) &&
    !empty($data->curso) &&
    !empty($data->grupo) &&
    !empty($data->salon)
) {
    $horario->diaDeLaSemana = $data->diaDeLaSemana;
    $horario->hora = $data->hora;
    $horario->cicloEscolar = $data->cicloEscolar;
    $horario->profesor = $data->profesor;
    $horario->curso = $data->curso;
    $horario->grupo = $data->grupo;
    $horario->salon = $data->salon;

    if($horario->updateData()){
 
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
    echo json_encode(array("message" => "Unable to update product."));
}

?>