const express = require('express');
const router = express.Router();
const pool = require('../db');

// Catch a Pokemon
router.post('/', async (req, res) => {
    try {
        const { pokedex_number, trainer_id, nickname } = req.body;
        if (!pokedex_number || !trainer_id) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const query = 'INSERT INTO caught_pokemon (pokedex_number, trainer_id, nickname) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [pokedex_number, trainer_id, nickname || null]);

        res.status(201).json({ message: 'Pokemon capturado con exito', id: result.insertId });
    } catch (error) {
        console.error("Error al capturar pokemon:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Get all caught Pokemon
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT c.*, p.name, p.type1, p.type2, p.hp, p.attack, p.defense, p.sp_attack, p.sp_defense, p.speed, t.name as trainer_name
            FROM caught_pokemon c
            JOIN pokemon p ON c.pokedex_number = p.pokedex_number
            JOIN trainer t ON c.trainer_id = t.id
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error obteniendo pokemon capturados:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Train a Pokemon
router.put('/:id/train', async (req, res) => {
    try {
        const caughtId = req.params.id;

        // Retrieve current level
        const [rows] = await pool.query('SELECT level, pokedex_number FROM caught_pokemon WHERE id = ?', [caughtId]);
        if (rows.length === 0) return res.status(404).json({ error: 'Pokemon no encontrado' });

        let currentLevel = rows[0].level;
        let currentPokedex = rows[0].pokedex_number;

        currentLevel += 1; // Increase level by 1

        // Auto-Evolution Simulation (Simplified for MVP):
        // If Bulbasaur(1) and level >= 16 -> Ivysaur(2)
        // If Charmander(4) and level >= 16 -> Charmeleon(5)
        // If Squirtle(7) and level >= 16 -> Wartortle(8)
        let newPokedex = currentPokedex;
        if (currentLevel >= 16) {
            if (currentPokedex === 1) newPokedex = 2; // Bulbasaur -> Ivysaur
            if (currentPokedex === 4) newPokedex = 5; // Charmander -> Charmeleon
            if (currentPokedex === 7) newPokedex = 8; // Squirtle -> Wartortle
        }
        if (currentLevel >= 36) {
            if (currentPokedex === 2) newPokedex = 3; // Ivysaur -> Venusaur
            if (currentPokedex === 5) newPokedex = 6; // Charmeleon -> Charizard
            if (currentPokedex === 8) newPokedex = 9; // Wartortle -> Blastoise
        }

        // Increase stats
        const updateQuery = 'UPDATE caught_pokemon SET level = ?, pokedex_number = ?, stats = stats + 10 WHERE id = ?';
        await pool.query(updateQuery, [currentLevel, newPokedex, caughtId]);

        res.json({ message: 'Pokemon entrenado con exito', newLevel: currentLevel, evolved: newPokedex !== currentPokedex });
    } catch (error) {
        console.error("Error al entrenar pokemon:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Release a Pokemon
router.delete('/:id', async (req, res) => {
    try {
        const caughtId = req.params.id;
        const query = 'DELETE FROM caught_pokemon WHERE id = ?';
        const [result] = await pool.query(query, [caughtId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pokemon no encontrado' });
        }

        res.json({ message: 'Pokemon liberado' });
    } catch (error) {
        console.error("Error al liberar pokemon:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
