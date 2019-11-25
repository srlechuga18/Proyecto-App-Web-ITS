<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/usuario.php";

    $database = new Database();
    $db = $database->getConnection();
    $usuario = new Usuario($db);

    $usuario->id = $number;

    $usuario->readOne();
    if($usuario->nombre!=null){
        // create array
        $usuario_arr = array(
            "id" =>  $usuario->id,
            "pass" => $usuario->pass,
            "email" => $usuario->email,
            "nombre" => $usuario->nombre,
            "apellidoPaterno" => $usuario->aPaterno,
            "apellidoMaterno" => $usuario->aMaterno,
            "turno" => $usuario->turno,
            "foto" => $usuario->foto,
            "category" => $usuario->category
        );
     
        // set response code - 200 OK
        http_response_code(200);
     
        // make it json format
        echo json_encode($usuario_arr);
    }
     
    else{
        // set response code - 404 Not found
        http_response_code(404);
     
        // tell the user product does not exist
        echo json_encode(array("message" => "Product does not exist."));
    }

?>