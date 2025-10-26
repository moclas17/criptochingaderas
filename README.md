# CriptoChingaderas

Proyectos reales, experimentos sabrosos y una guía para brincar de **web2 → web3** sin romperte la madre. Puro código fino.

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, TypeScript, Tailwind CSS 4
- **Animaciones**: Framer Motion
- **CMS**: Sanity Studio
- **Web3**: Reown AppKit (WalletConnect), Wagmi, Viem
- **Queries**: TanStack Query (React Query)

## Características

- Portafolio de proyectos Web3 con filtrado y búsqueda
- Guía educativa paso a paso para migrar de Web2 a Web3
- Conexión de wallets con Reown AppKit
- Soporte para múltiples chains (Ethereum, Polygon, Arbitrum, Base, Optimism)
- CMS headless con Sanity para gestión de contenido
- Diseño responsive y animado

## Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Reown (WalletConnect) Project ID
# Obtén tu Project ID en https://dashboard.reown.com
NEXT_PUBLIC_REOWN_PROJECT_ID=tu_project_id_aqui

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Obtener Reown Project ID

1. Ve a [Reown Dashboard](https://dashboard.reown.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia el Project ID
5. Pégalo en tu archivo `.env.local`

### 4. Configurar Sanity Studio (opcional)

Si quieres editar el contenido:

```bash
# Accede al Studio en localhost:3000/studio
npm run dev
```

## Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Sanity Studio

El CMS está embebido en la ruta `/studio`. Puedes acceder a él en desarrollo:

```
http://localhost:3000/studio
```

### Schemas disponibles:

- **Project**: Proyectos Web3
- **PathStep**: Pasos del camino Web2 → Web3

## Conexión de Wallet

El proyecto usa **Reown AppKit** (anteriormente WalletConnect) para conectar wallets.

Características:
- Soporte para 500+ wallets
- Multi-chain (Ethereum, Polygon, Arbitrum, Base, Optimism)
- Email y social login (próximamente)
- Smart Accounts
- UI responsive y personalizable

## Scripts Disponibles

```bash
npm run dev      # Desarrollo con Turbopack
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## Estructura del Proyecto

```
criptochingaderas/
├── app/                    # App Router de Next.js
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout raíz con Web3Provider
│   └── studio/            # Sanity Studio
├── components/            # Componentes React
│   └── WalletButton.tsx  # Botón de conexión de wallet
├── config/               # Configuración
│   └── wagmi.ts         # Config de Wagmi y Reown
├── context/             # React Context
│   └── Web3Provider.tsx # Provider de Web3
├── lib/                # Utilidades
│   └── sanity.ts      # Funciones de Sanity
├── sanity/            # Sanity CMS
│   └── schemaTypes/  # Schemas de contenido
└── public/           # Assets estáticos
```

## Deploy

Este proyecto está listo para deployar en Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

**Importante**: No olvides configurar las variables de entorno en tu plataforma de deploy.

## Licencia

MIT - Forkéalo a gusto

---

Hecho en 🇲🇽 con amor y otras sustancias
