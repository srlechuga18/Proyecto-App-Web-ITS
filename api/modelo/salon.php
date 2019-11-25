<?php
class Salon{
    private $conn;
    private $table_name = "salon";

    public $id;
    public $nombre;
    public $edificio;
    public $ubicacion;

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
        $query = "INSERT INTO " . $this->table_name . "(nombre,edificio,ubicacion) ". 
        "VALUES (".
        "'". $this->nombre . "',".
        "'". $this->edificio . "',".
        "'". $this->ubicacion . "'".
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
        $this->edificio = $row['edificio'];
        $this->ubicacion = $row['ubicacion'];
    }

    function updateData(){
        $query = "UPDATE ".$this->table_name." SET nombre='". $this->nombre . "'," .
        " edificio='" . $this->edificio . "'," .
        " ubicacion='" . $this->ubicacion . "'" .
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