# Documentación Técnica: Ampliación Pokedex

## 1. CRUD Pokedex
Se han implementado las operaciones requeridas en las nuevas tablas de la base de datos:
- **Capturar (INSERT)**: Ahora cada tarjeta de Pokemon en la vista principal tiene un botón "Capturar". Al pulsarlo, el sistema lanza una petición `POST` al endpoint `/caught_pokemon` asociando el ID del Pokemon seleccionado con un Entrenador (Trainer) en la nueva tabla `caught_pokemon`.
- **Entrenar y Evolucionar (UPDATE)**: En la sección "Mis Pokemon", el botón "Entrenar" lanza una petición `PUT` que aumenta el nivel y las estadísticas (stats) del Pokemon. La lógica del backend comprueba el nivel tras aumentar (ej. nivel 16 o 36) y actualiza de manera automática la especie (`pokedex_number`) a su siguiente fase evolutiva si corresponde.
- **Liberar (DELETE)**: En la misma sección, el botón "Liberar" lanza una petición `DELETE` que elimina físicamente el registro del Pokemon dentro de la tabla `caught_pokemon`.

## 2. Vistas: Salón de la Fama
Se ha creado una vista en la base de datos MySQL denominada `vista_top_competitivo` que extrae el Top 10 de Pokémon ordenados descendentemente por la suma total de sus stats base (HP + Attack + Defense + Sp. Attack + Sp. Defense + Speed).
En React, la pestaña "Salón de la Fama" consume el endpoint `/hall_of_fame` para renderizar esta tabla en tiempo real basándose en la vista de la base de datos.

## 3. Índices y Rendimiento
- **Importación masiva**: Se desarrolló un script en Node (`seedPokemons.js`) que consumió la PokéAPI en tiempo real para insertar de manera automatizada más de 1000 Pokémon en la base de datos.
- **Medición de Tiempos**: El endpoint de búsqueda `GET /pokemon?name=...` utiliza internamente `performance.now()` en NodeJS para medir exactamente los milisegundos que transcurren durante el `pool.query()`. Este valor es devuelto y expuesto en la interfaz React en la barra de búsqueda.
- **Creación del Índice**: *[AÑADIR CAPTURAS ANTES DEL ÍNDICE]*
Para optimizar las búsquedas por nombre, se ejecuta en la base de datos la query:
`CREATE INDEX idx_pokemon_name ON pokemon(name);`
El código SQL en el backend usa una cláusula de exact match/prefijo (`LIKE 'Text%'`) en lugar de fuzzy search (`LIKE '%Text%'`) para asegurar que el motor B-Tree aprovecha el índice. *[AÑADIR CAPTURAS DESPUÉS DEL ÍNDICE]* y comparar la mejora radical en los tiempos (ms).

## 4. Transacciones - Intercambio Seguro de Pokemons
Se ha modificado el script de Base de Datos para integrar el concepto de Gimnasios y Entrenadores, añadiendo tablas auxiliares `gym` y `trainer`.
Se desarrolló un "Centro de Intercambio", el cual invoca el endpoint seguro `POST /trade`.
**Mecanismo Transaccional**:
- `START TRANSACTION`: Se adquiere un `connection` aislado del MySQL pool y se inicia la transacción.
- Validaciones: Se comprueba que el Pokemon A pertenezca al Entrenador A y el Pokemon B al Entrenador B.
- `UPDATE`: Se invierten los valores de la propiedad `trainer_id` de los dos registros de `caught_pokemon`.
- `COMMIT` o `ROLLBACK`: Si alguna validación falla en mitad del proceso o hay una excepción de BD, se realiza un rollback revirtiendo cualquier cambio previo en la base de datos. Si todo éxito, las escrituras se hacen atómicas mediante commit.
