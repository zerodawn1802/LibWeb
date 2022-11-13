import React, { memo } from 'react'

const InputTextArea = ({ register, error, required, label, disable }) => {
  return (
    <div className="w-full mt-10">
      {label && <label htmlFor="id" className="form-label inline-block mb-3  font-bold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>}
      {<textarea
        {...register}
        type='text'
        className={`form-control block w-full px-3 py-1.5 text-base font-normal ${disable ? "bg-[#f2f2f2] text-[#a9a3a5] cursor-not-allowed" : "bg-white"}  bg-clip-padding
          border border-solid rounded transition ease-in-out border-gray-300 focus:bg-white 
          focus:border-blue-600 focus:outline-none`}
        disabled={disable}
      />}
      <p className={`error-message mt-1 ml-1 text-red-500 text-sm text-start italic`}>
        {error?.message}{" "}
      </p>
    </div>
  )
}

export default memo(InputTextArea)