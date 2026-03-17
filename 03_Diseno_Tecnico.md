# PARTE 3 – DISEÑO TÉCNICO

## 1. Estructura de carpetas para Linux

El proyecto seguirá una arquitectura estándar de monorepositorio con dos carpetas principales (Frontend y Backend).

```text
/pokemon-app
├── /backend
│   ├── /config
│   │   └── db.js            # Conexión a la base de datos
│   ├── /controllers
│   │   └── pokemonController.js # Lógica de los endpoints
│   ├── /routes
│   │   └── pokemonRoutes.js # Definición de las rutas del API
│   ├── .env                 # Variables de entorno (credenciales BD)
│   ├── package.json         # Dependencias de Node.js
│   └── server.js            # Archivo principal de Express
└── /frontend
    ├── /public
    │   └── index.html
    ├── /src
    │   ├── /components
    │   │   ├── PokemonList.jsx  # Componente que lista los Pokémon
    │   │   └── PokemonCard.jsx  # Tarjeta individual con imagen y datos
    │   ├── App.jsx              # Componente principal
    │   └── index.css            # Estilos principales
    └── package.json         # Dependencias de React
```

## 2. Diseño de base de datos y Tablas Necesarias

Se utilizará un modelo relacional sencillo en **MySQL** (o PostgreSQL). La tabla principal almacenará la información básica que cruzaremos con la PokeAPI.

### Modelo de la Tabla `pokemon`

| Columna | Tipo de Dato | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único interno. |
| `pokedex_number` | INT | NOT NULL, UNIQUE | Número en la Pokedex Nacional (usado para llamar a la PokeAPI). |
| `name` | VARCHAR(100) | NOT NULL | Nombre del Pokémon. |
| `type1` | VARCHAR(50) | NOT NULL | Tipo principal (ej. Fuego, Agua). |
| `type2` | VARCHAR(50) | NULL | Tipo secundario (puede ser nulo). |
| `generation` | INT | NOT NULL | Generación a la que pertenece (1, 2, 3...). |

### Script SQL de Creación

```sql
CREATE DATABASE IF NOT EXISTS pokemon_db;
USE pokemon_db;

CREATE TABLE pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokedex_number INT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    type1 VARCHAR(50) NOT NULL,
    type2 VARCHAR(50),
    generation INT NOT NULL
);

-- Datos de Ejemplo
INSERT INTO pokemon (pokedex_number, name, type1, type2, generation) VALUES 
(1, 'Bulbasaur', 'Planta', 'Veneno', 1),
(4, 'Charmander', 'Fuego', NULL, 1),
(7, 'Squirtle', 'Agua', NULL, 1),
(25, 'Pikachu', 'Eléctrico', NULL, 1);
```

## 3. Endpoints del Backend

El servidor Node.js/Express expondrá la siguiente API RESTful para ser consumida por React:

| Método | Endpoint | Parámetros Query | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/pokemon` | Ninguno | Retorna la lista completa de Pokémon registrados en formato JSON. |
| **GET** | `/api/pokemon` | `?type=Fuego` | Retorna los Pokémon filtrados por el tipo especificado. |
| **GET** | `/api/pokemon` | `?search=char` | Retorna los Pokémon cuyo nombre coincida con la búsqueda (LIKE). |
