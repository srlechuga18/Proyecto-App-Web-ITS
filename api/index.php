<?php 
if (isset($_GET["url"])) {
    $item = $_GET["url"];
    $number = intval(preg_replace('/[^0-9]+/','',$item),10);
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            switch ($item) {
                case "usuarios":
                    include_once('./controladores/usuarios/read.php');
                    break;
                case "usuarios/$number":
                    include_once('./controladores/usuarios/read_one.php');
                    break;
                case "grupos":
                    http_response_code(200);
                    print_r("trae grupos");
                    break;
                case "salones":
                    http_response_code(200);
                    print_r("trae salones");
                    break;
                case "cursos":
                    http_response_code(200);
                    print_r("trae cursos");
                    break;
                case "horarios":
                    http_response_code(200);
                    print_r("trae horarios");
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
                    http_response_code(200);
                    print_r("crea grupo");
                    break;
                case 'salones':
                    http_response_code(200);
                    print_r("crea salon");
                    break;
                case 'cursos':
                    http_response_code(200);
                    print_r("crea curso");
                    break;
                case 'horarios':
                    http_response_code(200);
                    print_r("crea horario");
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
                case 'grupos':
                    http_response_code(200);
                    print_r("edita grupo");
                    break;
                case 'salones':
                    http_response_code(200);
                    print_r("edita salon");
                    break;
                case 'cursos':
                    http_response_code(200);
                    print_r("edita curso");
                    break;
                case 'horarios':
                    http_response_code(200);
                    print_r("edita horario");
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
                case 'grupos':
                    http_response_code(200);
                    print_r("borra grupo");
                    break;
                case 'salones':
                    http_response_code(200);
                    print_r("borra salon");
                    break;
                case 'cursos':
                    http_response_code(200);
                    print_r("borra curso");
                    break;
                case 'horarios':
                    http_response_code(200);
                    print_r("borra horario");
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
}else {
    http_response_code(40);
}
?>