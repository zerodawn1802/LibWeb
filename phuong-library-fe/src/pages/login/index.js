import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import InputText from '../../components/InputText'
import * as yup from "yup"
import { validateEmail, validatePassword } from '../../constants/validate'
import ButtonBase from '../../components/ButtonBase'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Link from 'next/link'

const Login = () => {
  const router = useRouter()
  const schema = yup
    .object({
      email: validateEmail,
      password: validatePassword,
    })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:1337/auth/local', {
      identifier: data.email,
      password: data.password,
    })
    .then(response => {
      console.log("OKOKOK")
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Đăng nhập thành công")
      setTimeout(() => {
        router.push('/')
      }, 2500)
    })
    .catch(error => {
      toast.error("Sai email hoặc password")
    });
    
  }


  return (
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <ToastContainer position="top-center" autoClose={1500} />
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-0 space-y-4 rounded-lg p-8">
        <h1 className="text-2xl font-medium">Đăng nhập</h1>
        <div className='mb-5'>
          <div className="relative mt-1">
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
          </div>
        </div>
        <div className='text-center flex justify-center items-center'>
          <ButtonBase textButton='Login' onClick={handleSubmit(onSubmit)} bgColor='bg-gray-400'/>
        </div>

        <p className="text-center text-sm text-gray-500">
          Bạn chưa có tài khoản?{'    '}
          <Link className="underline" href={'/signup'}>Sign up</Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default Login