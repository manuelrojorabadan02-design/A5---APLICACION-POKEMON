# 5. Comandos para Linux

Sigue estos pasos en tu terminal interactiva de Linux para arrancar el proyecto de principio a fin.

### Paso 1: Crear la Base de Datos
Debes tener el servidor de MySQL local corriendo (`sudo systemctl start mysql`):
```bash
# Accede a MySQL
sudo mysql -u root -p

# Ejecuta el script SQL proporcionado (pokemon-app/database/schema.sql)
# Puedes copiar el contenido o ejecutar fuente directa si estás en esa carpeta:
mysql> source /ruta/al/proyecto/pokemon-app/database/schema.sql;
mysql> exit;
```

### Paso 2: Ejecutar Backend
Abre una terminal en la raíz del proyecto y dirígete al backend:
```bash
cd pokemon-app/backend

# Instalar dependencias
npm install

# Iniciar servidor backend
npm start
# (Para modo desarrollo usa: npm run dev)
```
*Si la conexión es exitosa, verás: `Servidor Backend ejecutándose en http://localhost:5000`*

### Paso 3: Ejecutar Frontend
Abre una **nueva pestaña** de la terminal:
```bash
cd pokemon-app/frontend

# Instalar dependencias integradas en el package.json
npm install

# Ejecutar el frontend en React con Vite
npm run dev
# Vite servirá la app (usualmente en http://localhost:3000 o 5173).
```
