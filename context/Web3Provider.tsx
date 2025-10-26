'use client'

import { wagmiAdapter, projectId } from '@/config/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { WagmiProvider, type Config } from 'wagmi'
import { mainnet, polygon, arbitrum, base, optimism } from '@reown/appkit/networks'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'CriptoChingaderas',
  description: 'Proyectos reales, experimentos sabrosos y una guía para brincar de web2 → web3',
  url: 'https://criptochingaderas.com',
  icons: ['https://criptochingaderas.com/criptochingaderas_sinletras.png']
}

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, polygon, arbitrum, base, optimism],
  defaultNetwork: mainnet,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  }
})

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
