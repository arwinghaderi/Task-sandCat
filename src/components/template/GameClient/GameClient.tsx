'use client'
import dynamic from 'next/dynamic'
import type { FC } from 'react'

const GameClient = dynamic(() => import('../GameClientInner/GameClientInner'), {
  ssr: false,
}) as FC
export default GameClient
