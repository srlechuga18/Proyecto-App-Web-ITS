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
!empty($data->email) &&
!empty($data->nombre) &&
!empty($data->apellidoPaterno) &&
!empty($data->apellidoMaterno) &&
!empty($data->turno) &&
!empty($data->foto) &&
!empty($data->category)
)
{
    $usuario->pass = $data->pass;
    $usuario->email = $data->email;
    $usuario->nombre = $data->nombre;
    $usuario->aPaterno = $data->apellidoPaterno;
    $usuario->aMaterno = $data->apellidoMaterno;
    $usuario->turno = $data->turno;
    $usuario->category = $data->category;
    //guarda la foto base64 y guarga la url 

    $folderPath = "img/";

    $image_parts = explode(";base64,", $data->foto);

    $image_type_aux = explode("image/", $image_parts[0]);

    $image_type = $image_type_aux[1];

    $image_base64 = base64_decode($image_parts[1]);

    $name = uniqid() . '.png';

    $file = __DIR__ . '/../../../api/public/img/' . $name;

    file_put_contents($file, $image_base64);

    $usuario->foto = $name;

    if($usuario->create()){
 
        // set response code - 201 created
        http_response_code(201);

            
        /* $stmt = $usuario->lastUser();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $usuario->id = $id;
        } */
        // tell the user
        echo json_encode(array("message" => "User created."));
    }
    else{
 
        unlink($file);
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create user."));
    }
}else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}

?>