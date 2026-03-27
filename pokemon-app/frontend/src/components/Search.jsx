import React from 'react';

const Search = ({ search, setSearch, type, setType, executionTime }) => {
    return (
        <div className="search-container">
            {executionTime !== null && (
                <div className="execution-time">
                    Tiempo de consulta: {executionTime.toFixed(2)} ms
                </div>
            )}
            <input
                type="text"
                className="search-input"
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                className="type-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">Todos los tipos</option>
                <option value="Fuego">Fuego</option>
                <option value="Agua">Agua</option>
                <option value="Planta">Planta</option>
                <option value="Eléctrico">Eléctrico</option>
                <option value="Normal">Normal</option>
                <option value="Veneno">Veneno</option>
                <option value="Volador">Volador</option>
                <option value="Dragón">Dragón</option>
                <option value="Psíquico">Psíquico</option>
            </select>
        </div>
    );
};

export default Search;
