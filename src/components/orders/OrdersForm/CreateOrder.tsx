import React from 'react'
import NewOrderForm from './NewOrderForm'

function CreateOrder() {
  return (
    <div className='flex flex-col gap-6'>
        <p className='font-bold text-2xl'>Crea una orden</p>
        <p>Dale una ventaja competitiva a tu negocio con entregas <b>el mismo día</b> (Área Metropolitana) y <b>el día siguiente</b> a nivel nacional.</p>
        <NewOrderForm/>
    </div>
  )
}

export default CreateOrder