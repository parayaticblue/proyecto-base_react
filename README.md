


# [Nombre-APP] Frontend

## Iniciando 🚀

## Pre-requerimientos 📋
Instalar los paquetes necesarios para el proyecto con npm
  
  ```
  npm  install 
  ```

### Ejecución del proyecto ⚙️
  
```
npm run dev
```

### Compilación para producción ⚙️
  
```
npm run build
```

### Compilación para ambiente de pruebas

```
npm run build:staging
```

### Ejecución de pruebas ⚙️
  
```
npm run test
```
### Despliegue 📦
  
```

### Variables de Entorno 📋

```ini
BASENAME=/
REACT_APP_API_URL=
PORT=3000
```
## Ejecución de pruebas ⚙️

## Despliegue 📦

## Versiones 📌



## Estructura de carpetas
```bash
📂 src/
├── 📁 assets/          # Recursos estáticos (imágenes, íconos, etc.)
├── | 📁 css/            # Archivos CSS
├── | 📁 fonts/          # Fuentes personalizadas
    | 📁 icons/          # Iconos personalizados
    | 📁 images/         # Imágenes personalizadas
    | 📁 styles/         # Estilos de fuente personalizados
    | 📁 svg/            # SVG personalizados
├── 📁 api/             # Lógica de comunicación con APIs
├── 📁 auth/            # Autenticación y autorización
├── 📁 components/      # Componentes reutilizables
│   ├── 📁 common/      # Componentes comunes
│   ├── 📁 forms/       # Formularios
│   ├── 📁 layouts/     # Diseños generales
│   ├── 📁 modals/      # Modales
│   ├── 📁 alerts/      # Alertas
│   ├── 📁 buttons/     # Botones
│   ├── 📁 inputs/      # Entradas de formularios
│   ├── 📁 tables/      # Tablas
│   ├── 📁 tooltips/    # Tooltips
│   ├── 📁 autocomplete/ # Autocompletado
│   ├── 📁 dropdowns/   # Desplegables
│   ├── 📁 checkboxes/  # Casillas de verificación
│   ├── 📁 radios/      # Botones de radio
│   ├── 📁 switches/    # Botones de cambio
│   ├── 📁 links/       # Enlaces
│   ├── 📁 loaders/     # Cargadores
│   ├── 📁 spinners/    # Spinners
│   ├── 📁 labels/      # Etiquetas
├── 📁 config/          # Configuraciones globales
├── 📁 constants/       # Constantes globales
├── 📁 context/         # Contextos de React
├── 📁 hooks/           # Hooks personalizados
├── 📁 locales/         # Archivos de traducción
├── 📁 middleware/      # Lógica intermedia (autenticación, validaciones)
├── 📁 pages/           # Páginas principales
│   ├── 📁 private/     # Páginas privadas
│   ├── 📁 public/      # Páginas públicas
├── 📁 services/        # Lógica de comunicación con APIs
├── 📁 store/           # Estado global (Redux, Zustand, etc.)
├── 📁 styles/          # Estilos globales
├── 📁 tests/           # Pruebas unitarias
│   ├── 📁 components/  # Pruebas de componentes
│   ├── 📁 pages/       # Pruebas de páginas
│   ├── 📁 services/    # Pruebas de servicios
│   ├── 📁 e2e/         # Pruebas de extremo a extremo (E2E)
├── 📁 types/           # Tipos e interfaces (para TypeScript)
├── 📁 utils/           # Funciones utilitarias
├── 📁 routes/          # Configuración de rutas
│   ├── 📄 index.js     # Archivo principal para exportar todas las rutas
│   ├── 📄 privateRoutes.js  # Rutas privadas (requieren autenticación)
│   ├── 📄 publicRoutes.js   # Rutas públicas (accesibles sin autenticación)
│   ├── 📄 routePaths.js     # Constantes con los nombres de las rutas
├── 📄 App.jsx          # Componente principal
├── 📄 index.jsx        # Punto de entrada del proyecto
| 📄 .gitignore          # Archivo de configuración de Git
| 📄 .eslintrc.js        # Archivo de configuración de ESLint
| 📄 .prettierrc         # Archivo de configuración de Prettier
| 📄 tailwind.config.js # Configuración de Tailwind
| 📄 vite.config.js      # Configuración de Vite
| 📄 package.json        # Archivo de configuración de Node.js
| 📄 README.md           # Este archivo
| 📄 .env                # Variables de entorno
```


## Estructura de componentes



# Desiciones de arquitectura

- Versión de Node 20.19.0 [https://nodejs.org/en/blog/release/v20.19.0/]
- Versión de React 19.0.0 [https://reactjs.org/blog/2023/10/03/react-v19.html]
- Versión de Vite 6.2.0 [https://vitejs.dev/guide/migrating-to-v3.html]
- Versión de React Router 7.5.0 [https://reactrouter.com/en/main/upgrade-guides/v6.4]
- Versión de Tailwind 4.1.3 [https://tailwindcss.com/docs/installation]
- Versión de Formik 2.4.6 [https://formik.org/docs/overview]
- Versión de Yup 1.6.1 [https://www.npmjs.com/package/yup]
- Versión de Axios 1.8.4 [https://axios-http.com/docs/intro]
- Versión de Env-cmd 10.1.0 [https://www.npmjs.com/package/env-cmd]





## Elección de React como librería de UI
- React es una librería de JavaScript para construir interfaces de usuario. Se eligió React por su flexibilidad, rendimiento y la gran comunidad que lo respalda. Además, permite crear componentes reutilizables, lo que facilita el mantenimiento y la escalabilidad del proyecto.

## Elección de Tailwind CSS como framework de estilos
- Tailwind CSS es un framework de CSS que permite crear diseños personalizados de manera rápida y eficiente. Se eligió Tailwind por su enfoque en la utilidad, lo que permite aplicar estilos directamente en los componentes sin necesidad de escribir CSS adicional. Esto acelera el proceso de desarrollo y mejora la consistencia del diseño.

## Elección de React Router para la gestión de rutas
- React Router es una librería para la gestión de rutas en aplicaciones React. Se eligió React Router por su facilidad de uso y su capacidad para manejar rutas dinámicas y anidadas. Esto permite crear una navegación fluida y eficiente en la aplicación.

## Elección de Formik y Yup para la gestión de formularios
- Formik es una librería para la gestión de formularios en React, mientras que Yup es una librería para la validación de esquemas. Se eligieron estas librerías por su capacidad para simplificar la gestión de formularios y la validación de datos. Esto permite crear formularios complejos de manera sencilla y eficiente.

## Elección de Axios para la gestión de peticiones HTTP
- Axios es una librería para realizar peticiones HTTP en JavaScript. Se eligió Axios por su simplicidad y su capacidad para manejar peticiones asíncronas de manera eficiente. Esto permite interactuar con APIs de manera sencilla y manejar errores de forma adecuada.

## Elección de Vite como herramienta de construcción
- Vite es una herramienta de construcción para aplicaciones web modernas. Se eligió Vite por su rapidez y su capacidad para manejar proyectos de gran escala de manera eficiente. Además, Vite ofrece una experiencia de desarrollo fluida con recarga en caliente, lo que acelera el proceso de desarrollo y mejora la productividad del equipo.



## Autores ✒️

- Pedro Araya - Trabajo Inicial - [Pedro Araya]()
- Benjamín Diaz  - Trabajo Inicial - [Benjamín Páez]()
- Luis Ponce - Trabajo Inicial - [Luis Ponce]()





## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - consulta el archivo [LICENSE](LICENSE) para más detalles.
