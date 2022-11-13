import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'postcss'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputText from '../../components/InputText'
import * as yup from "yup"
import { validateConfirmPassword, validateEmail, validatePassword, validateUsername } from '../../constants/validate'
import ButtonBase from '../../components/ButtonBase'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const SignUp = () => {
  const router = useRouter()
  const schema = yup
    .object({
      username: validateUsername,
      email: validateEmail,
      password: validatePassword,
      confirmPassword: validateConfirmPassword("password"),
    })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:1337/auth/local/register', {
      username: data.username,
      email:  data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    })
    .then(response => {
      console.log("OKOKOK")
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Đăng ký thành công")
      setTimeout(() => {
        router.push('/login')
      }, 2500)
    })
    .catch(error => {
      toast.error("Đăng ký không thành công")
      setTimeout(() => {
        router.push('/')
      }, 2500)
    });
  }


  return (
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <ToastContainer position="top-center" autoClose={1500} />
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-0 space-y-4 rounded-lg p-8">
        <h1 className="text-2xl font-medium">Đăng ký</h1>
        <div className='mb-5'>
          <div className="relative mt-1">
            <InputText 
              label='Username'
              register={register("username")}
              error={errors?.username}
              required
            />
            <InputText 
              label='Email'
              register={register("email")}
              error={errors?.email}
              required
            />
            <InputText 
              label='Password'
              register={register("password")}
              error={errors?.password}
              required
              password
            />
            <InputText 
              label='Confirm assword'
              register={register("confirmPassword")}
              error={errors?.confirmPassword}
              required
              password
            />
          </div>
        </div>
        <div className='text-center flex justify-center items-center '>
          <ButtonBase textButton='Register' onClick={handleSubmit(onSubmit)} bgColor='bg-gray-400'/>
        </div>
      </form>
    </div>
  </div>
  )
}

export default SignUp