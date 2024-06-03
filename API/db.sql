CREATE database Loja;
USE Loja;

create table cardapio(
    id int auto_increment primary key,
    nome varchar(50) not null
);

create table grupo(
    id int auto_increment primary key,
    nome varchar(50),
    idCardapio int,
    foreign key (idCardapio) references cardapio(id)
);

create table produto(
    id int auto_increment primary key,
    nome varchar(50) not null,
    descricao varchar(500),
    valor decimal(10,2),
    peso varchar(10),
    imagem varchar(255),
    idCardapio int,
    idGrupo int,
    FOREIGN KEY (idCardapio) REFERENCES cardapio(id),
    FOREIGN KEY (idGrupo) REFERENCES grupo(id)
);

create table Imagem(
    id int auto_increment primary key,
    titulo varchar(20),
    imagem varchar(255),
    carrossel int not null
);

create table Evento(
    id int auto_increment primary key,
    titulo varchar(50) not null,
    dataInicio datetime,
    dataFim datetime,
    valor decimal(10,2),
    descricao varchar(500),
    imagem varchar(255)
);