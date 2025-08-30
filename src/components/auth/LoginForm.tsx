import React from 'react'
import {Input, Typography, Button} from 'antd'

function LoginForm() {
  return (
    <div className='flex flex-col gap-2 m-10'>
        <p className='text-2xl font-bold'>Bienvenido</p>
        <p className='text-gray-500'>Por favor ingresa tus credenciales</p>
        <div className='mt-10'>
          <Typography className='font-bold'>Correo electronico</Typography>
          <Input placeholder='Digita tu correo' className='w-full'></Input>
        </div>
        <div>
          <Typography className='font-bold'>Contraseña</Typography>
          <Input placeholder='Digita el NIT del comercio'></Input>
        </div>

        <Button type='primary' className='mt-10'>Iniciar sesion</Button>
        <div className='flex flex-row gap-3'>
          <p>Necesitas una cuenta?</p>
          <p className='font-bold'>Registrate aca</p>
        </div>
    </div>
  )
}

export default LoginForm