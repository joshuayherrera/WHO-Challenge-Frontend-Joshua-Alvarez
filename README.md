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
git clone [[url-del-repo]](https://github.com/joshuayherrera/WHO-Challenge-Frontend-Joshua-Alvarez)
cd who-challenge-frontend-joshua-alvarez

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
