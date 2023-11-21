'use client';
import React, {useState} from 'react'
import Navbar from './Navbar'
import { FaBars } from 'react-icons/fa'

const Navbars = () => {
    const [viewMobileNav, setViewMobileNav] = useState<boolean>(false)

  return (
    <div>
        <Navbar onClick={() => setViewMobileNav(true)} />
    </div>
  )
}

export default Navbars