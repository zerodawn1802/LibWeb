import React, { memo } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

const InputSelect = ({ label, name, error, control, options, placeholder, disabled, required, defaultValues }) => {
  return (
    <div className="w-full mt-10">
      {label && <label htmlFor='category' className='form-label inline-block mb-3 font-bold'>
          {label} {required && <span className="text-red-500">*</span>}
      </label>}
      <div className='text-start'>
        <Controller 
          control={control}
          name={name}
          render={({ field }) => (
            <Select 
              id="long-value-select"
              instanceId="long-value-select"
              className={`custom-select whitespace-nowrap ${disabled ? 'bg-gray-100 cursor-not-allowed': 'bg-white'}`}
              getOptionLabel={option => option?.name}
              getOptionValue={option => option?.id}
              placeholder={placeholder}
              options={options} 
              { ...field }
              isDisabled={disabled}
              defaultValues={defaultValues}
            />
          )}
        />
        <p className={`error-message mt-1 text-red-500 text-sm text-start italic`}>{error?.message}</p>
      </div>
    </div>
  )
}

export default memo(InputSelect)