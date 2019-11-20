<?php
class Grupo{
    private $conn;
    private $table_name = "Grupo";

    public $id;
    public $semestre;
    public $nombre;

    public function __construct($db){
        $this->conn = $db;
    }
}

?>