<?php
class Grupo{
    private $conn;
    private $table_name = "grupo";

    public $id;
    public $semestre;
    public $nombre;

    public function __construct($db){
        $this->conn = $db;
    }
}

?>