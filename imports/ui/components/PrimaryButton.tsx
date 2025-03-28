import React from 'react'

interface PrimaryButtonProps {
    text: string
}

const PrimaryButton = ({text}:PrimaryButtonProps) => {
  return (
    <button className='text-2xl font-semibold uppercase w-fit h-[50px] bg-red-500 px-5 rounded-sm cursor-pointer'>{text}</button>
  )
}

export default PrimaryButton