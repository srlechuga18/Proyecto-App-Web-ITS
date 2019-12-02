<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once __DIR__."/../../config/database.php";
    include_once __DIR__."/../../modelo/horario.php";

    $database = new Database();
    $db = $database->getConnection();
    $horario = new Horario($db);
    //profesor
    $stmt = $horario->readProf();
    $num = $stmt->rowCount();
    if ($num>0) {
        $horario_arr=array();
        $horario_arr["records"]=array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $prof_item=array(
                "id" => $id,
                "foto" => $foto,
                "nombre" => $nombre,
                "cursos" => array()
            );
            //cursos
            $horario->profesor = $id;
            $stmt2 = $horario->readCursoByProf();
            $num2 = $stmt2->rowCount();
            if ($num2>0) {
                while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                    extract($row2);
                    $curso_item = array(
                        "id" => $id,
                        "nombre" => $nombre,
                        "grupos" => array()
                    );

                    //grupos
                    $horario->curso = $id;
                    $stmt3 = $horario->readGrupoByCursoProf();
                    $num3 = $stmt3->rowCount();
                    if ($num3>0) {
                        while ($row3 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
                            extract($row3);
                            $grupo_item = array(
                                "id" => $id,
                                "grupo" => $grupo,
                                "ciclosEscolares" => array()
                            );

                            //ciclo escolar
                            $horario->grupo = $id;
                            $stmt4 = $horario->readCEByGrupoCursoProf();
                            $num4 = $stmt4->rowCount();
                            if ($num4>0) {
                                while ($row4 = $stmt4->fetch(PDO::FETCH_ASSOC)) {
                                    extract($row4);
                                    $cicloEscolar_item = array(
                                        "cicloEscolar" => $cicloEscolar,
                                        "horarios" => array()
                                    );
                                    //horarios
                                    $horario->cicloEscolar = $cicloEscolar;
                                    $stmt5 = $horario->readhorarios();
                                    $num5 = $stmt5->rowCount();
                                    if ($num5>0) {
                                        while ($row5 = $stmt5->fetch(PDO::FETCH_ASSOC)) {
                                            extract($row5);
                                            $horario_item = array(
                                                "id" => $id,
                                                "dow" => $dow,
                                                "hora" => $hora,
                                                "salon" => $salon
                                            );
                                                
                                            //horarios
                                            array_push($cicloEscolar_item["horarios"],$horario_item);
                                        }
                                    }
                                    //ciclo escolar
                                    array_push($grupo_item["ciclosEscolares"],$cicloEscolar_item);
                                }
                            }
                            //grupo
                            array_push($curso_item["grupos"],$grupo_item);
                        }
                    }
                    //curso
                    array_push($prof_item["cursos"],$curso_item);
                }
            }
            //prof
            array_push($horario_arr["records"],$prof_item);
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