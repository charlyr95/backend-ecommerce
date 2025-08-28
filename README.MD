# Backend Ecommerce

Un backend sencillo en Node.js para una plataforma de comercio electrónico. Este proyecto proporciona APIs RESTful para gestionar productos y carritos de compras, y sirve vistas dinámicas usando Handlebars.

## Características
- Gestión de productos (CRUD)
- Gestión de carritos (CRUD)
- Vistas con Handlebars
- Almacenamiento de datos en archivos JSON
- Middleware para manejo de errores

## Tecnologías Utilizadas
- Node.js
- Express.js
- Handlebars

## Estructura de Carpetas
```
src/
  controllers/             # Controladores de rutas
  data/                    # Archivos de persistencia
  middlewares/             # Middleware personalizado
  models/                  # Modelos de datos
  public/                  # Recursos estáticos
  routes/                  # Definición de rutas
  views/                   # Vistas Handlebars
  server.js                # Archivo principal del servidor
```

## Instalación

1. **Clona el repositorio:**
   ```cmd
   git clone https://github.com/charlyr95/backend-ecommerce.git
   cd backend-ecommerce
   ```

2. **Instala las dependencias:**
   ```cmd
   npm install
   ```

## Uso

1. **Inicia el servidor:**
   ```cmd
   npm start
   ```
   El servidor se ejecutará en `http://localhost:8080` por defecto.

2. **Accede a la aplicación:**
   - Visita `http://localhost:8080` en tu navegador para ver la página principal.
   - Utiliza los endpoints de la API para productos y carritos:
     - `GET /api/products`
     - `GET /api/carts`
     - ...y otros endpoints CRUD.

## Endpoints de la API
- `GET /api/products/{id}` - Obtener un producto
- `GET /api/products` - Listar todos los productos
- `POST /api/products` - Agregar un nuevo producto
- `PUT /api/products` - Modificar un producto
- `DELETE /api/products` - Eliminar un producto
- `GET /api/carts` - Listar todos los carritos
- `POST /api/carts` - Crear un nuevo carrito
- `POST /api/carts/{cart id}/product/{product id}` - Agrega un producto al carrito

## Contribuciones
¡Las contribuciones son bienvenidas! Para cambios importantes, abre primero un issue para discutir lo que te gustaría modificar.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.
