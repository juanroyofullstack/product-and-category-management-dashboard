# Product & Category Management Dashboard

Una aplicación web moderna para la gestión de productos y categorías con funcionalidades de drag & drop, desarrollada como parte de una prueba técnica para Inditex.

## Características Principales

- **Gestión de Categorías**: Crear, editar, eliminar y reordenar categorías
- **Gestión de Productos**: Añadir productos con imagen, título, descripción y precio
- **Drag & Drop**: Mover productos entre categorías y reordenar categorías intuitivamente
- **Responsive Design**: Interfaz adaptable a diferentes tamaños de pantalla
- **Control de Zoom**: Funcionalidad de zoom in/out para mejor visualización
- **Subida de Imágenes**: Upload de archivos de imagen para productos
- **Estado Global**: Gestión del estado con Redux Toolkit
- **Testing**: Suite completa de tests unitarios

## Stack Tecnológico

- **Frontend**: Next.js 15.3.4 con App Router
- **UI**: Material-UI (MUI) + Tailwind CSS
- **Estado**: Redux Toolkit + React Redux
- **Testing**: Jest + Testing Library
- **TypeScript**: Tipado estático completo
- **Linting**: ESLint + Prettier
- **Hooks**: Husky para pre-commit hooks

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd inditex-prueba

# Instalar dependencias
yarn install

# Ejecutar en modo desarrollo
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Scripts Disponibles

```bash
# Desarrollo
yarn dev          # Inicia el servidor de desarrollo con Turbopack

# Producción
yarn build        # Construye la aplicación para producción
yarn start        # Inicia el servidor de producción

# Testing
yarn test         # Ejecuta los tests
yarn test:watch   # Ejecuta los tests en modo watch
yarn test -- --coverage  # Ejecuta el test coverage del proyecto

# Linting
yarn lint         # Ejecuta ESLint
```

## Arquitectura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes de UI básicos
│   │   ├── AddProductModal.tsx
│   │   ├── Category.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   ├── containers/         # Contenedores de alto nivel
│   ├── lib/
│   │   ├── features/       # Redux slices
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── selectors/      # Selectores de Redux
│   │   └── utils/          # Utilidades y mock data
│   ├── api/               # Rutas de API
│   └── globals.css        # Estilos globales
```

## Funcionalidades Detalladas

### Gestión de Categorías
- Crear nuevas categorías
- Eliminar categorías (con confirmación)
- Reordenar categorías por drag & drop
- Cambiar alineación (Left/Center/Right)
- Control automático del contador de productos

### Gestión de Productos
- Añadir productos con formulario modal
- Upload de imágenes
- Validación de formularios
- Drag & drop entre categorías y productos
- Eliminación con confirmación
- Límite de 3 productos por categoría

### Características de UX
- Loading states durante fetch de datos
- Manejo de errores
- Confirmaciones de eliminación
- Design responsivo

## Testing

El proyecto incluye una suite completa de tests unitarios:

```bash
# Ejecutar todos los tests
yarn test

# Ejecutar tests con cobertura
yarn test --coverage

# Ejecutar tests en modo watch
yarn test:watch
```

### Cobertura de Tests
- Componentes principales

## Responsive Design

La aplicación está optimizada para:
- 📱 **Mobile**: < 600px
- 💻 **Desktop**: > 1100px

### Build Manual
```bash
yarn build
yarn start
```

## Futuros Enhancements
- Continuar con la mejora de UI
- Añadir vista de detalle de productos
- Añadir perfil de usuario y diferentes proyectos
- Aumentar covertura de testing