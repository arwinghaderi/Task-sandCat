'use client'
import Confetti from 'react-confetti'
import { useState, useEffect } from 'react'

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export default function Celebration({ allCorrect }: { allCorrect: boolean }) {
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (allCorrect) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 15000)
      return () => clearTimeout(timer)
    }
  }, [allCorrect])

  return showConfetti ? (
    <Confetti
      width={width - 40}
      height={height}
      numberOfPieces={5000}
      style={{ position: 'fixed', top: 0, left: 0 }}
      recycle={false}
    />
  ) : null
}
