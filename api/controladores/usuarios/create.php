<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__."/../../config/database.php";
include_once __DIR__."/../../modelo/usuario.php";

$database = new Database();
$db = $database->getConnection();
$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

if(   
!empty($data->pass) &&
!empty($data->nombre) &&
!empty($data->apellidoPaterno) &&
!empty($data->apellidoMaterno) &&
!empty($data->turno) &&
!empty($data->foto) &&
!empty($data->category)
)
{
    $usuario->pass = $data->pass;
    $usuario->nombre = $data->nombre;
    $usuario->apellidoPaterno = $data->apellidoPaterno;
    $usuario->apellidoMaterno = $data->apellidoMaterno;
    $usuario->turno = $data->turno;
    $usuario->category = $data->category;
    
    switch ($data->category) {
        case 1:
            $x = "AD";
            break;
        case 2:
            $x = "PF";
            break;
        case 3:
            $x = "PR";
            break;
    }
    $stmt = $usuario->countUsersByCategory($data->category);
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $a = $num + 1;
    }

    $usuario->id = $x . $a;
    http_response_code(200);
    //que pedo con la foto
}else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}