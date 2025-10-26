# Integración de Wallet con Reown AppKit

## ✅ Implementación Completada

Se ha integrado exitosamente **Reown AppKit** (anteriormente WalletConnect) al proyecto CriptoChingaderas.

## Archivos Creados

### 1. Configuración de Wagmi
**Ubicación:** `config/wagmi.ts`

Configura el adaptador de Wagmi con:
- Soporte para múltiples chains (Ethereum, Polygon, Arbitrum, Base, Optimism)
- Storage con cookies para persistencia
- SSR habilitado

### 2. Provider de Web3
**Ubicación:** `context/Web3Provider.tsx`

Componente provider que:
- Inicializa Reown AppKit
- Configura React Query
- Proporciona el contexto de Wagmi a toda la app
- Define metadata del proyecto

### 3. Componente WalletButton
**Ubicación:** `components/WalletButton.tsx`

Componente personalizado que:
- Muestra "Conectar Wallet" cuando no está conectado
- Muestra la dirección abreviada cuando está conectado
- Incluye botón de desconectar
- Responsive (diferentes vistas para mobile/desktop)
- Abre el modal de Reown AppKit

### 4. Variables de Entorno
**Ubicación:** `.env.local.example`

Template con todas las variables necesarias:
- `NEXT_PUBLIC_REOWN_PROJECT_ID`
- Variables de Sanity

## Cambios en Archivos Existentes

### app/layout.tsx
- ✅ Actualizado metadata (título y descripción)
- ✅ Cambiado idioma de "en" a "es"
- ✅ Integrado `Web3Provider` envolviendo children

### app/page.tsx
- ✅ Importado `WalletButton`
- ✅ Integrado botón en el navbar
- ✅ Arreglados warnings de ESLint (caracteres escapados)

### README.md
- ✅ Documentación completa actualizada
- ✅ Instrucciones de configuración
- ✅ Guía para obtener Reown Project ID
- ✅ Stack tecnológico actualizado

## Características de la Integración

### Wallets Soportadas
- 500+ wallets diferentes
- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- Rainbow
- Y muchas más...

### Chains Soportadas
1. **Ethereum Mainnet**
2. **Polygon**
3. **Arbitrum**
4. **Base**
5. **Optimism**

### Funcionalidades
- ✅ Conectar wallet
- ✅ Desconectar wallet
- ✅ Cambiar de red
- ✅ Ver dirección conectada
- ✅ Persistencia de conexión (cookies)
- ✅ SSR compatible
- ✅ Responsive

## Cómo Usar

### Para Usuarios

1. Haz clic en "Conectar Wallet" en el navbar
2. Selecciona tu wallet preferida del modal
3. Autoriza la conexión en tu wallet
4. ¡Listo! Tu wallet está conectada

### Para Desarrolladores

#### Acceder a la cuenta conectada
```tsx
import { useAccount } from 'wagmi'

function MyComponent() {
  const { address, isConnected } = useAccount()

  return (
    <div>
      {isConnected ? `Conectado: ${address}` : 'No conectado'}
    </div>
  )
}
```

#### Abrir el modal programáticamente
```tsx
import { useAppKit } from '@reown/appkit/react'

function MyComponent() {
  const { open } = useAppKit()

  return <button onClick={() => open()}>Abrir Modal</button>
}
```

#### Ejecutar transacciones
```tsx
import { useWriteContract } from 'wagmi'

function MyComponent() {
  const { writeContract } = useWriteContract()

  const handleTransaction = () => {
    writeContract({
      address: '0x...',
      abi: [...],
      functionName: 'transfer',
      args: [recipient, amount]
    })
  }

  return <button onClick={handleTransaction}>Enviar</button>
}
```

## Próximos Pasos Sugeridos

- [ ] Implementar funcionalidad específica con smart contracts
- [ ] Agregar soporte para más chains
- [ ] Implementar social login
- [ ] Agregar Smart Accounts
- [ ] Crear ejemplos de transacciones
- [ ] Agregar indicador de red conectada

## Recursos

- [Reown AppKit Docs](https://docs.reown.com/appkit/next/core/installation)
- [Wagmi Docs](https://wagmi.sh)
- [Viem Docs](https://viem.sh)
- [Reown Dashboard](https://dashboard.reown.com)

## Troubleshooting

### Error: Project ID is not defined
**Solución:** Asegúrate de tener `NEXT_PUBLIC_REOWN_PROJECT_ID` en tu archivo `.env.local`

### Warnings de módulos no encontrados (pino-pretty, async-storage)
**Status:** Son warnings normales de dependencias opcionales. No afectan la funcionalidad.

### La wallet no se conecta
**Solución:**
1. Verifica que tengas una wallet instalada
2. Revisa la consola del navegador para errores
3. Asegúrate de que tu Project ID sea válido

---

**Última actualización:** Octubre 2025
