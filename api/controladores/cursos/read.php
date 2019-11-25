<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/curso.php";

    $database = new Database();
    $db = $database->getConnection();
    $curso = new Curso($db);

    $stmt = $curso->read();
    $num = $stmt->rowCount();
    if ($num>0) {
        $curso_arr=array();
        $curso_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $curso_item=array(
                "id" => $id,
                "nombre" => $nombre,
                "semestre" => $edificio,
                "descripcion" => $descripcion
            );

            array_push($curso_arr["records"],$curso_item);
        }
        http_response_code(200);
        echo json_encode($curso_arr);
    }else{
        http_response_code(404);
 
        echo json_encode(
            array("message" => "No users found.")
        );
    }

?>