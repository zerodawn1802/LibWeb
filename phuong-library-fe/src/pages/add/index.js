import React, { useEffect, useState } from 'react'
import * as yup from "yup"
import * as api from "../api"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import InputText from '../../components/InputText'
import {validateDate, validateNumber, validateRequired, validateSelect} from "../../constants/validate"
import InputDate from '../../components/InputDate'
import { Router, useRouter } from 'next/router'
import InputSelect from '../../components/InputSelect'
import InputTextArea from '../../components/InputTextArea'
import axios from 'axios'
import InputImage from '../../components/InputImage'
import ButtonBase from '../../components/ButtonBase'
import { Save } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Add = ({optionsCategory}) => {
  const [baseImg, setBaseImg] = useState("")
  const router = useRouter()
  const schema = yup
    .object({
      title: validateRequired("tiêu đề"),
      author: validateRequired("tác giả"),
      description: validateRequired("mô tả"),
      date: validateDate("ngày phát hành"),
      page: validateNumber,
      category: validateSelect("thể loại"),
      image: validateSelect("ảnh")
    })

  const { register, handleSubmit, control, formState: { errors }, watch, reset, getValues } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async(data) => {
    try {
      console.log("data", data)
      let dataNew = { ...data }
      if (dataNew?.date) dataNew.date = new Date(dataNew.date).toISOString()
      const formData = new FormData();
      let image = data?.image 
      delete data.image
      if(image) formData.append("files.image", image);
      formData.append("data", JSON.stringify(dataNew));
      await api.createBook(formData)
      toast.success("Thêm sách thành công")
    } catch (error) {
      toast.error("Thêm sách không thành công")
    }
    setTimeout(function(){
      router.push('/')
    }, 1500)
  }

  console.log('errors', errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-[1600px] bg-white m-auto mt-10 p-5'>
      <h1 className='font-medium text-2xl text-center uppercase'>New Book</h1>
      <ToastContainer position="top-center"  autoClose={1500} />
      <div className='flex gap-20'>
        <div className='w-full flex flex-col'>
            <InputText 
              label='Tiêu đề'
              register={register("title")}
              error={errors?.title}
              required
            />
            <InputText 
              label='Tác giả'
              register={register("author")}
              error={errors?.author}
              required
            />
          <InputTextArea 
            label='Mô tả'
            register={register("description")}
            error={errors?.description}
            required
          />
            <InputDate
              label='Ngày phát hành'
              register={register("date")}
              error={errors?.date}
              required
            />
            <InputText 
              label='Số trang'
              register={register("page")}
              error={errors?.page}
              required
            />
          <InputSelect 
            control={control}
            placeholder="Chọn thể loại"
            options={optionsCategory}
            label='Thể loại'
            name='category'
            error={errors?.category}
            required
          />
        </div>
        <InputImage 
          register={register("image")}
          error={errors?.image}
        />
      </div>
      <div className='flex justify-center mt-8 mb-4'>
        <ButtonBase textButton='Save' onClick={handleSubmit(onSubmit)} icon={<Save className='ml-3'/>} bgColor='bg-green-300'/>
      </div>
    </form>
    )
}

export default Add

export async function getServerSideProps(context) {
  const res = await axios.get(`http://localhost:1337/categories`)

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      optionsCategory: res.data
    }, // will be passed to the page component as props
  }
}