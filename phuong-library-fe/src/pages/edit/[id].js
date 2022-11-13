import React, { useEffect, useState } from 'react'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import InputText from '../../components/InputText'
import {validateDate, validateRequired, validateSelect, validateSold} from "../../constants/validate"
import { Router, useRouter } from 'next/router'
import * as api from '../api'
import ButtonBase from '../../components/ButtonBase'
import InputSelect from '../../components/InputSelect'
import InputTextArea from '../../components/InputTextArea'
import { Edit, Save } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import InputImage from '../../components/InputImage'
import InputDate from '../../components/InputDate'

const EditItem = ({ book, optionsCategory }) => {
  const router = useRouter()
  const [isDisable, setIsDisable] = useState(true)
  const id = router.query.id
  console.log("book", book)

   const schema = yup
    .object({
      title: validateRequired("tiêu đề"),
      author: validateRequired("tác giả"),
      description: validateRequired("mô tả"),
      date: validateDate("ngày phát hành"),
      page: validateRequired("số trang"),
      category: validateSelect("thể loại"),
      image: validateSelect("ảnh"),
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {...book}
  })
  
  const onSubmit = async(data) => {
    try {
      console.log("data",data)
      let dataNew = { ...data }
      if (dataNew?.date) dataNew.date = new Date(dataNew.date).toISOString()
      const formData = new FormData();
      let image = data?.image 
      delete data.image
      if(image) formData.append("files.image", image);
      formData.append("data", JSON.stringify(dataNew));
      let id = router.query.id
      await api.updateBook(id, formData)
      toast.success("Chỉnh sửa sách thành công")
    } catch (err) {
      toast.error("Lỗi chỉnh sửa sách")
    }
    setTimeout(function(){
      router.push('/')
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-[1600px] m-auto mt-10 p-5'>
      <h1 className='font-medium text-2xl text-center uppercase'>
        {isDisable ? 'View Book' : 'Edit Book'}
      </h1>
      <ToastContainer position="top-center"  autoClose={1500} />
      {/* body left */}
      <div className='flex gap-20'>
        <div className='w-full flex flex-col'>
            <InputText 
              label='Tiêu đề'
              register={register("title")}
              error={errors?.title}
              disable={isDisable}
              required
            />
            <InputText 
              label='Tác giả'
              register={register("author")}
              error={errors?.author}
              disable={isDisable}
              required
            />
       
          <InputTextArea 
            label='Mô tả'
            register={register("description")}
            error={errors?.description}
            disable={isDisable}
            required
          />
            <InputDate 
              label='Ngày phát hành'
              register={register("date")}
              error={errors?.date}
              disabled={isDisable}
              required
            />
            <InputText 
              label='Số trang'
              register={register("page")}
              error={errors?.page}
              disable={isDisable}
              required
            />

          <InputSelect 
            control={control}
            placeholder="Chọn thể loại"
            options={optionsCategory}
            label='Thể loại'
            name='category'
            error={errors?.category}
            disabled={isDisable}
            required
            defaultValues={book.category?.name}
          />
        </div>
        {/* body-right */}
        <InputImage 
          register={register("image")}
          disabled={isDisable}
          error={errors?.image}
          defaultValues={book.image}
          isEdit
        />
      </div>
      <div className='flex justify-center mt-6'>
        {isDisable 
          ? <ButtonBase textButton='Edit' onClick={() => setIsDisable(!isDisable)} icon={<Edit className='ml-3'/>} bgColor='bg-gray-500'/>
          : <ButtonBase textButton='Save' onClick={handleSubmit(onSubmit)} icon={<Save className='ml-3' />} bgColor='bg-gray-500' />
        }
      </div>
    </form>
    )
}

export default EditItem

export async function getServerSideProps(context) {
  const book = await api.readBook(context.query.id)
  const optionsCategory = await api.getCategories()

  if (!book) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      book: book.data,
      optionsCategory: optionsCategory.data
    }, // will be passed to the page component as props
  }
}