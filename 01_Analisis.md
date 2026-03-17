# PARTE 1 – ANÁLISIS

## 1. Explicación del sistema
El sistema es una aplicación web interactiva (Pokedex) diseñada para permitir a los usuarios visualizar, buscar y filtrar información sobre distintos Pokémon. La plataforma integra una base de datos relacional propia para almacenar datos estructurados de los Pokémon (como nombre, tipo y generación) y se apoya en una API externa (PokeAPI) para obtener las imágenes oficiales en tiempo real. La arquitectura se basa en un modelo Cliente-Servidor utilizando React para el Frontend (interfaz de usuario) y Node.js con Express para el Backend (API REST).

## 2. Actores
* **Usuario (Entrenador):** Cualquier persona que accede a la aplicación a través de su navegador web. No requiere autenticación, ya que es una biblioteca pública. Sus interacciones principales son navegar por el listado, realizar búsquedas y aplicar filtros.
* **Sistema Backend (Node.js API):** Actor secundario interno que procesa las peticiones del usuario, consulta la base de datos y formatea la información.
* **Sistema Externo (PokeAPI):** Actor secundario externo del que el frontend o backend consume recursos multimedia (imágenes de los Pokémon).

## 3. Funcionalidades
* **Listado General:** Visualización de todos los Pokémon registrados en la base de datos local.
* **Búsqueda por Nombre:** Barra de búsqueda que permite localizar un Pokémon específico escribiendo su nombre.
* **Filtrado por Tipo:** Menú desplegable o botones para mostrar únicamente los Pokémon de un tipo determinado (ej. Fuego, Agua, Planta).
* **Obtención de Imágenes:** Carga dinámica de las imágenes (sprites/artworks) correspondientes a cada Pokémon consultando su ID en la PokeAPI.

## 4. Requisitos
### Requisitos Funcionales (RF)
* **RF1:** El sistema debe mostrar una lista paginada o completa de los Pokémon almacenados en la base de datos.
* **RF2:** El sistema debe permitir al usuario filtrar los resultados de la lista mediante el tipo de Pokémon.
* **RF3:** El sistema debe permitir al usuario buscar un Pokémon por coincidencia de texto en su nombre.
* **RF4:** El sistema debe obtener y mostrar la imagen de cada Pokémon listado desde una API externa proporcionando su número o nombre.
* **RF5:** El API local (Backend) debe conectarse de manera segura a la base de datos (MySQL o PostgreSQL) para extraer las entidades.

### Requisitos No Funcionales (RNF)
* **RNF1 - Tecnología Frontend:** La interfaz debe estar desarrollada utilizando la librería React.js.
* **RNF2 - Tecnología Backend:** El servidor debe estar construido sobre Node.js utilizando el framework Express.
* **RNF3 - Entorno de Ejecución:** El proyecto completo debe poder desplegarse y ejecutarse en un entorno GNU/Linux mediante comandos de terminal.
* **RNF4 - Persistencia:** La base de datos debe ser relacional (MySQL o PostgreSQL).
* **RNF5 - Control de Versiones:** El código fuente debe estar estructurado y configurado para subirse a un repositorio de GitHub (incluyendo archivos `.gitignore`).
