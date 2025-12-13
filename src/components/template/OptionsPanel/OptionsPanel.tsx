'use client'
import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'

type Option = { id: string; label: string }

type Props = {
  options: Option[]
  allOptions: Option[]
}

function DraggableBox({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { label, type: 'option' },
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
      whileHover={{ scale: 1.1, rotate: 2, backgroundColor: '#FFFAE3' }}
      whileTap={{ scale: 0.95, rotate: -2 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
      className={`w-full  h-12 md:h-20 bg-white rounded-lg flex items-center justify-center  
  ${isDragging ? ' cursor-grabbing ' : '  cursor-grab '}
`}
    >
      <span className="text-black text-xs md:text-lg font-bold">{label}</span>
    </motion.div>
  )
}

export default function OptionsPanel({ options, allOptions }: Props) {
  return (
    <div className="flex justify-between gap-1 md:gap-2 p-0 md:p-4">
      {allOptions.map((opt) => (
        <div
          key={opt.id}
          className="w-full h-15 md:h-24 bg-[#E2E6EA]  px-0.5  pt-0.5  pb-2 sm:pb-3  md:px-1 md:pt-3 md:pb-5 rounded-lg flex items-center justify-center"
        >
          {options.find((o) => o.id === opt.id) && (
            <DraggableBox id={opt.id} label={opt.label} />
          )}
        </div>
      ))}
    </div>
  )
}
