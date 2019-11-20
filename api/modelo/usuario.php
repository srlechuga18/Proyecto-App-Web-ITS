<?php
class Usuario{
    private $conn;
    private $table_name = "Usr";

    public $id;
    public $pass;
    public $nombre;
    public $aPaterno;
    public $aMaterno;
    public $turno;
    public $foto;
    public $category;

    public function __construct($db){
        $this->conn = $db;
    }
}

?>