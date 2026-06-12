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

INSERT INTO filmes (
    imdb_id, titulo, diretor, genero, ano, poster_url, sinopse,
    status, nota, comentario, data_assistido
) VALUES
(
    'tt0317248',
    'Cidade de Deus',
    'Fernando Meirelles, Katia Lund',
    'Crime, Drama',
    2002,
    'https://m.media-amazon.com/images/M/MV5BNmZkNTZkODQtMmJlMC00Y2Q1LTk3NmMtMjIyOTlmYzA2NzJlXkEyXkFqcGc@._V1_SX300.jpg',
    'In the slums of Rio, two kids paths diverge as one struggles to become a photographer and the other a kingpin.',
    'ASSISTIDO',
    5.0,
    'Um filme intenso, muito bem dirigido e marcante do inicio ao fim.',
    '2026-06-09'
),
(
    'tt0457430',
    'El laberinto del fauno',
    'Guillermo del Toro',
    'Drama, Fantasy, War',
    2006,
    'https://m.media-amazon.com/images/M/MV5BYzFjZGE3MjctMzViOS00NzQyLWIwZTMtYzUwZDMwNjcyNDRkXkEyXkFqcGc@._V1_SX300.jpg',
    'In 1944 Spain, a girl finds a mysterious labyrinth and meets a faun.',
    'ASSISTIDO',
    4.5,
    'Mistura fantasia e brutalidade historica de um jeito muito bonito.',
    '2026-06-08'
);
