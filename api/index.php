<?php 

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        http_response_code(200);
        echo 'GET';    
        break;
    case 'POST':
        http_response_code(200);
        echo 'POST';
        break;  
    case 'PATCH':
        http_response_code(200);
        echo 'PATCH';
        break;   
    case 'DELETE':
        http_response_code(200);
        echo 'DELETE';
        break;
    default:
        http_response_code(405);
        break;
}

?>