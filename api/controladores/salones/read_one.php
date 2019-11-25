<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/salon.php";

    $database = new Database();
    $db = $database->getConnection();
    $salon = new Salon($db);

    $salon->id = $number;

    $salon->readOne();
    if($salon->nombre!=null){
        // create array
        $salon_arr = array(
            "id" =>  $salon->id,
            "nombre" => $salon->nombre,
            "edificio" => $salon->edificio,
            "ubicacion" => $salon->ubicacion
        );
     
        // set response code - 200 OK
        http_response_code(200);
     
        // make it json format
        echo json_encode($salon_arr);
    }
     
    else{
        // set response code - 404 Not found
        http_response_code(404);
     
        // tell the user product does not exist
        echo json_encode(array("message" => "Product does not exist."));
    }

?>