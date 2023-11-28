'use client';
import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar';

const Navbars = () => {
    const [viewMobileNav, setViewMobileNav] = useState<boolean>(false)

    useEffect(() => {
      if(viewMobileNav){
        document.body.style.overflow = 'hidden'
      }else{
        document.body.style.overflow = 'auto'
      }
    }, [viewMobileNav])

  return (
    <>
        <Navbar onClick={() => setViewMobileNav(true)} />
        <MobileNavbar viewMobileNav={viewMobileNav} onClick={() => setViewMobileNav(false)} />
    </>
  )
}

export default Navbars