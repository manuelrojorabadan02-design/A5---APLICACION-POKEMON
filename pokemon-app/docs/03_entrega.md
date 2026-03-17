# 7. Entrega Final del Proyecto

## Memoria del Proyecto
El proyecto consistía en desarrollar una herramienta web estilo "Pokedex" siguiendo la arquitectura Cliente-Servidor (Full-Stack). La aplicación consta de dos capas claras e interconectadas:
* **Frontend (React + Vite):** Proveedor de una interfaz de usuario fluida desarrollada en componentes (`App.jsx`, `PokemonList.jsx`, `Search.jsx`). Implementa React Hooks (`useState`, `useEffect`) para cargar los datos en el montaje y en la actualización de filtros.
* **Backend (Node.js + Express):** Provee una API REST con protección a las inyecciones SQL que consulta la base de datos MySQL usando el paquete de node `mysql2/promise`.

Una innovación destacable es la técnica del origen dual de datos: mientras que el nombre y tipo del Pokémon provienen de una consulta local SQL de altísima velocidad, la imagen es extraída y resuelta dinámicamente llamando a la PokeAPI usando el número de pokedex, aliviando la carga al servidor propio.

## Explicación del Proyecto
Se estructuró el código separando las responsabilidades de Node.js al puerto 5000 y el cliente React en el entorno de desarrollo local Vite (puerto 3000/5173). Cuando el usuario busca o filtra, Express construye un query SQL concatenado en base de los `req.query`, ejecutando prepared statements para evitar SQL Inject.

## Guion para Vídeo Demo (2 Minutos)
**Presentación:** "Bienvenidos a la demo interactiva de la Pokedex local. Aquí mostramos las terminales; la de arriba tiene el backend sirviendo desde localhost 5000 y conectado a MySQL, la de abajo el front."
**Flujo inicial:** "Cuando se refresca el navegador, vemos todos los Pokémon iniciales. Estos nombres provienen de la tabla local en SQL. Los sprites se descargan maravillosamente desde la PokeAPI conectando este número a su endpoint oficial."
**Filtros en Vivo:** "El frontend cuenta con un menú. Si escribo 'Pikachu' veremos cómo React pide de nuevo los datos al Backend inyectando query params, Node.js hace un LIKE '%Pikachu%' en MySQL y nos responde la grilla final. O con el selector, podemos decir 'tipo Fuego'."
**Finalización:** "Es un proyecto full-stack 100% funcional. Gracias."

## Instrucciones para subir a GitHub
1. Abre tu terminal en el directorio raíz (`cd pokemon-app`).
2. Crea un archivo `.gitignore` con este contenido estricto:
```text
node_modules/
backend/node_modules/
frontend/node_modules/
backend/.env
frontend/dist/
```

3. Ejecutar los comandos básicos de subida:
```bash
git init
git add .
git commit -m "Initial commit: Pokedex Full-Stack"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```
