<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/horario.php";

    $database = new Database();
    $db = $database->getConnection();
    $horario = new Horario($db);

    $stmt = $horario->read();
    $num = $stmt->rowCount();
    if ($num>0) {
        $horario_arr=array();
        $horario_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $horario_item=array(
                "id" => $id,
                "diaDeLaSemana" => $diaDeLaSemana,
                "hora" => $hora,
                "cicloEscolar" => $cicloEscolar,
                "profesor" => $profesor,
                "curso" => $curso,
                "grupo" => $grupo,
                "salon" => $salon,
                "foto" => $foto
            );

            array_push($horario_arr["records"],$horario_item);
        }
        http_response_code(200);
        echo json_encode($horario_arr);
    }else{
        http_response_code(404);
 
        echo json_encode(
            array("message" => "No users found.")
        );
    }

?>