const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener el Top 10 competitivo leyendo la vista
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vista_top_competitivo');
        res.json(rows);
    } catch (error) {
        console.error("Error obteniendo hall of fame:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
