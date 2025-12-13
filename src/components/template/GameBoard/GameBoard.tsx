'use client'
import Image from 'next/image'
import React from 'react'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'

type Zone = {
  id: string
  top: string
  left: string
  item: { id: string; label: string } | null
  status?: 'default' | 'correct' | 'wrong'
}

function DraggableZoneItem({
  item,
  status,
}: {
  item: { id: string; label: string }
  status?: 'default' | 'correct' | 'wrong'
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: { label: item.label, type: 'zone-item' },
    })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
      className={`w-full h-full text-black cursor-grab font-normal text-xs lg:text-lg flex items-center justify-center leading-9 rounded-[9px] *:cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-70 shadow-lg' : ''}
        ${
          status === 'default'
            ? 'bg-[#D1C4E8] '
            : status === 'correct'
            ? 'bg-[#CCF3DA]'
            : status === 'wrong'
            ? 'bg-[#FBDFD9] '
            : ''
        }
      `}
    >
      <span className=" text-[10px] sm:text-base  lg:text-lg text-black select-none">
        {item.label}
      </span>
    </motion.div>
  )
}

export default function GameBoard({ zones }: { zones: Zone[] }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={'/images/board.png'}
        alt="board"
        width={5000}
        height={5000}
        className="w-full h-full border-3 select-none border-black border-b-7 rounded-lg object-contain"
        quality={100}
        priority
      />

      {zones.map((zone) => {
        const { setNodeRef } = useDroppable({ id: zone.id })

        let zoneClass = ''
        if (!zone.item) {
          zoneClass = 'bg-white border-[#FC881E] border-dashed border-2'
        } else if (zone.status === 'default') {
          zoneClass = 'bg-[#8561C2]  !rounded-xl '
        } else if (zone.status === 'correct') {
          zoneClass = 'bg-[#00C247]  !rounded-xl'
        } else if (zone.status === 'wrong') {
          zoneClass = 'bg-[#EB5E40]  !rounded-xl'
        }

        return (
          <div
            key={zone.id}
            ref={setNodeRef}
            className={`absolute shrink-0 pt-0.5 px-0.5 pb-1.5 md:pb-2 text-center flex items-center justify-center rounded-xl transition duration-300 ${zoneClass}`}
            style={{
              top: zone.top,
              left: zone.left,
              width: 'clamp(40px, 15%, 150px)',
              height: 'clamp(40px, 13%, 148px)',
            }}
          >
            {zone.item ? (
              <DraggableZoneItem item={zone.item} status={zone.status} />
            ) : (
              <span className=" text-[10px] sm:text-base  lg:text-lg text-black select-none">
                ?
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
