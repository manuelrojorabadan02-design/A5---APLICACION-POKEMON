# PARTE 5 – EJECUCIÓN EN LINUX

A continuación, se detallan todos los comandos necesarios para desplegar y ejecutar el proyecto desde cero en un entorno Linux (Ubuntu/Debian).

## 1. Instalar Node.js y npm
Si no tienes Node.js instalado, la forma más recomendada en Linux es usar NVM (Node Version Manager):

```bash
# 1. Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. Cargar NVM en la terminal actual
source ~/.bashrc

# 3. Instalar la última versión LTS de Node.js
nvm install --lts

# 4. Verificar instalación
node -v
npm -v
```

## 2. Crear la Base de Datos (MySQL/MariaDB)
Asegúrate de tener el servidor MySQL ejecutándose. Entra a la consola de MySQL y ejecuta el script de creación.

```bash
# 1. Acceder a MySQL como usuario root
sudo mysql -u root -p

# 2. Dentro de la consola de MySQL, pegar el script:
CREATE DATABASE pokemon_db;
USE pokemon_db;
CREATE TABLE pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokedex_number INT NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    type1 VARCHAR(50) NOT NULL,
    type2 VARCHAR(50),
    generation INT NOT NULL
);
INSERT INTO pokemon (pokedex_number, name, type1, type2, generation) VALUES 
(1, 'Bulbasaur', 'Planta', 'Veneno', 1),
(4, 'Charmander', 'Fuego', NULL, 1),
(7, 'Squirtle', 'Agua', NULL, 1),
(25, 'Pikachu', 'Eléctrico', NULL, 1);
exit;
```

## 3. Inicializar y Arrancar el Backend (Node.js)

```bash
# 1. Crear la carpeta del backend y entrar
mkdir backend && cd backend

# 2. Inicializar el proyecto Node
npm init -y

# 3. Instalar dependencias necesarias
npm install express cors mysql2 dotenv

# 4. Crear los archivos necesarios (server.js, db.js, etc.) y pegar el código generado en la Parte 4
mkdir config controllers routes
touch server.js .env config/db.js controllers/pokemonController.js routes/pokemonRoutes.js

# 5. Ejecutar el servidor
node server.js
```
*Si todo está correcto, la terminal mostrará: `Servidor Backend ejecutándose en http://localhost:5000`*

## 4. Inicializar y Arrancar el Frontend (React)

Abre una **nueva pestaña** en tu terminal (deja el backend corriendo en la otra).

```bash
# 1. Volver a la carpeta raíz del proyecto
cd ..

# 2. Crear la aplicación React usando Vite (más rápido y moderno que CRA)
npm create vite@latest frontend -- --template react
# O si prefieres Create React App: npx create-react-app frontend

# 3. Entrar a la carpeta y descargar dependencias
cd frontend
npm install

# 4. Crear los componentes y pegar el código generado en la Parte 4
mkdir -p src/components
touch src/components/PokemonList.jsx src/components/PokemonCard.jsx

# 5. Iniciar el servidor de desarrollo de React
npm run dev
# Si usaste create-react-app: npm start
```
*La terminal te indicará una URL local (normalmente `http://localhost:5173` o `3000`). Ábrela en tu navegador y verás la aplicación interactuando con tu base de datos y la PokeAPI.*
