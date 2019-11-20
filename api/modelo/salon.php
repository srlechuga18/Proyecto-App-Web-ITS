<?php
class Salon{
    private $conn;
    private $table_name = "Salon";

    public $id;
    public $nombre;
    public $edificio;
    public $ubicacion;

    public function __construct($db){
        $this->conn = $db;
    }
}

?>