import React, { memo } from 'react'

const ButtonBase = ({textButton, onClick, bgColor, bgColorHover}) => {
  return (
    <button type="button" className={`w-[150px] text-md flex items-center justify-center px-6 py-2.5 ${bgColor || 'bg-blue-400'} text-white font-medium
      uppercase rounded-full shadow-md hover:${bgColorHover || 'bg-blue-600' } hover:scale-105
      active:${bgColorHover || 'bg-blue-600'} focus:${bgColorHover || 'bg-blue-600'} transition duration-150 ease-in-out`}
      onClick={onClick}
      >
      {textButton}
    </button>
  )
}

export default memo(ButtonBase)