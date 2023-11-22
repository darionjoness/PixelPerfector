'use client';
import React, {useState} from 'react'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar';

const Navbars = () => {
    const [viewMobileNav, setViewMobileNav] = useState<boolean>(false)

  return (
    <>
        <Navbar onClick={() => setViewMobileNav(true)} />
        <MobileNavbar viewMobileNav={viewMobileNav} onClick={() => setViewMobileNav(false)} />
    </>
  )
}

export default Navbars