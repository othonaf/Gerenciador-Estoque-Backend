-- Active: 1712061061117@@dpg-co5k1ve3e1ms73b7jn8g-a.ohio-postgres.render.com@5432@gerenciador_de_estoque

create type perfilTipo as ENUM ('admin', 'normal', 'mestre');


CREATE TABLE if NOT exists usuario (
    cpf NUMERIC NOT null PRIMARY KEY,
    nome varchar NOT NULL,
    senha VARCHAR (120) NOT NULL,
    perfil perfilTipo NOT NULL DEFAULT 'normal',
    email VARCHAR NOT NULL,
    telefone NUMERIC (11)
);

create table if not exists produto (
    codProd NUMERIC not null primary key,
    descricao text not null unique,
    valorDeCompra DECIMAL not NULL,
    valorDeVenda DECIMAL NOT NULL,
    created_at timestamp with time zone not null default now(),
    vencimento timestamp with time zone not null,
    quantidade NUMERIC NOT NULL,
    setor VARCHAR(20)
);
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE Table if not exists vendas (
    id UUID NOT NULL default uuid_generate_v4() primary key,
    data TIMESTAMP with time zone not null DEFAULT now(),
    valorTotal decimal NOT null,
    vendedor NUMERIC REFERENCES usuario (cpf)
);

CREATE TABLE IF NOT EXISTS venda_produto (
    venda_id UUID NOT NULL REFERENCES vendas(id),
    produto_id NUMERIC NOT NULL REFERENCES produto(codProd),
    PRIMARY KEY (venda_id, produto_id),
    total_lucro numeric NOT NULL
);

SELECT * FROM usuario;

SELECT * FROM vendas;

SELECT * FROM venda_produto;