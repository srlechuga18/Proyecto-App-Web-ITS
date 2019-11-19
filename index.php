<?php 

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    http_response_code(200);
    echo 'GET';
}elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    http_response_code(200);
    echo 'POST';
}else {
    http_response_code(405);
}

?>