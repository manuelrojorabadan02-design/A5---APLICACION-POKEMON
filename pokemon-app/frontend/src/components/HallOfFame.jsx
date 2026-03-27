import React, { useState, useEffect } from 'react';

const HallOfFame = () => {
    const [topPokemon, setTopPokemon] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/hall_of_fame')
            .then(res => res.json())
            .then(data => setTopPokemon(data))
            .catch(err => console.error("Error fetching Hall of Fame:", err));
    }, []);

    return (
        <div className="hall-of-fame-container">
            <h2>Salón de la Fama (Top Competitivo)</h2>
            <table className="hof-table">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Pokemon</th>
                        <th>Stats Base Totales</th>
                    </tr>
                </thead>
                <tbody>
                    {topPokemon.map((poke, index) => (
                        <tr key={index}>
                            <td>#{index + 1}</td>
                            <td>{poke.name}</td>
                            <td>{poke.total_stats}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HallOfFame;
