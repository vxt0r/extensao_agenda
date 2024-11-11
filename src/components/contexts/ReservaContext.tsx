import { ReservaDatabase } from '@database/useReservaDatabase'
import React, { createContext, useContext, useState,  Dispatch, SetStateAction, ReactNode } from 'react'

interface ReservaProviderProps {
  children: ReactNode
}

const ReservaContext = createContext<{
  reservas: ReservaDatabase[]
  setReservas: React.Dispatch<React.SetStateAction<ReservaDatabase[]>>
} | null>(null)

function ReservaProvider ({children}: ReservaProviderProps) {

  const [reservas, setReservas] = useState<ReservaDatabase[]>([])

  return (
    <ReservaContext.Provider value={{ reservas, setReservas }}>
      {children}
    </ReservaContext.Provider>
  )
}

export default ReservaProvider

export function useReservaContext() {
  const context = useContext(ReservaContext)
  if (!context) {
    throw new Error('Contexto sendo usado fora do provider')
  }
  return context
}
