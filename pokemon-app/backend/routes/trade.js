const express = require('express');
const router = express.Router();
const pool = require('../db');

// Realizar intercambio de Pokemon entre dos entrenadores usando Transacciones Seguras
router.post('/', async (req, res) => {
    const { trainer1_id, pokemon1_id, trainer2_id, pokemon2_id } = req.body;

    // START TRANSACTION equivalents in Code
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Verify Pokemon 1 belongs to Trainer 1
        const [rows1] = await connection.query('SELECT trainer_id FROM caught_pokemon WHERE id = ?', [pokemon1_id]);
        if (rows1.length === 0 || rows1[0].trainer_id !== parseInt(trainer1_id)) {
            throw new Error('El Pokemon 1 no pertenece al Entrenador 1');
        }

        // Verify Pokemon 2 belongs to Trainer 2
        const [rows2] = await connection.query('SELECT trainer_id FROM caught_pokemon WHERE id = ?', [pokemon2_id]);
        if (rows2.length === 0 || rows2[0].trainer_id !== parseInt(trainer2_id)) {
            throw new Error('El Pokemon 2 no pertenece al Entrenador 2');
        }

        // Update ownership (The Trade)
        await connection.query('UPDATE caught_pokemon SET trainer_id = ? WHERE id = ?', [trainer2_id, pokemon1_id]);
        await connection.query('UPDATE caught_pokemon SET trainer_id = ? WHERE id = ?', [trainer1_id, pokemon2_id]);

        // COMMIT the transaction
        await connection.commit();
        res.json({ message: 'Intercambio realizado con éxito de manera segura' });
    } catch (error) {
        // ROLLBACK on any error
        await connection.rollback();
        console.error("Error en el intercambio, haciendo ROLLBACK:", error);
        res.status(400).json({ error: error.message || 'Error interno durante el intercambio (Rollback ejecutado)' });
    } finally {
        connection.release();
    }
});

// Enpoint auxiliar para obtener la lista de entrenadores
router.get('/trainers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM trainer');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
