<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__ . "/../../config/database.php";
include_once __DIR__ . "/../../modelo/usuario.php";

$database = new Database();
$db = $database->getConnection();
$usuario = new Usuario($db);

$usuario->id = $number;

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->pass)) {
    $usuario->pass = $data->pass;
    if($usuario->updatePassword()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Password Updated"));
    }
    else{
        // set response code - 503 service unavailable
        http_response_code(503);
        // tell the user
        echo json_encode(array("message" => "Unable to change password"));
    }
} elseif (
    !empty($data->nombre) &&
    !empty($data->apellidoPaterno) &&
    !empty($data->apellidoMaterno) &&
    !empty($data->turno)
) {
    $usuario->nombre = $data->nombre;
    $usuario->aPaterno = $data->apellidoPaterno;
    $usuario->aMaterno = $data->apellidoMaterno;
    $usuario->turno = $data->turno;

    if($usuario->updateData()){
 
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
} elseif (!empty($data->foto)) {
    $image_parts = explode(";base64,", $data->foto);

    $image_type_aux = explode("image/", $image_parts[0]);

    $image_type = $image_type_aux[1];

    $image_base64 = base64_decode($image_parts[1]);

    $name = uniqid() . '.png';

    $file = __DIR__ . '/../../../api/public/img/' . $name;

    file_put_contents($file, $image_base64);

    $usuario->foto = $name;

    if($usuario->updateFoto()){
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Photo Updated"));
    }
    else{
        // set response code - 503 service unavailable
        http_response_code(503);
        // tell the user
        echo json_encode(array("message" => "Unable to update photo"));
    }  

} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update product."));
}
