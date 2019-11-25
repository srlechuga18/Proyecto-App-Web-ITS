<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/grupo.php";

    $database = new Database();
    $db = $database->getConnection();
    $grupo = new Grupo($db);

    $grupo->id = $number;

    $grupo->readOne();
    if($grupo->nombre!=null){
        // create array
        $grupo_arr = array(
            "id" =>  $grupo->id,
            "nombre" => $grupo->nombre,
            "semestre" => $grupo->semestre
        );
     
        // set response code - 200 OK
        http_response_code(200);
     
        // make it json format
        echo json_encode($grupo_arr);
    }
     
    else{
        // set response code - 404 Not found
        http_response_code(404);
     
        // tell the user product does not exist
        echo json_encode(array("message" => "Product does not exist."));
    }

?>