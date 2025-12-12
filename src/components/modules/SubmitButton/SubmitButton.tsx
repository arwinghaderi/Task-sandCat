'use client'
import React from 'react'

export default function SubmitButton({
  onSubmit,
  submitted,
  allCorrect,
  hasWrong,
}: {
  onSubmit: () => void
  submitted: boolean
  allCorrect: boolean
  hasWrong: boolean
}) {
  let btnColor = 'bg-blue-600 hover:bg-blue-700'
  let text = 'ارسال'

  if (submitted) {
    if (allCorrect) {
      btnColor = 'bg-green-600 hover:bg-green-700'
      text = 'همه درست ✅'
    } else if (hasWrong) {
      btnColor = 'bg-red-600 hover:bg-red-700'
      text = 'اشتباه داری ❌'
    } else {
      btnColor = 'bg-yellow-500 hover:bg-yellow-600'
      text = 'ناقص ⚠️'
    }
  }

  return (
    <button
      onClick={onSubmit}
      className={`px-4 py-2 rounded-md transition text-white ${btnColor}`}
    >
      {text}
    </button>
  )
}
