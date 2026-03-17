# 6. Diagramas UML

Formato PlantUML listo para renderizar, por ejemplo en planttext.com.

## 1. Diagrama de Casos de Uso (Interacción del Usuario)
```plantuml
@startuml
left to right direction
actor "Usuario" as user

rectangle "Aplicación React Pokedex" {
  usecase "Listar Pokémon de la BD" as UC1
  usecase "Filtrar por Nombre o Tipo" as UC2
  usecase "Obtener imágenes de PokeAPI" as UC3
}

user --> UC1
user --> UC2
UC1 ..> UC3 : <<include>>
@enduml
```

## 2. Diagrama de Casos de Uso (Arquitectura Backend)
```plantuml
@startuml
left to right direction
actor "Frontend (React)" as front

rectangle "API REST (Express)" {
  usecase "Receptar Petición HTTP GET /pokemon" as UC1
  usecase "Procesar Query Params" as UC2
  usecase "Consulta Segura a MySQL" as UC3
}

front --> UC1
UC1 --> UC2
UC2 --> UC3
@enduml
```

## 3. Diagrama de Secuencia (Carga Inicial y Visualización)
```plantuml
@startuml
actor Usuario
participant "Frontend (App.jsx)" as App
participant "Backend (server.js)" as Node
database "MySQL" as DB
participant "PokeAPI Externa" as API

Usuario -> App : Abre URL
App -> Node : GET /pokemon
Node -> DB : SELECT * FROM pokemon
DB --> Node : Devuelve registros
Node --> App : Responde JSON

loop Por cada item
    App -> API : Petición GET a la API
    API --> App : Carga la imagen oficial
end

App --> Usuario : Renderiza la grilla
@enduml
```

## 4. Diagrama de Secuencia (Filtrado Básico)
```plantuml
@startuml
actor Usuario
participant "Frontend (Search.jsx)" as Search
participant "Backend" as Node
database "MySQL" as DB

Usuario -> Search : Escribe "char" en el input
Search -> Node : GET /pokemon?name=char
Node -> DB : SELECT * FROM pokemon WHERE name LIKE '%char%'
DB --> Node : Devuelve lista filtrada
Node --> Search : Envía JSON reducido
Search --> Usuario : Actualiza React DOM
@enduml
```
