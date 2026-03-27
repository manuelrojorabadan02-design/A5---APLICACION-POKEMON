# 📌 Pokedex App 2026

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## 🧾 Descripción General

**Pokedex App 2026** es una aplicación Web Full-Stack diseñada para emular el funcionamiento de una Pokédex avanzada. Permite a los usuarios no solo listar e inspeccionar más de 1000 especies distintas de Pokémon (obtenidos en tiempo real vía PokéAPI), sino también actuar como verdaderos Entrenadores:
- **Pokedex Main**: Buscador en tiempo real de especies con medición de rendimiento y tiempos de impacto en BD.
- **My Pokemon (CRUD)**: Captura Pokémon, entrénalos para aumentar sus puntos de combate (stats) e incluso hazlos evolucionar al alcanzar el nivel adecuado. Libéralos si ya no los necesitas.
- **Salón de la Fama (Filtros Avanzados)**: Visualiza a los Pokémon con mejores estadísticas del juego a través de consultas optimizadas basadas en la suma de Stats Base.
- **Trade Center (Transacciones Atómicas)**: Intercambia Pokémon de manera completamente segura entre diferentes Entrenadores utilizando el sistema de control de transacciones de MySQL (`START TRANSACTION / COMMIT / ROLLBACK`).

---

## ⚙️ Tecnologías Utilizadas

*   **Frontend**: React.js (generado con Vite), Vanilla CSS para el maquetado.
*   **Backend**: Node.js con Express.js. Manejo de APIs RESTful.
*   **Base de Datos**: MySQL (Corriendo sobre contenedor Docker).
*   **Conexión a BD**: Librería `mysql2` con soporte para Promesas y *Connection Pooling*.
*   **Orquestación**: Docker y `docker-compose` (incluyendo phpMyAdmin para administración fácil).

---

## 📁 Estructura del Proyecto

```text
A5 - APLICACION POKEMON/
├── docker-compose.yml              # Definición de la base de datos MySQL y phpMyAdmin aislada
├── pokemon-app/
│   ├── database/
│   │   └── schema.sql              # Definición del esquema inicial (Tablas, Data Seed, Vistas)
│   ├── backend/
│   │   ├── .env                    # Variables de entorno de conexión
│   │   ├── server.js               # Entry point del servidor Express
│   │   ├── db.js                   # Configuración del Pool de MySQL
│   │   ├── scripts/
│   │   │   └── seedPokemons.js     # Script automatizado para descargar >1000 Pokemon de PokeAPI
│   │   └── routes/                 # Controladores y Endpoints de la API
│   │       ├── pokemon.js          # (GET) Búsquedas e índices perfiles de rendimiento
│   │       ├── caughtPokemon.js    # (POST, GET, PUT, DELETE) Lógica de Captura / Entreno / Evolución
│   │       ├── hallOfFame.js       # (GET) Consulta a DB Views
│   │       └── trade.js            # (POST, GET) Lógica para Intercambios Atómicos (Transacciones)
│   └── frontend/
│       ├── index.html              # Entry root del frontend
│       ├── vite.config.js          # Configuración del empaquetador
│       └── src/
│           ├── App.jsx             # Componente y Enrutador Principal
│           ├── index.css           # Hoja de estilos principal
│           └── components/         # Módulos de UI (Search, PokemonList, TradeCenter, etc)
```

---

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para arrancar el entorno en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd A5 - APLICACION POKEMON
```

### 2. Base de Datos (Docker)
Asegúrate de tener Docker instalado y lanza los contenedores:
```bash
docker-compose up -d
```
> El servidor MySQL estará escuchando en `localhost:3306` y podrás acceder a phpMyAdmin en `http://localhost:8080`.

### 3. Carga del Modelo de Datos (Schema)
Para crear las tablas, relaciones y datos semilla necesarios, inyecta `schema.sql`:
```bash
docker exec -i mysql_db mysql -u app_user -papp_password app_db < pokemon-app/database/schema.sql
```

### 4. Inicializar el Backend
Instala las dependencias, realiza el *seeding* o siembra inicial de la Pokédex desde internet y levanta el servidor Express:
```bash
cd pokemon-app/backend
npm install
node scripts/seedPokemons.js    # Tarda ~1-2 min en descargar 1000+ Pokemons a tu BD
npm start                       # Levanta la API escuchando en el puerto 5000
```

### 5. Inicializar el Frontend
En otra pestaña en tu terminal, corre el servidor de React (Vite):
```bash
cd pokemon-app/frontend
npm install
npm run dev
```
> Ve a tu navegador e ingresa a `http://localhost:5173`.

---

## ▶️ Uso

1. **Búsqueda Avanzada**: Al visualizar la Pokedex inicial, tipea en la barra de texto; la vista renderizará en tiempo real el tiempo que tarda la Base de Datos en procesar tu búsqueda de entre los 1000+ registros. Este módulo es ideal para monitorizar la ganancia de velocidad si añades tu propio Índice B-Tree a MySQL.
2. **Capturar Entrenando**: Haz click en `Capturar` debajo de uno de los sprites y se te pedirá el ID del entrenador que lo captura.
3. **Mis Pokémon**: Ve a la pestaña de "Mis Pokemon". Allí haz click en `Entrenar`. Si el Pokémon supera ciertos umbrales de nivel (Ej, 16 ó 36), experimentará evoluciones con aumento radical de estadísticas.
4. **Intercambiar**: Demuestra el sistema transaccional eligiendo un entrenador para ceder una criatura a otro entrenador diferente. Si hay cualquier falla en el proceso, la BD ejecutará automáticamente un `ROLLBACK`.

---

## 🔧 Configuración

El proyecto expía un archivo `.env` en `pokemon-app/backend/.env` que debe coincidir con tus variables levantadas en Docker.
**Ejemplo Base (`backend/.env`)**:
```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=app_user
DB_PASSWORD=app_password
DB_NAME=app_db
```

---

## 🧪 Testing

En la iteración actual del proyecto, no se incluye entorno de testing unitario asíncrono (como Jest o Mocha). El proyecto es un ejercicio focalizado en Base de Datos y APIs, por lo que el testing general previsto se delega a las interacciones de Verificación Manual expuestas en el Plan de Verificación de despliegue mediante peticiones de los Endpoints vía Browser, Postman O interfaz React.

---

## 🤝 Contribución

¡Las contribuciones son siempre bienvenidas!
1. Haz un *Fork* del proyecto.
2. Crea una Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Sube tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Haz push a la rama (`git push origin feature/AmazingFeature`).
5. Abre un *Pull Request* para que el código sea revisado.

---

## 📄 Licencia

Protegido bajo la licencia Mit Standard [MIT License](https://opensource.org/licenses/MIT).
*(Para propósitos de uso educativo)*
