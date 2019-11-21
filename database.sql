CREATE DATABASE instituto_x;

CREATE TABLE category (
    id VARCHAR(5),
    nombre VARCHAR(20),
    CONSTRAINT PK_Category PRIMARY KEY (id)
);

CREATE TABLE usuario (
    id VARCHAR(5),
    pass VARCHAR(100),
    nombre VARCHAR(20),
    apellidoPaterno VARCHAR(20),
    apellidoMaterno VARCHAR(20),
    turno VARCHAR(20),
    foto VARCHAR(150),
    category VARCHAR(5),
    CONSTRAINT PK_Usuario PRIMARY KEY (id),
    CONSTRAINT FK_Category FOREIGN KEY (category) REFERENCES category(id)
);

CREATE TABLE curso (
    id VARCHAR(5) ,
    nombre VARCHAR(20) ,
    semestre int ,
    descripcion VARCHAR(150) ,
    CONSTRAINT PK_Curso PRIMARY KEY (id)
);

CREATE TABLE grupo (
    id VARCHAR(5) ,
    semestre int ,
    nombre VARCHAR(20) ,
    CONSTRAINT PK_Grupo PRIMARY KEY (id)
);

CREATE TABLE salon (
    id VARCHAR(5) ,
    nombre VARCHAR(20) ,
    edificio VARCHAR(20) ,
    ubicacion VARCHAR(150) ,
    CONSTRAINT PK_Salon PRIMARY KEY (id)
);

CREATE TABLE horario (
    id VARCHAR(5) ,
    diaDeLaSemana int ,
    hora date ,
    cicloEscolar VARCHAR(20) ,
    profesor VARCHAR(5) ,
    curso VARCHAR(5) ,
    grupo VARCHAR(5) ,
    salon VARCHAR(5) ,
    CONSTRAINT PK_Horario PRIMARY KEY (id),
    CONSTRAINT FK_Usuario FOREIGN KEY (profesor) REFERENCES usuario(id),
    CONSTRAINT FK_Curso FOREIGN KEY (curso) REFERENCES curso(id),
    CONSTRAINT FK_Grupo FOREIGN KEY (grupo) REFERENCES grupo(id),
    CONSTRAINT FK_Salon FOREIGN KEY (salon) REFERENCES salon(id)
);

INSERT INTO category(id,nombre) VALUES (001,"Admin"),(002,"Profesor"),(003,"Prefecto");

INSERT INTO usuario(id,pass,nombre,apellidoPaterno,apellidoMaterno,turno,foto,category) VALUES
('AD001',MD5('12341234'),'Alejandro','De Leon', 'Lopez', 'medio', 'url', 001);

select count(*) from <table> where username = @username and password = MD5(@password)