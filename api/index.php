<?php
if (isset($_GET["url"])) {
    $item = $_GET["url"];
    $number = intval(preg_replace('/[^0-9]+/', '', $item), 10);
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            switch ($item) {
                case "usuarios":
                    include_once('./controladores/usuarios/read.php');
                    break;
                case "usuarios/$number":
                    include_once('./controladores/usuarios/read_one.php');
                    break;
                case "usuarios/horario/$number":
                    include_once('./controladores/horarios/read_byProf.php');
                    break;
                case "grupos":
                    include_once('./controladores/grupos/read.php');
                    break;
                case "grupos/$number":
                    include_once('./controladores/grupos/read_one.php');
                    break;
                case "salones":
                    include_once('./controladores/salones/read.php');
                    break;
                case "salones/$number":
                    include_once('./controladores/salones/read_one.php');
                    break;
                case "cursos":
                    include_once('./controladores/cursos/read.php');
                    break;
                case "cursos/$number":
                    include_once('./controladores/cursos/read_one.php');
                    break;
                case "horarios":
                    include_once('./controladores/horarios/read.php');
                    break;
                case "horarios/$number":
                    include_once('./controladores/horarios/read_one.php');
                    break;
                default:
                    http_response_code(400);
                    break;
            }
            break;
        case 'POST':
            switch ($item) {
                case 'usuarios':
                    include_once('./controladores/usuarios/create.php');
                    break;
                case 'grupos':
                    include_once('./controladores/grupos/create.php');
                    break;
                case 'salones':
                    include_once('./controladores/salones/create.php');
                    break;
                case 'cursos':
                    include_once('./controladores/cursos/create.php');
                    break;
                case 'horarios':
                    include_once('./controladores/horarios/create.php');
                    break;
                case 'login':
                    include_once('./controladores/usuarios/login.php');
                    break;
                case 'validate/salon':
                    include_once('./controladores/horarios/valSalon.php');
                    break;
                case 'validate/grupo':
                    include_once('./controladores/horarios/valGrupo.php');
                    break;
                case 'validate/profesor':
                    include_once('./controladores/horarios/valProf.php');
                    break;
                default:
                    http_response_code(400);
                    break;
            }
            break;
        case 'PATCH':
            switch ($item) {
                case "usuarios/$number":
                    include_once('./controladores/usuarios/update.php');
                    break;
                case "grupos/$number":
                    include_once('./controladores/grupos/update.php');
                    break;
                case "salones/$number":
                    include_once('./controladores/salones/update.php');
                    break;
                case "cursos/$number":
                    include_once('./controladores/cursos/update.php');
                    break;
                case "horarios/$number":
                    include_once('./controladores/horarios/update.php');
                    break;
                default:
                    http_response_code(400);
                    break;
            }
            break;
        case 'DELETE':
            switch ($item) {
                case "usuarios/$number":
                    include_once('./controladores/usuarios/delete.php');
                    break;
                case "grupos/$number":
                    include_once('./controladores/grupos/delete.php');
                    break;
                case "salones/$number":
                    include_once('./controladores/salones/delete.php');
                    break;
                case "cursos/$number":
                    include_once('./controladores/cursos/delete.php');
                    break;
                case "horarios/$number":
                    include_once('./controladores/horarios/delete.php');
                    break;
                default:
                    http_response_code(400);
                    break;
            }
            break;
        default:
            http_response_code(405);
            break;
    }
} else {
    http_response_code(40);
}
