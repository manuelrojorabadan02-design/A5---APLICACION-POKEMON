import React from 'react';

const PokemonList = ({ pokemons }) => {
    if (pokemons.length === 0) {
        return <p>No se encontraron Pokemon.</p>;
    }

    return (
        <div className="pokemon-grid">
            {pokemons.map(poke => (
                <div key={poke.id} className="pokemon-card">
                    {/* Imagen de alta calidad de la PokeAPI */}
                    <div className="pokemon-image-container">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokedex_number}.png`}
                            alt={poke.name}
                            loading="lazy"
                        />
                    </div>
                    <h3>{poke.name}</h3>
                    <p style={{ margin: '0 0 10px', fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>
                        Nº {String(poke.pokedex_number).padStart(3, '0')}
                    </p>
                    <div className="types-container">
                        <span className={`type-badge type-${poke.type1.toLowerCase()}`}>{poke.type1}</span>
                        {poke.type2 && (
                            <span className={`type-badge type-${poke.type2.toLowerCase()}`}>{poke.type2}</span>
                        )}
                    </div>
                    <button
                        style={{ marginTop: '15px', background: 'green', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={async () => {
                            try {
                                const trId = prompt('¿Qué entrenador lo captura? (1=Ash, 2=Gary, 3=Misty, 4=Brock)', '1');
                                if (!trId) return;
                                const res = await fetch('http://localhost:5000/caught_pokemon', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ pokedex_number: poke.pokedex_number, trainer_id: trId, nickname: poke.name })
                                });
                                if (res.ok) alert('¡Capturado con éxito!');
                                else alert('Error al capturar');
                            } catch (e) { console.error(e) }
                        }}
                    >
                        Capturar
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;
