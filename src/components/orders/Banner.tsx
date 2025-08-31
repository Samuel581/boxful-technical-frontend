"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Banner() {
  const pathname = usePathname()
  const [bannerMessage, setBannerMessage] = useState("")

  useEffect(() => {
    if (pathname.includes("/create-order")) {
      setBannerMessage("Crear orden");
    } else if (pathname.includes("/history")) {
      setBannerMessage("Mis envios");
    }
  }, [pathname]);
  return (
    <div className='w-full h-full flex items-center'>
      <div className='flex flex-row justify-between w-full px-5'>
        <b>{bannerMessage}</b>
        <b>Tu nombre</b>
      </div>
    </div>
  )
}

export default Banner