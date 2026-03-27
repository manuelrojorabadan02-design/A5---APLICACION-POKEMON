const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /pokemon -> Obtiene todos los pokemon (con opción a filtrar por query params)
router.get('/', async (req, res) => {
    try {
        const { name, type } = req.query;
        let query = 'SELECT * FROM pokemon WHERE 1=1';
        let params = [];

        if (name) {
            query += ' AND name LIKE ?';
            params.push(`${name}%`);
        }

        if (type) {
            query += ' AND (type1 = ? OR type2 = ?)';
            params.push(type, type);
        }

        const startTime = performance.now();
        const [rows] = await pool.query(query, params);
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        console.log(`Consulta de buscar pokemon tardó: ${executionTime.toFixed(2)} ms`);

        res.json({ data: rows, executionTimeMs: executionTime });
    } catch (error) {
        console.error("Error obteniendo pokemon:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
