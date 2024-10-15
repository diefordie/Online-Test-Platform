'use client'; 

import React from 'react'
// import LandingPage from '@/app/landingpage/landingpage'
// import GuestDashboard from '@/app/guestDashboard/page'
import UserDashboard from '@/app/user/dashboard/page'
import authorAgreement from '@/app/authorAgreement/page'
import Pembayaran from '@/app/pembayaran/page'

const page = () => {
  return (
    <div>
      {/* <LandingPage /> */}
      {/* <GuestDashboard /> */}
      {/* <UserDashboard /> */}
      {/* <authorAgreement /> */}
      <Pembayaran/>
    </div>
  )
}

export default page
