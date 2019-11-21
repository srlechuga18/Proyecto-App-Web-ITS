<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/usuario.php";

    $database = new Database();
    $db = $database->getConnection();
    $usuario = new Usuario($db);

    $stmt = $usuario->read();
    $num = $stmt->rowCount();
    if ($num>0) {
        $users_arr=array();
        $users_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $user_item=array(
                "id" => $id,
                "pass" => $pass,
                "nombre" => $nombre,
                "apellidoPaterno" => $apellidoPaterno,
                "apellidoMaterno" => $apellidoMaterno,
                "turno" => $turno,
                "foto" => $foto,
                "category" => $category,
            );

            array_push($users_arr["records"],$user_item);
        }
        http_response_code(200);
        echo json_encode($users_arr);
    }else {
        http_response_code(404);
 
        echo json_encode(
            array("message" => "No users found.")
        );
    }

?>