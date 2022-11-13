import * as api from './api'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Delete, Edit, LogIn, LogOut, Plus } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ButtonBase from '../components/ButtonBase';
import ModalConfirm from '../components/ModalConfirm';

const theadTable = [
  { name: 'Tiêu đề', slug: 'title' },
  { name: 'Tác giả', slug: 'author' },
  { name: 'Ngày phát hành', slug: 'date'},
  { name: 'Số trang', slug: 'pages'},
  { name: 'Thể loại', slug: 'category'},
  { name: 'Hành động', slug: 'actions'}
]

export default function Home({books}) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  console.log("books",books)
  const [isShow, setIsShow] = useState(false)
  const [isShowLogout, setIsShowLogout] = useState(false)
  const [id, setId] = useState(0)

  const handleDelete = async(id) => {
    try {
      console.log("id", id)
      await api.deleteBook(id)
      setIsShow(false)
      toast.success('Xóa sách thành công')
    } catch (err){
      toast.success('Xóa sách không thành công')
    }
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  const hangleLogout = () => {
    localStorage.removeItem("user")
    setIsShowLogout(true)
    toast.success('Bạn đã đăng xuất thành công')
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])

  return (
    <div className="w-[1600px]  m-auto">
      <div className='flex justify-end mt-10'>
        {user 
        ? <div className='flex justify-center items-center gap-5'>
          <ButtonBase textButton="Logout"  onClick={() => setIsShowLogout(true)} bgColor='bg-yellow-400' icon={<LogOut className='ml-3'/>}/>
          </div>
        : <div className='flex justify-center items-center gap-5 text-red-700'>
            <ButtonBase textButton="Login"  onClick={() => router.push('/login')} bgColor='bg-yellow-300' icon={<LogIn className='ml-3'/>}/>
          </div>
        }
      </div>
      <div className="flex flex-col mt-8 ">
        <ToastContainer position="top-center" autoClose={1500} />
        {user && <div className='flex justify-start'>
          <ButtonBase textButton="Add Book" onClick={() => router.push('/add')} icon={<Plus className='ml-3' />} bgColor='bg-green-400'/>
        </div>}
        <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-200 shadow-2xl mt-10 rounded-lgrelative">
          <thead className="border-b bg-gray-300 px-4 py-2 text-left">
            <tr className='border-b'>
              {theadTable.map(th => (
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  key={th.slug}
                >
                {th.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-gray-50'>
            {books?.map((book, index) => (
            <>
            <tr className="border-b bg-gray-50" key={book.id}>
              <td className="px-6 text-sm font-medium text-gray-900 text-center truncate" title={book.title}>
                {book.title}
              </td>
              <td className="px-6 text-sm font-medium text-gray-900 text-center truncate" title={book.author}>
                {book.author}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                {book.date}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                {book.page}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                {book.category?.name}
              </td>
              
              <th scope="col" className="flex justify-around  gap-2 text-sm font-medium text-gray-900 px-6 py-4 text-center bg-gray-50">
              {user && <>
                <ButtonBase textButton='View' bgColor='bg-blue-500' 
                  onClick={() => router.push(`/edit/${book.id}`)} icon={<Edit className='ml-3'/>}
                />
                <ButtonBase textButton='Delete' bgColor='bg-red-500'
                  onClick={() => {setIsShow(true); setId(book.id)}} icon={<Delete className='ml-3'/>}
                />
              </>
              }
              </th>
            </tr>
            </>
            ))
            }
          </tbody>
        </table>
      </div>
      <ModalConfirm visible={isShow} onClose={()=> setIsShow(false)} handle={() => handleDelete(id)} title='xóa sách' />
      <ModalConfirm visible={isShowLogout} onClose={()=> setIsShowLogout(false)} handle={() => hangleLogout()} title='đăng xuất' />
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await api.readBooks()

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      books: res.data
    }, // will be passed to the page component as props
  }
}