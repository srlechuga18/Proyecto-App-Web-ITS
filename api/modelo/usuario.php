<?php
class Usuario{
    private $conn;
    private $table_name = "usuario";

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

    function read(){
        $query = "SELECT * FROM ".$this->table_name; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function countUsersByCategory($num){
        $query = "SELECT count(*) as num FROM ". $this->table_name ." WHERE category = ". $num ." ;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}

?>