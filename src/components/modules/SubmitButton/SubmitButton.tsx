'use client'
import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  onSubmit: () => void
  submitted: boolean
  allCorrect: boolean
  semiCorrect: boolean
  hasWrong: boolean
}

export default function SubmitButton({
  onSubmit,
  submitted,
  allCorrect,
  semiCorrect,
  hasWrong,
}: Props) {
  const getState = () => {
    if (!submitted) {
      return {
        btnColor: 'bg-[#FC881E]',
        text: 'ارسال',
        headerText: '',
        headerColor: '#FFC02D',
        icon: null,
        parentBg: 'bg-transparent',
        parentBorder: 'border-transparent',
      }
    }
    if (allCorrect) {
      return {
        btnColor: 'bg-[#00C247] text-black',
        text: 'همه درست ',
        headerText: 'آفرین!!!!!   5 ستاره گرفتی',
        headerColor: '#22C55E',
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.56 10.7401L20.2 9.16006C19.94 8.86006 19.73 8.30006 19.73 7.90006V6.20006C19.73 5.14006 18.86 4.27006 17.8 4.27006H16.1C15.71 4.27006 15.14 4.06006 14.84 3.80006L13.26 2.44006C12.57 1.85006 11.44 1.85006 10.74 2.44006L9.17 3.81006C8.87 4.06006 8.3 4.27006 7.91 4.27006H6.18C5.12 4.27006 4.25 5.14006 4.25 6.20006V7.91006C4.25 8.30006 4.04 8.86006 3.79 9.16006L2.44 10.7501C1.86 11.4401 1.86 12.5601 2.44 13.2501L3.79 14.8401C4.04 15.1401 4.25 15.7001 4.25 16.0901V17.8001C4.25 18.8601 5.12 19.7301 6.18 19.7301H7.91C8.3 19.7301 8.87 19.9401 9.17 20.2001L10.75 21.5601C11.44 22.1501 12.57 22.1501 13.27 21.5601L14.85 20.2001C15.15 19.9401 15.71 19.7301 16.11 19.7301H17.81C18.87 19.7301 19.74 18.8601 19.74 17.8001V16.1001C19.74 15.7101 19.95 15.1401 20.21 14.8401L21.57 13.2601C22.15 12.5701 22.15 11.4301 21.56 10.7401ZM16.16 10.1101L11.33 14.9401C11.19 15.0801 11 15.1601 10.8 15.1601C10.6 15.1601 10.41 15.0801 10.27 14.9401L7.85 12.5201C7.56 12.2301 7.56 11.7501 7.85 11.4601C8.14 11.1701 8.62 11.1701 8.91 11.4601L10.8 13.3501L15.1 9.05006C15.39 8.76006 15.87 8.76006 16.16 9.05006C16.45 9.34006 16.45 9.82006 16.16 10.1101Z"
              fill="#00C247"
            />
          </svg>
        ),
        parentBg: 'bg-[#00C24733]',
        parentBorder: 'border-[#00C247]',
      }
    }
    if (semiCorrect) {
      return {
        btnColor: 'bg-[#FFC02D] text-black',
        text: 'نیمه درست ',
        headerText: 'فدای سرت! 3 ستاره گرفتی',
        headerColor: '#FFC02D',
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.56 10.7401L20.2 9.16006C19.94 8.86006 19.73 8.30006 19.73 7.90006V6.20006C19.73 5.14006 18.86 4.27006 17.8 4.27006H16.1C15.71 4.27006 15.14 4.06006 14.84 3.80006L13.26 2.44006C12.57 1.85006 11.44 1.85006 10.74 2.44006L9.17 3.81006C8.87 4.06006 8.3 4.27006 7.91 4.27006H6.18C5.12 4.27006 4.25 5.14006 4.25 6.20006V7.91006C4.25 8.30006 4.04 8.86006 3.79 9.16006L2.44 10.7501C1.86 11.4401 1.86 12.5601 2.44 13.2501L3.79 14.8401C4.04 15.1401 4.25 15.7001 4.25 16.0901V17.8001C4.25 18.8601 5.12 19.7301 6.18 19.7301H7.91C8.3 19.7301 8.87 19.9401 9.17 20.2001L10.75 21.5601C11.44 22.1501 12.57 22.1501 13.27 21.5601L14.85 20.2001C15.15 19.9401 15.71 19.7301 16.11 19.7301H17.81C18.87 19.7301 19.74 18.8601 19.74 17.8001V16.1001C19.74 15.7101 19.95 15.1401 20.21 14.8401L21.57 13.2601C22.15 12.5701 22.15 11.4301 21.56 10.7401ZM16.16 10.1101L11.33 14.9401C11.19 15.0801 11 15.1601 10.8 15.1601C10.6 15.1601 10.41 15.0801 10.27 14.9401L7.85 12.5201C7.56 12.2301 7.56 11.7501 7.85 11.4601C8.14 11.1701 8.62 11.1701 8.91 11.4601L10.8 13.3501L15.1 9.05006C15.39 8.76006 15.87 8.76006 16.16 9.05006C16.45 9.34006 16.45 9.82006 16.16 10.1101Z"
              fill="#FFC02D"
            />
          </svg>
        ),
        parentBg: 'bg-[#FFC02D33]',
        parentBorder: 'border-[#FFC02D]',
      }
    }
    if (hasWrong) {
      return {
        btnColor: 'bg-[#EB5E40] text-black ',
        text: 'اشتباه داری ',
        headerText: 'دوباره تلاش کن!!!!!   هیچ ستاره ای نگرفتی',
        headerColor: '#EB5E40',
        icon: (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM6.47 9.28C6.18 8.99 6.18 8.51 6.47 8.22C7.76 6.93 9.87 6.93 11.17 8.22C11.46 8.51 11.46 8.99 11.17 9.28C11.02 9.43 10.83 9.5 10.64 9.5C10.45 9.5 10.26 9.43 10.11 9.28C9.4 8.57 8.24 8.57 7.53 9.28C7.24 9.58 6.76 9.58 6.47 9.28ZM15.6 18.08H8.4C7.7 18.08 7.13 17.51 7.13 16.8C7.13 14.11 9.32 11.92 12.01 11.92C14.7 11.92 16.89 14.11 16.89 16.8C16.88 17.5 16.3 18.08 15.6 18.08ZM17.53 9.28C17.24 9.57 16.76 9.57 16.47 9.28C15.76 8.57 14.6 8.57 13.89 9.28C13.74 9.43 13.55 9.5 13.36 9.5C13.17 9.5 12.98 9.43 12.83 9.28C12.54 8.99 12.54 8.51 12.83 8.22C14.12 6.93 16.23 6.93 17.53 8.22C17.82 8.52 17.82 8.99 17.53 9.28Z"
                fill="#EB5E40"
              />
            </svg>
          </>
        ),
        parentBg: ' bg-[#EB5E4033] ',
        parentBorder: 'border-[#EB5E40]',
      }
    }
    return {
      btnColor: 'bg-yellow-400 text-black',
      text: 'ناقص ',
      headerText: 'برخی جواب‌ها ناقصه',
      headerColor: '#FACC15',
      icon: <path d="M12 2L22 20H2L12 2Z" />,
      parentBg: 'bg-yellow-100',
      parentBorder: 'border-yellow-400',
    }
  }

  const state = getState()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
      className={`flex flex-col gap-8 w-full 
        ${
          submitted
            ? `${state.parentBg} ${state.parentBorder} border-4 rounded-3xl px-8 pb-8 pt-10`
            : ''
        }
      `}
    >
      {submitted && state.headerText && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <motion.svg
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={state.headerColor}
          >
            {state.icon}
          </motion.svg>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-bold leading-6 md:text-lg"
            style={{ color: state.headerColor }}
          >
            {state.headerText}
          </motion.span>
        </motion.div>
      )}

      <motion.button
        onClick={onSubmit}
        initial={{ y: 0 }}
        whileTap={{ y: 2 }}
        className={`px-4 cursor-pointer 
    border-b-[9px]  active:border-b-2 
    border-2 border-black rounded-3xl w-full py-[18px] font-bold 
    transition-all duration-300 ease-in-out ${state.btnColor}`}
      >
        {state.text}
      </motion.button>
    </motion.div>
  )
}
