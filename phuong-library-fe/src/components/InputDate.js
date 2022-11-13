import React from 'react'


const InputDate = ({ register, error, required, label, onChange, disabled }) => {

  return (
    <div className="w-full mt-10">
      {label && <label htmlFor="id" className="form-label inline-block mb-3  font-bold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>}
      <input
        type="date"
        {...register}
        className={`form-control block w-full px-4 py-2.5 text-base font-normal bg-clip-padding
          border border-solid border-gray-300 rounded transition ease-in-out  focus:bg-white 
          focus:border-blue-600 focus:outline-none ${disabled ? "bg-[#f2f2f2] text-[#a9a3a5] cursor-not-allowed" : "bg-white"}`}
        id="dob"
        placeholder=""
        onChange={onChange}
        disabled={disabled}
      />
      <p className={`error-message mt-1 text-red-500 text-sm text-start italic`}>
        {error?.message}{" "}
      </p>
    </div>
  )
}

export default InputDate