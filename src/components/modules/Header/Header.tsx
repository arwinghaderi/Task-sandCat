import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <>
      <div className=" relative mx-auto   md:w-[600px]  h-[170px] rounded-3xl bg-[url('/images/Header-bg.png')] bg-no-repeat bg-contain bg-center">
        <ul className=" absolute inset-0 flex items-center justify-between p-4 ">
          <Image
            src={'/images/menu.png'}
            alt="menu"
            width={1000}
            height={1000}
            className=" cursor-pointer w-10 lg:w-15 h-10 lg:h-15 "
          />
          <Image
            src={'/images/Logo.png'}
            alt="menu"
            width={1000}
            height={1000}
            className=" cursor-pointer w-10 lg:w-15 h-10 lg:h-15  "
          />
          <Image
            src={'/images/Clock.png'}
            alt="menu"
            width={1000}
            height={1000}
            className=" cursor-pointer w-10 lg:w-15 h-10 lg:h-15  "
          />
        </ul>
      </div>
      <div className="relative mx-auto h-6 w-full max-w-[354px] rounded-3xl bg-[url('/images/Bar.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 flex items-center gap-2 px-4">
          {/* Star with number */}
          <div className="    relative flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px] cursor-pointer">
            <Image
              src="/images/star.png"
              alt="menu"
              fill
              className="object-contain"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-sm font-extrabold leading-normal text-center"
              style={{
                WebkitTextStrokeWidth: '0.55px',
                WebkitTextStrokeColor: '#998D2F',
                fontFamily: 'Bonyade Koodak FaNum',
              }}
            >
              ۵۰
            </span>
          </div>
          {/* Progress Bar */}
          <div
            dir="ltr"
            className="relative flex-1 h-3 bg-white rounded-2xl "
          >
            {/* Progress fill */}
            <div className="h-full w-[60%] bg-[#FFE16A] rounded-[99px] border border-black shadow-[0_2px_0_0_#000] flex items-center justify-end pl-2">
              <span
                className="text-[10px] text-white font-extrabold leading-none text-right "
                style={{
                  WebkitTextStrokeWidth: '0.5px',
                  WebkitTextStrokeColor: '#998D2F',
                }}
              >
                ۳۵
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
