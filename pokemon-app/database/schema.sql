-- pokemon-app/database/schema.sql

CREATE DATABASE IF NOT EXISTS pokemon_db;
USE pokemon_db;

CREATE TABLE IF NOT EXISTS pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokedex_number INT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    type1 VARCHAR(50) NOT NULL,
    type2 VARCHAR(50) DEFAULT NULL,
    generation INT NOT NULL
);

-- Datos iniciales (Seed)
INSERT IGNORE INTO pokemon (pokedex_number, name, type1, type2, generation) VALUES 
(1, 'Bulbasaur', 'Planta', 'Veneno', 1),
(2, 'Ivysaur', 'Planta', 'Veneno', 1),
(3, 'Venusaur', 'Planta', 'Veneno', 1),
(4, 'Charmander', 'Fuego', NULL, 1),
(5, 'Charmeleon', 'Fuego', NULL, 1),
(6, 'Charizard', 'Fuego', 'Volador', 1),
(7, 'Squirtle', 'Agua', NULL, 1),
(8, 'Wartortle', 'Agua', NULL, 1),
(9, 'Blastoise', 'Agua', NULL, 1),
(25, 'Pikachu', 'Eléctrico', NULL, 1),
(26, 'Raichu', 'Eléctrico', NULL, 1),
(133, 'Eevee', 'Normal', NULL, 1),
(143, 'Snorlax', 'Normal', NULL, 1),
(149, 'Dragonite', 'Dragón', 'Volador', 1),
(150, 'Mewtwo', 'Psíquico', NULL, 1);
