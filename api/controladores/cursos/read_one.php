<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/curso.php";

    $database = new Database();
    $db = $database->getConnection();
    $curso = new Curso($db);

    $curso->id = $number;

    $curso->readOne();
    if($curso->nombre!=null){
        // create array
        $curso_arr = array(
            "id" =>  $curso->id,
            "nombre" => $curso->nombre,
            "semestre" => $curso->semestre,
            "descripcion" => $curso->description
        );
     
        // set response code - 200 OK
        http_response_code(200);
     
        // make it json format
        echo json_encode($curso_arr);
    }
     
    else{
        // set response code - 404 Not found
        http_response_code(404);
     
        // tell the user product does not exist
        echo json_encode(array("message" => "Product does not exist."));
    }

?>