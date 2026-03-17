import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList.jsx';
import Search from './components/Search.jsx';
import './index.css';

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');

    const fetchPokemons = async () => {
        try {
            let url = 'http://localhost:5000/pokemon?';
            if (search) url += `name=${search}&`;
            if (type) url += `type=${type}`;

            const response = await fetch(url);
            const data = await response.json();
            setPokemons(data);
        } catch (error) {
            console.error("Error conectando al backend:", error);
        }
    };

    // Llamada al backend cada vez que cambian los filtros
    useEffect(() => {
        fetchPokemons();
    }, [search, type]);

    return (
        <div className="app-container">
            <h1>Mi Pokedex</h1>
            <Search
                search={search}
                setSearch={setSearch}
                type={type}
                setType={setType}
            />
            <PokemonList pokemons={pokemons} />
        </div>
    );
}

export default App;
