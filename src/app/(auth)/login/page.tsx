import LoginForm from '@/components/auth/LoginForm'
import React, { Suspense } from 'react'

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm/>
    </Suspense>
  )
}

export default Page
