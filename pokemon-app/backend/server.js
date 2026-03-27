const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pokemonRoutes = require('./routes/pokemon');
const caughtPokemonRoutes = require('./routes/caughtPokemon');
const hallOfFameRoutes = require('./routes/hallOfFame');
const tradeRoutes = require('./routes/trade');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main route
app.use('/pokemon', pokemonRoutes);
app.use('/caught_pokemon', caughtPokemonRoutes);
app.use('/hall_of_fame', hallOfFameRoutes);
app.use('/trade', tradeRoutes);

app.get('/', (req, res) => {
    res.send('API de Pokémon funcionando correctamente.');
});

app.listen(PORT, () => {
    console.log(`Servidor Backend ejecutándose en http://localhost:${PORT}`);
});
