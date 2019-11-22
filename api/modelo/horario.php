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
}

?>