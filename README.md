# WeldingHelmets Online - E-commerce de Cascos de Soldadura

Una aplicación web moderna desarrollada con Next.js 15 para la venta de cascos de soldadura profesionales.

## 🚀 Características Principales

### ✅ Funcionalidades Implementadas

- **🏠 Homepage atractiva** con hero section y productos destacados
- **📱 Diseño responsive** optimizado para móviles y desktop
- **🛍️ Catálogo de productos** con grid moderno y filtros visuales
- **🔍 Página de detalle** de producto con galería de imágenes
- **🛒 Carrito de compras** funcional con persistencia en localStorage
- **➕ Formulario de agregar productos** con validación robusta
- **🧭 Navegación completa** con navbar y footer responsivos
- **⚡ Estados de carga** y manejo de errores profesional

### 🛠️ Tecnologías Utilizadas

- **Next.js 15** con App Router y Turbopack
- **React 19** con hooks modernos
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **React Hook Form + Zod** para validación de formularios
- **Context API** para manejo de estado global del carrito

### 🎯 Arquitectura

```
📦 who-challenge-frontend-joshua/
├── 🎨 app/                    # App Router de Next.js
│   ├── 🏠 page.tsx           # Homepage
│   ├── 🎨 globals.css        # Estilos globales
│   ├── 📋 layout.tsx         # Layout principal
│   └── 📁 (main)/            # Route group principal
│       ├── 📋 layout.tsx     # Layout con navbar/footer
│       ├── 🛍️ products/      # Catálogo y detalle
│       └── ➕ new_product/   # Formulario agregar producto
├── 🧱 components/            # Componentes reutilizables
│   ├── 🔧 common/           # Navbar, Footer, Error, Spinner
│   └── 🎨 ui/               # Componentes de UI
├── 🔄 context/              # Context API para carrito
├── 🎣 hooks/                # Custom hooks
├── 📡 lib/                  # API calls y utilidades
└── 📝 types/                # Definiciones de TypeScript
```

## 🏃‍♂️ Cómo ejecutar el proyecto

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repo]
cd who-challenge-frontend-joshua

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
http://localhost:3000
```

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter de código
```

## 🎨 Funcionalidades por Página

### 🏠 Homepage (/)

- Hero section con gradiente atractivo
- Sección de características con iconos SVG
- Grid de productos destacados
- Call-to-action para agregar productos

### 🛍️ Catálogo (/products)

- Grid responsive de productos
- Cards con hover effects
- Información de stock y rating
- Navegación a detalle de producto

### 🔍 Detalle (/products/[id])

- Galería de imágenes con thumbnails
- Información completa del producto
- Botón agregar al carrito
- Breadcrumb de navegación
- Loading state con skeleton

### ➕ Nuevo Producto (/new_product)

- Formulario completo con validación
- Campos: título, precio, categoría, marca, stock, descripción
- Validación en tiempo real con Zod
- Mensajes de error amigables

### 🛒 Carrito (navbar desplegable)

- Contador de items en navbar
- Lista de productos agregados
- Cálculo de total automático
- Botones para eliminar items
- Persistencia en localStorage

## 🔧 APIs Utilizadas

### DummyJSON API

- **GET** `https://dummyjson.com/products` - Lista de productos
- **GET** `https://dummyjson.com/products/{id}` - Detalle por ID

## 🎯 Características Técnicas

### ⚡ Performance

- Static Generation para páginas principales
- Dynamic Rendering para rutas con parámetros
- Optimización de imágenes con Next.js Image
- Code splitting automático

### 🔒 Validación

- Validación de formularios con Zod
- TypeScript para tipado estático
- Manejo de errores robusto

### 📱 UX/UI

- Diseño mobile-first
- Animaciones CSS suaves
- Estados de loading
- Feedback visual inmediato

## 👨‍💻 Desarrollado por

**Joshua** - Prueba técnica para WeldingHelmetsOnline

## 📄 Licencia

Proyecto desarrollado como prueba técnica - 2025

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
