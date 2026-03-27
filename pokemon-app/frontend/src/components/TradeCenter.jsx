import React, { useState, useEffect } from 'react';

const TradeCenter = () => {
    const [trainers, setTrainers] = useState([]);
    const [caughtPokemon, setCaughtPokemon] = useState([]);

    // Trade Form State
    const [trainer1, setTrainer1] = useState('');
    const [pokemon1, setPokemon1] = useState('');
    const [trainer2, setTrainer2] = useState('');
    const [pokemon2, setPokemon2] = useState('');

    const loadData = async () => {
        try {
            const [tRes, pRes] = await Promise.all([
                fetch('http://localhost:5000/trade/trainers'),
                fetch('http://localhost:5000/caught_pokemon')
            ]);
            setTrainers(await tRes.json());
            setCaughtPokemon(await pRes.json());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleTrade = async (e) => {
        e.preventDefault();
        if (!trainer1 || !pokemon1 || !trainer2 || !pokemon2) {
            return alert("Por favor selecciona todos los campos");
        }
        if (trainer1 === trainer2) {
            return alert("El intercambio debe ser entre dos entrenadores distintos");
        }

        try {
            const res = await fetch('http://localhost:5000/trade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trainer1_id: trainer1,
                    pokemon1_id: pokemon1,
                    trainer2_id: trainer2,
                    pokemon2_id: pokemon2
                })
            });
            const data = await res.json();

            if (res.ok) {
                alert(`Éxito: ${data.message}`);
                loadData(); // reload lists to reflect ownership changes
            } else {
                alert(`Error en el intercambio: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión durante el intercambio");
        }
    };

    return (
        <div className="trade-center-container">
            <h2>Centro de Intercambio (Transacciones)</h2>
            <form onSubmit={handleTrade} className="trade-form" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                    <h3>Entrenador 1</h3>
                    <select value={trainer1} onChange={(e) => setTrainer1(e.target.value)} required>
                        <option value="">-- Selecciona Entrenador --</option>
                        {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <br /><br />
                    <select value={pokemon1} onChange={(e) => setPokemon1(e.target.value)} required>
                        <option value="">-- Selecciona Pokemon a dar --</option>
                        {caughtPokemon.filter(cp => cp.trainer_id.toString() === trainer1).map(cp => (
                            <option key={cp.id} value={cp.id}>{cp.name} (Nv. {cp.level})</option>
                        ))}
                    </select>
                </div>

                <div style={{ alignSelf: 'center' }}>
                    <button type="submit" style={{ padding: '15px 30px', background: '#e0c83a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        &lt; INTERCAMBIAR &gt;
                    </button>
                    <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>(Operación Atómica)</p>
                </div>

                <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                    <h3>Entrenador 2</h3>
                    <select value={trainer2} onChange={(e) => setTrainer2(e.target.value)} required>
                        <option value="">-- Selecciona Entrenador --</option>
                        {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <br /><br />
                    <select value={pokemon2} onChange={(e) => setPokemon2(e.target.value)} required>
                        <option value="">-- Selecciona Pokemon a dar --</option>
                        {caughtPokemon.filter(cp => cp.trainer_id.toString() === trainer2).map(cp => (
                            <option key={cp.id} value={cp.id}>{cp.name} (Nv. {cp.level})</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
};

export default TradeCenter;
