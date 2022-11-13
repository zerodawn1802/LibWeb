import React from 'react'
import ButtonBase from './ButtonBase'
import { X } from 'react-feather';

const ModalConfirm = ({ visible, onClose, handle, title }) => {
  if (!visible) return null

  return (
    <div className="flex flex-col items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm inset-0 fixed outline-none">
      <div className='flex flex-col bg-white rounded-b-md'>
        <div className='flex justify-between items-center p-4'>
          <h5 className="text-xl font-medium leading-normal text-red-600">Xác nhận</h5>
          <X className='hover:scale-125 cursor-pointer'
            onClick={onClose}
          />    
        </div>
        <div class="modal-body relative px-6 py-4">
          {`Bạn có chắc chắn muốn ${title} không?`}
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 gap-3">
          <ButtonBase textButton='Xác nhận' bgColor='bg-red-500' 
            onClick={handle}
            />
          <ButtonBase textButton='Hủy' bgColor='bg-green-500' 
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm