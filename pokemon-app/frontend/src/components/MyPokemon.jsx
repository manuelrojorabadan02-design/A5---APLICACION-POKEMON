import React, { useState, useEffect } from 'react';

const MyPokemon = () => {
    const [caughtPokemon, setCaughtPokemon] = useState([]);

    const loadPokemon = () => {
        fetch('http://localhost:5000/caught_pokemon')
            .then(res => res.json())
            .then(data => setCaughtPokemon(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        loadPokemon();
    }, []);

    const handleTrain = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/caught_pokemon/${id}/train`, { method: 'PUT' });
            const data = await res.json();
            if (res.ok) {
                alert(`¡Entrenamiento completado! ${data.evolved ? '¡Y ha EVOLUCIONADO!' : ''}`);
                loadPokemon();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRelease = async (id) => {
        if (!window.confirm("¿Seguro que quieres liberar a este Pokemon?")) return;
        try {
            const res = await fetch(`http://localhost:5000/caught_pokemon/${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert("Pokemon liberado.");
                loadPokemon();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="my-pokemon-container">
            <h2>Mis Pokemon</h2>
            <div className="pokemon-grid">
                {caughtPokemon.map(cp => (
                    <div key={cp.id} className="pokemon-card">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${cp.pokedex_number}.png`}
                            alt={cp.name}
                            loading="lazy"
                            style={{ width: '100px' }}
                        />
                        <h3>{cp.name}</h3>
                        <p>Nv. {cp.level}</p>
                        <p>Stats: {cp.stats}</p>
                        <p>Entrenador: {cp.trainer_name}</p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                            <button onClick={() => handleTrain(cp.id)} style={{ background: 'blue', color: 'white', padding: '5px', cursor: 'pointer' }}>Entrenar</button>
                            <button onClick={() => handleRelease(cp.id)} style={{ background: 'red', color: 'white', padding: '5px', cursor: 'pointer' }}>Liberar</button>
                        </div>
                    </div>
                ))}
            </div>
            {caughtPokemon.length === 0 && <p>No has capturado ningún Pokemon todavía.</p>}
        </div>
    );
};

export default MyPokemon;
