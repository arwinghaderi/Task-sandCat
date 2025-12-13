'use client'
import React, { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import GameBoard from '../../template/GameBoard/GameBoard'
import OptionsPanel from '../../template/OptionsPanel/OptionsPanel'
import SubmitButton from '../../modules/SubmitButton/SubmitButton'
import { motion } from 'framer-motion'
import Celebration from '../../modules/Celebration/Celebration'

type ZoneItem = { id: string; label: string } | null
type ZoneStatus = 'default' | 'correct' | 'wrong'

type Zone = {
  id: string
  top: string
  left: string
  item: ZoneItem
  status?: ZoneStatus
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
  { id: 'zone-1', top: '28%', left: '35%', item: null, status: 'default' },
  { id: 'zone-2', top: '10%', left: '58%', item: null, status: 'default' },
  { id: 'zone-3', top: '60%', left: '80%', item: null, status: 'default' },
  { id: 'zone-4', top: '40%', left: '10%', item: null, status: 'default' },
]

export default function GameClientInner() {
  const [options, setOptions] = useState(initialOptions)
  const [zones, setZones] = useState(initialZones)

  const [activeItem, setActiveItem] = useState<{
    id: string
    label: string
  } | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const [allCorrect, setAllCorrect] = useState(false)
  const [semiCorrect, setSemiCorrect] = useState(false)
  const [hasWrong, setHasWrong] = useState(false)

  const correctAnswers: Record<string, string> = {
    'zone-1': 'تابلو',
    'zone-2': 'پلنگ',
    'zone-3': 'درخت',
    'zone-4': 'کاکتوس',
  }

  const evaluate = (zonesToCheck: Zone[]) => {
    let correctCount = 0

    const updatedZones: Zone[] = zonesToCheck.map((z) => {
      const expected = correctAnswers[z.id]

      if (!z.item) return { ...z, status: 'default' as ZoneStatus }

      if (z.item.label === expected) {
        correctCount++
        return { ...z, status: 'correct' as ZoneStatus }
      }

      return { ...z, status: 'wrong' as ZoneStatus }
    })

    return {
      updatedZones,
      flags: {
        allCorrect: correctCount === 4,
        semiCorrect: correctCount === 2 || correctCount === 3,
        hasWrong: correctCount <= 1,
      },
    }
  }

  const applyEvaluation = (zonesNext: Zone[]) => {
    const { updatedZones, flags } = evaluate(zonesNext)
    setZones(updatedZones)
    setAllCorrect(flags.allCorrect)
    setSemiCorrect(flags.semiCorrect)
    setHasWrong(flags.hasWrong)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    applyEvaluation(zones)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const draggedItem = options.find((opt) => opt.id === activeId)
    if (draggedItem) {
      const zonesNext: Zone[] = zones.map((z) => {
        if (z.id === overId) {
          if (z.item) {
            setOptions((prevOpts) => [...prevOpts, z.item!])
          }
          return { ...z, item: draggedItem, status: 'default' as ZoneStatus }
        }
        return z
      })

      setZones(zonesNext)
      setOptions((prev) => prev.filter((opt) => opt.id !== activeId))

      if (submitted) applyEvaluation(zonesNext)
      return
    }

    const sourceZone = zones.find((z) => z.item?.id === activeId)
    const targetZone = zones.find((z) => z.id === overId)
    if (sourceZone && targetZone) {
      const zonesNext: Zone[] = zones.map((z) => {
        if (z.id === sourceZone.id) {
          return {
            ...z,
            item: targetZone.item,
            status: 'default' as ZoneStatus,
          }
        }
        if (z.id === targetZone.id) {
          return {
            ...z,
            item: sourceZone.item,
            status: 'default' as ZoneStatus,
          }
        }
        return z
      })

      setZones(zonesNext)
      if (submitted) applyEvaluation(zonesNext)
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 100, tolerance: 5 },
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <DndContext
      sensors={sensors}
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
      onDragEnd={handleDragEnd}
    >
      <div className="mt-6">
        <GameBoard zones={zones} />
      </div>

      <div className="mt-6">
        <OptionsPanel options={options} allOptions={initialOptions} />
      </div>

      <div className="mt-4 flex items-center justify-center w-full">
        <SubmitButton
          onSubmit={handleSubmit}
          submitted={submitted}
          allCorrect={allCorrect}
          hasWrong={hasWrong}
          semiCorrect={semiCorrect}
        />
      </div>

      <DragOverlay>
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
            className="
     w-12 h-10        
    sm:w-24 sm:h-14  
    md:w-28 md:h-16  
    bg-linear-to-br from-purple-600 via-pink-500 to-yellow-400
    rounded-xl flex items-center justify-center cursor-grabbing
    shadow-2xl border border-white/30
  "
          >
            <span className="text-white text-xs sm:text-base font-bold tracking-wide drop-shadow-lg">
              {activeItem.label}
            </span>
          </motion.div>
        ) : null}
      </DragOverlay>
      <Celebration allCorrect={allCorrect} />
    </DndContext>
  )
}
