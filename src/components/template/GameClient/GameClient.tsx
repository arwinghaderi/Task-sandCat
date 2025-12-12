'use client'
import React, { useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import GameBoard from '../../template/GameBoard/GameBoard'
import OptionsPanel from '../../template/OptionsPanel/OptionsPanel'
import SubmitButton from '../../modules/SubmitButton/SubmitButton'
import { motion } from 'framer-motion'

type ZoneItem = { id: string; label: string } | null
type Zone = {
  id: string
  top: string
  left: string
  item: ZoneItem
  status?: 'default' | 'correct' | 'wrong'
}

const initialOptions = [
  { id: 'opt-1', label: 'درخت' },
  { id: 'opt-2', label: 'پلنگ' },
  { id: 'opt-3', label: 'کاکتوس' },
  { id: 'opt-4', label: 'تابلو' },
  { id: 'opt-5', label: 'آسمان' },
  { id: 'opt-6', label: 'زمین' },
]

const initialZones: Zone[] = [
  { id: 'zone-1', top: '32%', left: '40%', item: null, status: 'default' },
  { id: 'zone-2', top: '15%', left: '65%', item: null, status: 'default' },
  { id: 'zone-3', top: '60%', left: '88%', item: null, status: 'default' },
  { id: 'zone-4', top: '45%', left: '10%', item: null, status: 'default' },
]

export default function GameClient() {
  const [options, setOptions] = useState(initialOptions)
  const [zones, setZones] = useState(initialZones)
  const [activeItem, setActiveItem] = useState<{
    id: string
    label: string
  } | null>(null)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const draggedItem = options.find((opt) => opt.id === activeId)
    if (draggedItem) {
      setZones((prev) =>
        prev.map((z) => {
          if (z.id === overId) {
            if (z.item) {
              setOptions((prevOpts) => [...prevOpts, z.item!])
            }
            return { ...z, item: draggedItem, status: 'default' }
          }
          return z
        })
      )
      setOptions((prev) => prev.filter((opt) => opt.id !== activeId))
      return
    }

    const sourceZone = zones.find((z) => z.item?.id === activeId)
    const targetZone = zones.find((z) => z.id === overId)
    if (sourceZone && targetZone) {
      setZones((prev) =>
        prev.map((z) => {
          if (z.id === sourceZone.id) {
            return { ...z, item: targetZone.item, status: 'default' }
          }
          if (z.id === targetZone.id) {
            return { ...z, item: sourceZone.item, status: 'default' }
          }
          return z
        })
      )
    }
  }

  const handleZoneSwap = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const sourceZone = zones.find((z) => z.item?.id === activeId)
    const targetZone = zones.find((z) => z.id === overId)

    if (sourceZone && targetZone) {
      setZones((prev) =>
        prev.map((z) => {
          if (z.id === sourceZone.id) {
            return { ...z, item: targetZone.item, status: 'default' }
          }
          if (z.id === targetZone.id) {
            return { ...z, item: sourceZone.item, status: 'default' }
          }
          return z
        })
      )
    }
  }

  const correctAnswers: Record<string, string> = {
    'zone-1': 'درخت',
    'zone-2': 'پلنگ',
    'zone-3': 'کاکتوس',
    'zone-4': 'تابلو',
  }

  const checkAnswers = () => {
    setZones((prev) =>
      prev.map((z) => {
        if (!z.item) return { ...z, status: 'default' }
        if (z.item.label === correctAnswers[z.id]) {
          return { ...z, status: 'correct' }
        }
        return { ...z, status: 'wrong' }
      })
    )
  }

  return (
    <DndContext
      onDragStart={(e) => {
        const activeId = e.active.id as string

        const draggedItem = options.find((opt) => opt.id === activeId)
        if (draggedItem) {
          setActiveItem(draggedItem)
          return
        }

        const sourceZone = zones.find((z) => z.item?.id === activeId)
        if (sourceZone?.item) {
          setActiveItem(sourceZone.item)
        }
      }}
      onDragEnd={(event) => {
        handleDragEnd(event)
        handleZoneSwap(event)
      }}
    >
      <div className="mt-6">
        <GameBoard zones={zones} />
      </div>
      <div className="mt-6">
        <OptionsPanel options={options} allOptions={initialOptions} />
      </div>
      <div className="mt-4 flex gap-8 justify-center">
        <SubmitButton
          onSubmit={checkAnswers}
          submitted={false}
          allCorrect={false}
          hasWrong={false}
        />
      </div>

      <DragOverlay>
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
            className="w-28 h-16 bg-linear-to-br from-purple-600 via-pink-500 to-yellow-400
             rounded-xl flex items-center justify-center 
             shadow-2xl border border-white/30"
          >
            <span className="text-white text-base font-bold tracking-wide drop-shadow-lg">
              {activeItem.label}
            </span>
          </motion.div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
