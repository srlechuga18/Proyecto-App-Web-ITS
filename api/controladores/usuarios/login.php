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
    !empty($data->email)
){

    $usuario->pass = $data->pass;
    $usuario->email = $data->email;

    $stmt = $usuario->login();
    $num = $stmt->rowCount();
    if ($num>0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $usuario->id = $id;
            $usuario->category = $category;
        }

        http_response_code(201);
        echo json_encode(
            array("id" => $usuario->id,
            "category" => $usuario->category)
        );

    }else{
        http_response_code(404);
 
        echo json_encode(
            array("message" => "No users found.")
        );
    }


}else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create user. Data is incomplete."));
}

?>