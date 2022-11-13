import React, { memo, useState } from 'react'
import { Eye, EyeOff } from 'react-feather'

const InputText = ({ register, error, required, label, disable, placeholder, password }) => {
  const [isShow, setIsShow] = useState(false)

  return (
    <div className="w-full mt-10">
      {label && <label htmlFor="id" className="form-label inline-block mb-3 font-bold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>}
      <div className={` flex justify-center items-center px-2 py-1 gap-2 border rounded focus:border-blue-600 
      ${disable ? "bg-[#f2f2f2] text-[#a9a3a5] cursor-not-allowed" : "bg-white"} mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm`}>
      {<input
        {...register}
        type={`${password ? (!isShow ? 'password' : 'text') : 'text'}`}
        className={`form-control block w-full px-3 py-1.5 text-base font-normal 
          rounded transition ease-in-out border-gray-300 focus:bg-white focus:outline-none`}
        placeholder={`${placeholder ? "dd/MM/yyyy" : `Nhập vào ${label?.toLocaleLowerCase()}`}`}
        disabled={disable}
      />}
      {password && (isShow ?  <Eye onClick={() => setIsShow(!isShow)} className='cursor-pointer'/> 
        : <EyeOff onClick={() => setIsShow(!isShow)} className='cursor-pointer' />)}
      </div>
      <p className={`error-message mt-1 ml-1 text-red-500 text-sm text-start italic`}>
        {error?.message}{" "}
      </p>
    </div>
  )
}

export default memo(InputText)