<?php
class Horario{
    private $conn;
    private $table_name = "horario";

    public $id;
    public $diaDeLaSemana;
    public $hora;
    public $cicloEscolar;
    public $profesor;
    public $curso;
    public $grupo;
    public $salon;

    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
        $query = "SELECT * FROM ".$this->table_name; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function valSalon(){
        $query =  "SELECT * FROM ".$this->table_name. " WHERE salon='" . $this->salon . "' AND hora='" . $this->hora . ":00';"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function valGrupo(){
        $query =  "SELECT * FROM ".$this->table_name. " WHERE grupo='" . $this->grupo . "' AND hora='" . $this->hora . ":00';"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function valProf(){
        $query =  "SELECT * FROM ".$this->table_name. " WHERE profesor='" . $this->profesor . "' AND hora='" . $this->hora . ":00';"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function create(){
        $query = "INSERT INTO " . $this->table_name . "(diaDeLaSemana,hora,cicloEscolar,profesor,curso,grupo,salon) ". 
        "VALUES ('". $this->diaDeLaSemana . "',".
        "'". $this->hora . ":00',".
        "'". $this->cicloEscolar . "',".
        "'". $this->profesor . "',".
        "'". $this->curso . "',".
        "'". $this->grupo . "',".
        "'". $this->salon . "');";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    function readByProf(){
        $query =  "SELECT * FROM ".$this->table_name. " WHERE profesor=" . $this->profesor . ";"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readOne(){
        $query = "SELECT * FROM ".$this->table_name." WHERE id = '".$this->id."';";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->diaDeLaSemana = $row['diaDeLaSemana'];
        $this->hora = $row['hora'];
        $this->cicloEscolar = $row['cicloEscolar'];
        $this->profesor = $row['profesor'];
        $this->curso = $row['curso'];
        $this->grupo = $row['grupo'];
        $this->salon = $row['salon'];
    }

    function updateData(){
        $query = "UPDATE ".$this->table_name." SET diaDeLaSemana=". $this->diaDeLaSemana . "," .
        " hora='". $this->hora . ":00',".
        " cicloEscolar='" . $this->cicloEscolar . "'," .
        " profesor=" . $this->profesor . "," .
        " curso=" . $this->curso . "," .
        " grupo=" . $this->grupo . "," .
        " salon=" . $this->salon . "," .
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