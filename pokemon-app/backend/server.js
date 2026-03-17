const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pokemonRoutes = require('./routes/pokemon');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main route
app.use('/pokemon', pokemonRoutes);

app.get('/', (req, res) => {
    res.send('API de Pokémon funcionando correctamente.');
});

app.listen(PORT, () => {
    console.log(`Servidor Backend ejecutándose en http://localhost:${PORT}`);
});
