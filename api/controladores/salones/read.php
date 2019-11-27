<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/salon.php";

    $database = new Database();
    $db = $database->getConnection();
    $salon = new Salon($db);

    $stmt = $salon->read();
    $num = $stmt->rowCount();
    if ($num>0) {
        $salon_arr=array();
        $salon_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $salon_item=array(
                "id" => $id,
                "nombre" => $nombre,
                "edificio" => $edificio,
                "ubicacion" => $ubicacion
            );

            array_push($salon_arr["records"],$salon_item);
        }
        http_response_code(200);
        echo json_encode($salon_arr);
    }else{
        http_response_code(404);
 
        echo json_encode(
            array("message" => "No users found.")
        );
    }

?>