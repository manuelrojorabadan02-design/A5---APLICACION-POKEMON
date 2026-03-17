# PARTE 4 – DESARROLLO

A continuación se detalla el código fuente necesario para hacer funcionar tanto el Backend como el Frontend.

## 1. Backend: Node.js + Express + MySQL

### A. Dependencias y Archivo Principal (`backend/server.js`)
Configuración base de Express, middleware CORS y rutas.

```javascript
const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemonRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoints
app.use('/api/pokemon', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Backend ejecutándose en http://localhost:${PORT}`);
});
```

### B. Conexión a Base de Datos (`backend/config/db.js`)
Piscina de conexiones a MySQL.

```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pokemon_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

### C. Lógica de Endpoints (Listar y Filtrar) (`backend/controllers/pokemonController.js`)
Este controlador recibe la llamada, mira si hay filtros o búsquedas y hace la consulta a la BD.

```javascript
const pool = require('../config/db');

const getPokemons = async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = 'SELECT * FROM pokemon WHERE 1=1';
    let params = [];

    // Endpoint para buscar (Filtro por nombre)
    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    // Endpoint para filtrar (Filtro por tipo)
    if (type) {
      query += ' AND (type1 = ? OR type2 = ?)';
      params.push(type, type);
    }

    const [rows] = await pool.query(query, params);
    
    // Devolvemos el array resultante en formato JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error conectando a la base de datos' });
  }
};

module.exports = { getPokemons };
```

### D. Rutas (`backend/routes/pokemonRoutes.js`)

```javascript
const express = require('express');
const router = express.Router();
const { getPokemons } = require('../controllers/pokemonController');

// Define la ruta base HTTP GET /api/pokemon
router.get('/', getPokemons);

module.exports = router;
```

---

## 2. Frontend: React + Integración Externa (PokeAPI)

### A. Componente Principal (`frontend/src/App.jsx`)
App.jsx maneja la interfaz de filtrado y búsqueda.

```jsx
import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  // Llama al Backend Node.js
  const fetchPokemons = async () => {
    try {
      let url = `http://localhost:5000/api/pokemon?`;
      if (search) url += `search=${search}&`;
      if (type) url += `type=${type}`;

      const response = await fetch(url);
      const data = await response.json();
      setPokemons(data);
    } catch (error) {
      console.error("Error al obtener los pokemon:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [search, type]);

  return (
    <div className="App">
      <h1>Biblioteca Pokémon</h1>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Buscar Pokémon..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="Fuego">Fuego</option>
          <option value="Agua">Agua</option>
          <option value="Planta">Planta</option>
          <option value="Eléctrico">Eléctrico</option>
        </select>
      </div>
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default App;
```

### B. Listado y Conexión a API Externa (`frontend/src/components/PokemonList.jsx`)
Acá se mapea el array de la BD y, por cada uno, construimos la imagen desde la PokeAPI externa. 
*Nota: La imagen se extrae directamente formando la URL oficial basada en el `pokedex_number` devuelto por nuestro backend.*

```jsx
import React from 'react';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="pokemon-grid">
      {pokemons.length > 0 ? (
        pokemons.map((poke) => (
          <div key={poke.id} className="pokemon-card">
            {/* CONEXIÓN A API EXTERNA (PokeAPI) PARA IMÁGENES */}
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokedex_number}.png`} 
              alt={poke.name} 
              loading="lazy"
            />
            <h3>{poke.name}</h3>
            <p>Nº Pokedex: {poke.pokedex_number}</p>
            <div className="types">
              <span className={`type ${poke.type1.toLowerCase()}`}>{poke.type1}</span>
              {poke.type2 && <span className={`type ${poke.type2.toLowerCase()}`}>{poke.type2}</span>}
            </div>
          </div>
        ))
      ) : (
        <p>No se encontraron Pokémon con esos filtros.</p>
      )}
    </div>
  );
};

export default PokemonList;
```
