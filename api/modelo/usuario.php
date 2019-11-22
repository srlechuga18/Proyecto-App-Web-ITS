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

    function create(){
        $query = "INSERT INTO " . $this->table_name . "(id,pass,nombre,apellidoPaterno,apellidoMaterno,turno,foto,category) ". 
        "VALUES ('". $this->id . "',".
        "MD5('". $this->pass ."'),".
        "'". $this->nombre . "',".
        "'". $this->aPaterno . "',".
        "'". $this->aMaterno . "',".
        "'". $this->turno . "',".
        "'". $this->foto . "',".
        $this->category .
        ");";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return true;
        }
     
        return false;
    }
}

?>