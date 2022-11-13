import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const InputImage = ({ register, disabled, error, defaultValues, isEdit }) => {
  const [fileForm, setFileForm] = useState(defaultValues || null);
    const [fileReview, setFileReview] = useState(defaultValues?.url || null);
    const [err, setError] = useState(null);
    const [edit, setEdit] = useState(isEdit || null);

    useEffect(() => {
        const { onChange, name } = register
        let value = undefined
        if (fileForm) {
            value = fileForm
            console.log("fileForm:" + fileForm)
        }
        onChange({ target: { value, name } })
    }, [fileForm])

    const handleChange = (event) => {

        setEdit(false)
        const file = event.target.files[0];
        const file_type = file?.type.split(`/`)?.[0];

        if (file_type !== "image") {
            setError("Bạn chỉ được nhập ảnh")
            return;
        }
        if (file?.size > 2 * 1024 * 1024) {
            setError("Vui lòng đính kèm ảnh tối đa 2MB")
            return;
        }
        setError("")
        setFileForm(file)

        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            // that.fileImageRead.push(e.target.result);
            setFileReview(e.target.result)
        };
        fileReader.readAsDataURL(file);
    }

  return (
    <div className='w-full h-auto flex flex-col mt-10'>
      <input id='file-upload' type='file' 
        accept="image/*"
        className='text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0
        file:text-sm file:font-medium file:bg-blue-50 hover:file:cursor-pointer 
       m-auto cursor-not-allowed file:text-left'
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={`flex justify-center items-center w-full h-auto border-2
      border-blue-600 flex-grow mt-5 overflow ${disabled && 'bg-gray-100'}`}>
        {fileReview && <Image src={edit ? 'http://localhost:1337' + fileReview : fileReview} 
        width='764px' height='678px' alt='' className='object-cover' />}
      </div>
      <p className={`mt-1 text-red-500 text-sm text-start italic`}>{error?.message || err}  </p>
    </div>
  )
}

export default InputImage