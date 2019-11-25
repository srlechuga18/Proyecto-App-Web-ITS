<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/grupo.php";

    $database = new Database();
    $db = $database->getConnection();
    $grupo = new Grupo($db);

    $stmt = $grupo->read();
    $num = $stmt->rowCount();
    if ($num>0) {
        $grupo_arr=array();
        $grupo_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $grupo_item=array(
                "id" => $id,
                "nombre" => $nombre,
                "semestre" => $semestre
            );

            array_push($grupo_arr["records"],$grupo_item);
        }
        http_response_code(200);
        echo json_encode($grupo_arr);
    }else{
        http_response_code(404);
 
        echo json_encode(
            array("message" => "No users found.")
        );
    }

?>