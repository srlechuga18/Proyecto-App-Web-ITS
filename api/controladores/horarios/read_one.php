<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/horario.php";

    $database = new Database();
    $db = $database->getConnection();
    $horario = new Horario($db);

    $horario->id = $number;

    $horario->readOne();
    if($horario->diaDeLaSemana!=null){
        // create array
        $horario_arr = array(
            "id" =>  $horario->id,
            "diaDeLaSemana" => $horario->diaDeLaSemana,
            "hora" => $horario->hora,
            "cicloEscolar" => $horario->cicloEscolar,
            "profesor" => $horario->profesor,
            "curso" => $horario->curso,
            "grupo" => $horario->grupo,
            "salon" => $horario->salon,
            "foto" => $horario->foto
        );
     
        // set response code - 200 OK
        http_response_code(200);
     
        // make it json format
        echo json_encode($horario_arr);
    }
     
    else{
        // set response code - 404 Not found
        http_response_code(404);
     
        // tell the user product does not exist
        echo json_encode(array("message" => "Product does not exist."));
    }

?>