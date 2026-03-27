import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList.jsx';
import Search from './components/Search.jsx';
import MyPokemon from './components/MyPokemon.jsx';
import HallOfFame from './components/HallOfFame.jsx';
import TradeCenter from './components/TradeCenter.jsx';
import './index.css';

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [executionTime, setExecutionTime] = useState(null);
    const [view, setView] = useState('pokedex');

    const fetchPokemons = async () => {
        try {
            let url = 'http://localhost:5000/pokemon?';
            if (search) url += `name=${search}&`;
            if (type) url += `type=${type}`;

            const response = await fetch(url);
            const jsonResponse = await response.json();

            // Adapt to new backend format { data, executionTimeMs } or old format array
            if (jsonResponse.data) {
                setPokemons(jsonResponse.data);
                setExecutionTime(jsonResponse.executionTimeMs);
            } else {
                setPokemons(jsonResponse);
                setExecutionTime(null);
            }
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
            <nav className="nav-menu">
                <button onClick={() => setView('pokedex')} className={view === 'pokedex' ? 'active' : ''}>Pokedex</button>
                <button onClick={() => setView('my_pokemon')} className={view === 'my_pokemon' ? 'active' : ''}>Mis Pokemon</button>
                <button onClick={() => setView('hof')} className={view === 'hof' ? 'active' : ''}>Salón de Fama</button>
                <button onClick={() => setView('trade')} className={view === 'trade' ? 'active' : ''}>Intercambiar</button>
            </nav>

            {view === 'pokedex' && (
                <>
                    <Search
                        search={search}
                        setSearch={setSearch}
                        type={type}
                        setType={setType}
                        executionTime={executionTime}
                    />
                    <PokemonList pokemons={pokemons} />
                </>
            )}

            {view === 'my_pokemon' && <MyPokemon />}
            {view === 'hof' && <HallOfFame />}
            {view === 'trade' && <TradeCenter />}
        </div>
    );
}

export default App;
