CREATE DATABASE instituto_x;

use instituto_x;

CREATE TABLE category (
    id VARCHAR(5),
    nombre VARCHAR(20),
    CONSTRAINT PK_Category PRIMARY KEY (id)
);

CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT,
    pass VARCHAR(100),
    email VARCHAR(50) NOT NULL,
    nombre VARCHAR(20),
    apellidoPaterno VARCHAR(20),
    apellidoMaterno VARCHAR(20),
    turno VARCHAR(20),
    foto VARCHAR(150),
    category VARCHAR(5),
    CONSTRAINT UC_Email UNIQUE (email),
    CONSTRAINT PK_Usuario PRIMARY KEY (id),
    CONSTRAINT FK_Category FOREIGN KEY (category) REFERENCES category(id)
);

CREATE TABLE curso (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) ,
    semestre VARCHAR(20) ,
    descripcion VARCHAR(150) ,
    CONSTRAINT PK_Curso PRIMARY KEY (id)
);

CREATE TABLE grupo (
    id INT NOT NULL AUTO_INCREMENT,
    semestre VARCHAR(20) ,
    nombre VARCHAR(20) ,
    CONSTRAINT PK_Grupo PRIMARY KEY (id)
);

CREATE TABLE salon (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(20) ,
    edificio VARCHAR(20) ,
    ubicacion VARCHAR(150) ,
    CONSTRAINT PK_Salon PRIMARY KEY (id)
);

CREATE TABLE horario (
    id INT NOT NULL AUTO_INCREMENT,
    diaDeLaSemana int ,
    hora date ,
    cicloEscolar VARCHAR(20) ,
    profesor INT ,
    curso INT ,
    grupo INT ,
    salon INT ,
    CONSTRAINT PK_Horario PRIMARY KEY (id),
    CONSTRAINT FK_Usuario FOREIGN KEY (profesor) REFERENCES usuario(id),
    CONSTRAINT FK_Curso FOREIGN KEY (curso) REFERENCES curso(id),
    CONSTRAINT FK_Grupo FOREIGN KEY (grupo) REFERENCES grupo(id),
    CONSTRAINT FK_Salon FOREIGN KEY (salon) REFERENCES salon(id)
);

INSERT INTO category(id,nombre) VALUES (001,"Admin"),(002,"Profesor"),(003,"Prefecto");

INSERT INTO usuario(pass,email,nombre,apellidoPaterno,apellidoMaterno,turno,foto,category) VALUES
(MD5('12341234'),'aledeleon222@hotmail.com','Alejandro','De Leon', 'Lopez', 'medio', 'url', 001);

select count(*) from <table> where username = @username and password = MD5(@password)

select max(id) from usuario;

SELECT h.hora,CONCAT(s.nombre,s.edificio) as salon, c.nombre as curso, c.semestre as cursoSemestre, CONCAT(g.nombre,g.semestre), h.cicloEscolar, p.foto, CONCAT(p.nombre,' ',p.apellidoPaterno,' ',p.apellidoMaterno) 
FROM horario h, salon s, curso c, grupo g, usuario p 
where h.profesor = p.id and h.salon = s.id and h.curso = c.id and h.grupo = g.id;

SELECT p.nombre, c.nombre as category FROM usuario p, category c where p.category = c.id;