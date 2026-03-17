import React from 'react';

const PokemonList = ({ pokemons }) => {
    if (pokemons.length === 0) {
        return <p>No se encontraron Pokémon.</p>;
    }

    return (
        <div className="pokemon-grid">
            {pokemons.map(poke => (
                <div key={poke.id} className="pokemon-card">
                    {/* Imagen obtenida mediante la PokeAPI con lógica en el frontend */}
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokedex_number}.png`}
                        alt={poke.name}
                        loading="lazy"
                    />
                    <h3>{poke.name}</h3>
                    <p>Nº Pokedex: {poke.pokedex_number}</p>
                    <div>
                        <span className={`type-badge type-${poke.type1.toLowerCase()}`}>{poke.type1}</span>
                        {poke.type2 && (
                            <span className={`type-badge type-${poke.type2.toLowerCase()}`}>{poke.type2}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;
