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

    function read(){
        $query = "SELECT * FROM ".$this->table_name; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function create(){
        $query = "INSERT INTO " . $this->table_name . "(nombre,semestre,descripcion) ". 
        "VALUES (".
        "'". $this->nombre . "',".
        "'". $this->semestre . "',".
        "'". $this->description . "'".
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
        $this->description = $row['descripcion'];
    }

    function updateData(){
        $query = "UPDATE ".$this->table_name." SET nombre='". $this->nombre . "'," .
        " semestre='" . $this->semestre . "'," .
        " descripcion='" . $this->description . "'" .
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