'use client'

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Wallet, LogOut } from 'lucide-react'

export function WalletButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => open()}
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 transition"
        >
          <Wallet className="h-4 w-4" />
          {formatAddress(address)}
        </button>
        <button
          onClick={() => open()}
          className="md:hidden p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition"
        >
          <Wallet className="h-5 w-5" />
        </button>
        <button
          onClick={() => disconnect()}
          className="p-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
          title="Desconectar wallet"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => open()}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-400/30 hover:bg-blue-500/10 hover:border-blue-400/50 transition text-sm"
      >
        <Wallet className="h-4 w-4" />
        Conectar Wallet
      </button>
      <button
        onClick={() => open()}
        className="md:hidden p-2 rounded-xl border border-blue-400/30 hover:bg-blue-500/10 hover:border-blue-400/50 transition"
      >
        <Wallet className="h-5 w-5" />
      </button>
    </>
  )
}
