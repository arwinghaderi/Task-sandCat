import React from 'react'

export default function SectionHeader() {
  return (
    <>
      <div className=" flex items-center  gap-4  ">
        <div className="w-8 h-8 flex items-center justify-center shrink-0 bg-[#FED584]  border-2 border-black border-b-[3.5px] rounded-full text-center text-black">
          <span>۸</span>
        </div>

        <span className=" text-black font-medium leading-6  text-sm sm:text-lg ">
          فرزندم، نام اجسام را درون مستطیل مربوطه قرار دهید.
        </span>
      </div>
    </>
  )
}
