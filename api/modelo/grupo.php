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

    function read(){
        $query = "SELECT * FROM ".$this->table_name; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function create(){
        $query = "INSERT INTO " . $this->table_name . "(nombre,semestre) ". 
        "VALUES (".
        "'". $this->nombre . "',".
        "'". $this->semestre . "'".
        ");";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function readOne(){
        $query = "SELECT * FROM ".$this->table_name." WHERE id = '".$this->id."';";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->nombre = $row['nombre'];
        $this->semestre = $row['semestre'];
    }

    function updateData(){
        $query = "UPDATE ".$this->table_name." SET nombre='". $this->nombre . "'," .
        " semestre='" . $this->semestre . "'" .
        " WHERE id = " .$this->id. ";";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function delete(){
        $query = "DELETE FROM ". $this->table_name ." WHERE id = " .$this->id. ";";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

}

?>