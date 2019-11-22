<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once __DIR__."/../../config/database.php";
include_once __DIR__."/../../modelo/usuario.php";

$database = new Database();
$db = $database->getConnection();
$usuario = new Usuario($db);

$data = json_decode(file_get_contents("php://input"));

if(   
!empty($data->id) &&
!empty($data->pass) &&
!empty($data->nombre) &&
!empty($data->apellidoPaterno) &&
!empty($data->apellidoMaterno) &&
!empty($data->turno) &&
!empty($data->foto) &&
!empty($data->category)
){

}