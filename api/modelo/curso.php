<?php
class Curso{
    private $conn;
    private $table_name = "curso";

    public $id;
    public $semestre;
    public $nombre;
    public $description;

    public function __construct($db){
        $this->conn = $db;
    }
}

?>