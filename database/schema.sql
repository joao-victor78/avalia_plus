CREATE DATABASE avalia_plus;

\c avalia_plus;

CREATE TABLE IF NOT EXISTS filmes (
    id BIGSERIAL PRIMARY KEY,
    imdb_id VARCHAR(20) NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    diretor VARCHAR(120) NOT NULL,
    genero VARCHAR(80) NOT NULL,
    ano INTEGER NOT NULL CHECK (ano >= 1888 AND ano <= 2100),
    poster_url TEXT,
    sinopse TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('ASSISTIDO', 'QUERO_ASSISTIR')),
    nota NUMERIC(2, 1) NOT NULL CHECK (nota >= 0 AND nota <= 5),
    comentario TEXT NOT NULL,
    data_assistido DATE NOT NULL
);
