# PARTE 6 – ENTREGA

Recopilación de textos y guiones listos para añadir a la documentación oficial del proyecto.

---

## 1. Texto para la Memoria del Proyecto

**Título del Proyecto:** Desarrollo de Pokedex Web Full-Stack
**Descripción:**
El presente proyecto consiste en el desarrollo de una aplicación web completa orientada a la gestión y visualización de un catálogo de Pokémon. La arquitectura implementada sigue el patrón Cliente-Servidor. En el frontend se ha utilizado React.js para garantizar una interfaz de usuario dinámica, reactiva y de carga rápida. Para el backend, la elección ha sido Node.js utilizando el framework Express, lo que permite exponer una API RESTful eficiente.

**Innovación técnica:**
La principal característica del sistema es su enfoque de datos híbrido. Por un lado, mantiene una base de datos relacional local (MySQL) que almacena la información estructurada de las entidades (nombre, tipo y número de pokedex), garantizando búsquedas y filtrados de alta velocidad. Por otro lado, delega el almacenamiento de recursos pesados (imágenes) interactuando en tiempo real con una API externa (PokeAPI). Esta decisión de diseño optimiza el almacenamiento local y garantiza que los recursos multimedia provengan de una fuente oficial.

---

## 2. Texto Explicando los Diagramas UML

**Sobre el diagrama de Casos de Uso:**
El diagrama modela la interacción entre el usuario final y nuestra aplicación. Muestra de forma clara que el usuario puede realizar peticiones para buscar o filtrar Pokémon. Cuando ocurre la petición de visualización, se incluye implícitamente la acción de conectarse a la PokeAPI, demostrando cómo nuestro sistema actúa como intermediario e integrador de un sistema externo. También se ha modelado la interacción profunda donde el backend interactúa con la base de datos SQL para procesar las peticiones GET.

**Sobre el diagrama de Secuencia:**
El diagrama de secuencia expone el ciclo de vida de una petición HTTP típica en nuestra plataforma. Comienza cuando el Componente de React emite el `fetch` al servidor Node.js. Se observa la barrera de asincronía donde el servidor bloquea temporalmente la respuesta mientras espera el `SELECT` de MySQL. Una vez que React recibe el JSON con los datos textuales, lanza de manera independiente peticiones directas a la PokeAPI para hidratar la vista con las imágenes, finalizando con el renderizado del DOM de cara al usuario.

---

## 3. Guion para el Vídeo Demo (Max 2-3 minutos)

* **[0:00 - 0:30] Presentación y Arquitectura**
  * *(Pantalla: Mostrando el diagrama de estructura y las dos terminales corriendo)*
  * **Voz:** "Hola, presento mi proyecto de Pokedex Web. Como pueden ver, está dividido en dos partes: aquí tengo el backend en Node ejecutándose en el puerto 5000 y conectado a MySQL, y aquí el frontend en React en el puerto 3000."
* **[0:30 - 1:15] Demostración de Listado y API Externa**
  * *(Pantalla: Navegador abierto, listado de Pokémon cargando)*
  * **Voz:** "Al cargar la página, React consume nuestra API local para traer los datos basiquísimos de la base de datos. Si inspeccionamos el modelo, cada imagen está siendo extraída en tiempo real desde la PokeAPI cruzando el 'pokedex_number' sin saturar nuestro servidor."
* **[1:15 - 2:00] Filtros y Búsqueda**
  * *(Pantalla: Uso de la barra de búsqueda y selector de tipos)*
  * **Voz:** "Si busco 'Pika' o filtro por el tipo 'Fuego', el frontend hace una nueva llamada con query parameters. El backend detecta esto, aplica un 'LIKE' o condición en la consulta SQL de MySQL automáticamente, y devuelve únicamente los resultados esperados."
* **[2:00 - 2:30] Cierre**
  * *(Pantalla: Vista al repositorio de GitHub)*
  * **Voz:** "El código es modular y está versionado en este repositorio de GitHub con sus respectivos `.gitignore`. Gracias por su atención."

---

## 4. Estructura para subir a GitHub (.gitignore y Readme)

Para preparar la entrega técnica final en GitHub, esta es la estructura ideal de archivos ignorados:

### Archivo `.gitignore` (Colocar en la raíz del proyecto)
```text
# Dependencias de Node
node_modules/

# Entorno de React
build/
dist/

# Variables de entorno (¡Muy importante ocultarlo!)
.env

# Archivos de log
npm-debug.log*
yarn-debug.log*

# Archivos propios del OS (Mac/Linux/Windows)
.DS_Store
Thumbs.db
```

### Contenido Básico de `README.md`
```markdown
# Proyecto Pokedex Web

## Tecnologías Usadas
- Frontend: React + Vite
- Backend: Node.js + Express
- Base de Datos: MySQL
- API Externa: [PokeAPI](https://pokeapi.co/)

## Instalación
1. Clona el repositorio: `git clone <tu-url>`
2. Configura la base de datos usando el script incluido.
3. En la carpeta `/backend`: ejecuta `npm install` y luego `node server.js`
4. En la carpeta `/frontend`: ejecuta `npm install` y luego `npm run dev`
```
