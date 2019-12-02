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
    public $foto;

    public function __construct($db){
        $this->conn = $db;
    }

/*     function read(){
        $query = "SELECT * FROM ".$this->table_name; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    } */


    function read(){
        $query = 
        "SELECT h.id,h.hora,h.diaDeLaSemana,CONCAT(s.nombre,' ',s.edificio) as salon, c.nombre as curso, CONCAT(g.semestre,' ',g.nombre) as grupo, h.cicloEscolar, p.foto, CONCAT(p.nombre,' ',p.apellidoPaterno,' ',p.apellidoMaterno) as profesor".
        " FROM horario h, salon s, curso c, grupo g, usuario p". 
        " WHERE h.profesor = p.id and h.salon = s.id and h.curso = c.id and h.grupo = g.id;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readByProf(){
        $query =  
        "SELECT h.id,h.hora,h.diaDeLaSemana,CONCAT(s.nombre,' ',s.edificio) as salon, c.nombre as curso, CONCAT(g.semestre,' ',g.nombre) as grupo, h.cicloEscolar, p.foto, CONCAT(p.nombre,' ',p.apellidoPaterno,' ',p.apellidoMaterno) as profesor".
        " FROM horario h, salon s, curso c, grupo g, usuario p". 
        " WHERE h.profesor = p.id and h.salon = s.id and h.curso = c.id and h.grupo = g.id and h.profesor = " . $this->profesor . ";"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readProf(){
        $query = "select distinct p.id,p.foto, CONCAT(p.nombre,' ',p.apellidoPaterno,' ',p.apellidoMaterno) as nombre from horario h, usuario p where h.profesor = p.id;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readCursoByProf(){
        $query = "select distinct c.id,c.nombre from curso c, horario h where h.profesor = '".$this->profesor."' and h.curso = c.id;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readGrupoByCursoProf(){
        $query = "select distinct g.id, CONCAT(g.semestre,' ',g.nombre) as grupo from horario h, grupo g where h.profesor = ".$this->profesor." and h.curso = ".$this->curso." and h.grupo = g.id;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readCEByGrupoCursoProf(){
        $query = "select distinct cicloEscolar from horario where profesor = ".$this->profesor." and curso = ".$this->curso." and grupo = ".$this->grupo.";";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readhorarios(){
        $query = "select h.id,h.diaDeLaSemana as dow,h.hora,CONCAT(s.nombre,' ',s.edificio) as salon from horario h,salon s where h.profesor = ".$this->profesor." and h.curso = ".$this->curso." and h.grupo = ".$this->grupo." and h.cicloEscolar = '".$this->cicloEscolar."' and h.salon = s.id;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function valSalon(){
        $query =  "SELECT id FROM ".$this->table_name. " WHERE salon='" . $this->salon . "' AND hora='" . $this->hora . ":00' AND diaDeLaSemana=" . $this->diaDeLaSemana .";"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function valGrupo(){
        $query =  "SELECT id FROM ".$this->table_name. " WHERE grupo='" . $this->grupo . "' AND hora='" . $this->hora . ":00' AND diaDeLaSemana=" . $this->diaDeLaSemana .";"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function valProf(){
        $query =  "SELECT id FROM ".$this->table_name. " WHERE profesor='" . $this->profesor . "' AND hora='" . $this->hora . ":00' AND diaDeLaSemana=" . $this->diaDeLaSemana .";"; 
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

/*     function readByProf(){
        $query =  "SELECT * FROM ".$this->table_name. " WHERE profesor=" . $this->profesor . ";"; 
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    } */

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

/*     function readOne(){
        $query = 
        "SELECT h.hora,h.diaDeLaSemana,CONCAT(s.nombre,' ',s.edificio) as salon, c.nombre as curso, CONCAT(g.semestre,' ',g.nombre) as grupo, h.cicloEscolar, p.foto, CONCAT(p.nombre,' ',p.apellidoPaterno,' ',p.apellidoMaterno) as profesor".
        " FROM horario h, salon s, curso c, grupo g, usuario p". 
        " WHERE h.profesor = p.id and h.salon = s.id and h.curso = c.id and h.grupo = g.id and h.id = '".$this->id."';";
        //"SELECT * FROM ".$this->table_name." WHERE id = '".$this->id."';";
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
        $this->foto = $row['foto'];
    } */

    function updateData(){
        $query = "UPDATE ".$this->table_name." SET diaDeLaSemana=". $this->diaDeLaSemana . "," .
        " hora='". $this->hora . ":00',".
        " cicloEscolar='" . $this->cicloEscolar . "'," .
        " profesor=" . $this->profesor . "," .
        " curso=" . $this->curso . "," .
        " grupo=" . $this->grupo . "," .
        " salon=" . $this->salon . 
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