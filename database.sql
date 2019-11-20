CREATE DATABASE instituto_x;

CREATE TABLE Category (
    Id VARCHAR(5),
    Nombre VARCHAR(20),
    CONSTRAINT PK_Category PRIMARY KEY (Id)
);

CREATE TABLE Usr (
    Id VARCHAR(5),
    Pass VARCHAR(20),
    Nombre VARCHAR(20),
    ApellidoPaterno VARCHAR(20),
    ApellidoMaterno VARCHAR(20),
    Turno VARCHAR(20),
    Foto VARCHAR(150),
    Category int,
    CONSTRAINT PK_Usr PRIMARY KEY (Id),
    CONSTRAINT FK_Category FOREIGN KEY (Category) REFERENCES Category(Id)
);

CREATE TABLE Curso (
    Id VARCHAR(5) ,
    Nombre VARCHAR(20) ,
    Semestre int ,
    Descripcion VARCHAR(150) ,
    CONSTRAINT PK_Curso PRIMARY KEY (Id)
);

CREATE TABLE Grupo (
    Id VARCHAR(5) ,
    Semestre int ,
    Nombre VARCHAR(20) ,
    CONSTRAINT PK_Grupo PRIMARY KEY (Id)
);

CREATE TABLE Salon (
    Id VARCHAR(5) ,
    Nombre VARCHAR(20) ,
    Edificio VARCHAR(20) ,
    Ubicacion VARCHAR(150) ,
    CONSTRAINT PK_Salon PRIMARY KEY (Id)
);

CREATE TABLE Horario (
    Id VARCHAR(5) ,
    DiaDeLaSemana int ,
    Hora date ,
    CicloEscolar VARCHAR(20) ,
    Profesor VARCHAR(5) ,
    Curso VARCHAR(5) ,
    Grupo VARCHAR(5) ,
    Salon VARCHAR(5) ,
    CONSTRAINT PK_Horario PRIMARY KEY (Id),
    CONSTRAINT FK_Usr FOREIGN KEY (Profesor) REFERENCES Usr(Id),
    CONSTRAINT FK_Curso FOREIGN KEY (Curso) REFERENCES Curso(Id),
    CONSTRAINT FK_Grupo FOREIGN KEY (Grupo) REFERENCES Grupo(Id),
    CONSTRAINT FK_Salon FOREIGN KEY (Salon) REFERENCES Salon(Id)
);

INSERT INTO Category(Id,Nombre) VALUES (001,"Admin"),(002,"Profesor"),(003,"Prefecto");
