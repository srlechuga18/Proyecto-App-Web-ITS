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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->hora) && !empty($data->grupo)) {
    $horario->hora = $data->hora;
    $horario->grupo = $data->grupo;

    $stmt = $horario->valGrupo();
    $num = $stmt->rowCount();
    if ($num>0) {

        // set response code - 503 service unavailable
        http_response_code(404);

        // tell the user
        echo json_encode(false);
    } else {
        // set response code - 200 ok
        http_response_code(200);

        // tell the user
        echo json_encode(true);
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable process request"));
}
