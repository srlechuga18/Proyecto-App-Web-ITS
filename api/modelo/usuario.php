<?php
class Usuario{
    private $conn;
    private $table_name = "usuario";

    public $id;
    public $pass;
    public $email;
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

    function lastUser(){
        $query = "SELECT MAX(id) as id FROM usuario;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function create(){
        $query = "INSERT INTO " . $this->table_name . "(pass,email,nombre,apellidoPaterno,apellidoMaterno,turno,foto,category) ". 
        "VALUES (".
        "MD5('". $this->pass ."'),".
        "'". $this->email . "',".
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

    function readOne(){
        $query = "SELECT * FROM ".$this->table_name." WHERE id = '".$this->id."';";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->pass = $row['pass'];
        $this->email = $row['email'];
        $this->nombre = $row['nombre'];
        $this->aPaterno = $row['apellidoPaterno'];
        $this->aMaterno = $row['apellidoMaterno'];
        $this->turno = $row['turno'];
        $this->foto = $row['foto'];
        $this->category = $row['category'];
    }
    
    function updatePassword(){
        $query = "UPDATE ".$this->table_name." SET pass=MD5('". $this->pass ."') WHERE id = " .$this->id. ";";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function updateData(){
        $query = "UPDATE ".$this->table_name." SET nombre='". $this->nombre . "'," .
        " email='" . $this->email . "'," .
        " apellidoPaterno='" . $this->aPaterno . "'," .
        " apellidoMaterno='" . $this->aMaterno . "'," .
        " turno='" . $this->turno . "' " .
        " WHERE id = " .$this->id. ";";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function updateFoto(){
        $query = "UPDATE ".$this->table_name." SET foto='". $this->foto ."' WHERE id = " .$this->id. ";";
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