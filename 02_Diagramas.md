# PARTE 2 – DIAGRAMAS UML

A continuación se presentan los diagramas UML modelados en código compatible con PlantUML. Puedes copiar cada bloque y pegarlo en una herramienta como PlantText (planttext.com) o en un plugin de VSCode para visualizarlos.

## 1. Diagramas de Casos de Uso

### Caso de Uso 1: Interacción General del Usuario
Muestra las acciones principales que el Actor (Usuario) puede realizar en la aplicación.

```plantuml
@startuml
left to right direction
actor "Usuario" as user

rectangle "Biblioteca Pokémon (React + Node)" {
  usecase "Listar todos los Pokémon" as UC1
  usecase "Buscar Pokémon por Nombre" as UC2
  usecase "Filtrar Pokémon por Tipo" as UC3
  usecase "Visualizar Imagen del Pokémon" as UC4
}

actor "PokeAPI (Sistema Externo)" as pokeapi

user --> UC1
user --> UC2
user --> UC3
user --> UC4

UC4 <-- pokeapi : "Proporciona sprites"
@enduml
```

### Caso de Uso 2: Gestión de Datos en el Backend (Sistema)
Muestra cómo el backend maneja las peticiones recibidas del frontend.

```plantuml
@startuml
left to right direction
actor "Frontend (React)" as front

rectangle "Backend (Node.js/Express)" {
  usecase "Procesar Petición GET /pokemon" as UC1
  usecase "Aplicar Filtros SQL" as UC2
  usecase "Consultar Base de Datos" as UC3
}

database "MySQL / PostgreSQL" as db

front --> UC1
UC1 ..> UC2 : <<include>>
UC1 ..> UC3 : <<include>>
UC3 --> db
@enduml
```

## 2. Diagramas de Secuencia

### Secuencia 1: Carga Inicial de la Lista de Pokémon
Diagrama que describe el flujo completo desde que el usuario abre la web hasta que se muestran los Pokémon con sus imágenes.

```plantuml
@startuml
actor Usuario as User
participant "Frontend\n(React)" as React
participant "Backend\n(Node.js)" as Node
database "Base de Datos\n(MySQL)" as DB
participant "PokeAPI\n(API Externa)" as API

User -> React : Accede a la aplicación URL
React -> Node : GET /api/pokemon
Node -> DB : SELECT * FROM pokemon
DB --> Node : Devuelve lista de Pokémon
Node --> React : JSON con datos (id, nombre, tipo)

loop Por cada Pokémon recibido
    React -> API : GET https://pokeapi.co/api/v2/pokemon/{id}/
    API --> React : JSON con URL de imagen (sprites)
end

React --> User : Renderiza listado completo con imágenes
@enduml
```

### Secuencia 2: Filtrado por Tipo
Flujo cuando un usuario decide elegir un tipo específico (ej. "Fuego") para filtrar la lista.

```plantuml
@startuml
actor Usuario as User
participant "Frontend\n(React)" as React
participant "Backend\n(Node.js)" as Node
database "Base de Datos\n(MySQL)" as DB

User -> React : Selecciona tipo "Fuego" en el filtro
React -> Node : GET /api/pokemon?type=Fuego
Node -> DB : SELECT * FROM pokemon WHERE tipo = 'Fuego'
DB --> Node : Devuelve lista filtrada
Node --> React : JSON con datos filtrados

React -> React : Actualiza el estado (Estado de React)
React --> User : Renderiza únicamente Pokémon tipo Fuego
@enduml
```
