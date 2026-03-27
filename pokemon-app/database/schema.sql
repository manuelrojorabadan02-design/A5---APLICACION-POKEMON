-- pokemon-app/database/schema.sql

CREATE DATABASE IF NOT EXISTS app_db;
USE app_db;

DROP VIEW IF EXISTS vista_top_competitivo;
DROP TABLE IF EXISTS caught_pokemon;
DROP TABLE IF EXISTS gym;
DROP TABLE IF EXISTS trainer;
DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokedex_number INT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    type1 VARCHAR(50) NOT NULL,
    type2 VARCHAR(50) DEFAULT NULL,
    generation INT NOT NULL,
    hp INT DEFAULT 0,
    attack INT DEFAULT 0,
    defense INT DEFAULT 0,
    sp_attack INT DEFAULT 0,
    sp_defense INT DEFAULT 0,
    speed INT DEFAULT 0
);

CREATE TABLE trainer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE gym (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    leader_id INT,
    FOREIGN KEY (leader_id) REFERENCES trainer(id)
);

CREATE TABLE caught_pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokedex_number INT NOT NULL,
    trainer_id INT NOT NULL,
    level INT DEFAULT 1,
    stats INT DEFAULT 0,
    nickname VARCHAR(100) DEFAULT NULL,
    FOREIGN KEY (pokedex_number) REFERENCES pokemon(pokedex_number),
    FOREIGN KEY (trainer_id) REFERENCES trainer(id)
);

CREATE VIEW vista_top_competitivo AS 
SELECT 
    name, 
    (hp + attack + defense + sp_attack + sp_defense + speed) as total_stats 
FROM pokemon 
ORDER BY total_stats DESC 
LIMIT 10;

-- Datos iniciales (Seed) de entrenadores y gimnasios
INSERT INTO trainer (id, name) VALUES 
(1, 'Ash Ketchum'),
(2, 'Gary Oak'),
(3, 'Misty'),
(4, 'Brock');

INSERT INTO gym (id, name, leader_id) VALUES 
(1, 'Gimnasio Celeste', 3),
(2, 'Gimnasio Plateado', 4);
