'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdOutlineClose } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

interface MobileNavbarTypes {
    viewMobileNav: boolean
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const MobileNavbar = ({ viewMobileNav, onClick }: MobileNavbarTypes) => {
  return (
    <nav className={`mobileNavbar ${viewMobileNav ? 'show' : ''} transition-all duration-200 w-full h-full fixed top-0 left-full bg-white py-3 px-10 `}>
        <div className='text-right'>
            <button onClick={onClick}><MdOutlineClose className='text-primary text-4xl' /></button>
        </div>
        <header className='flex justify-center'>
            <Image className='' src={'/logo.png'} alt='Pixel Perfector Logo' width={220} height={50} />
        </header>
        <ul className='flex w-full mt-24 items-center flex-col'>
            <li className='my-3'><Link className='text-3xl text-primary' href={'/'}>Home</Link></li>
            <li className='my-3'><Link className='text-3xl text-primary' href={'/analyze'}>Analyze</Link></li>
            <li className='my-3'><Link className='text-3xl text-primary' href={'/tokens'}>Tokens</Link></li>
            <li className='my-3'><Link className='text-3xl text-primary' href={'/register'}>Register</Link></li>
            <li className='my-3'><Link className='text-3xl text-primary' href={'/login'}>Login</Link></li>
        </ul>
        <Link target={'_blank'} className='absolute bottom-5 left-1/2 -translate-x-1/2	' href={'https://twitter.com/PixelPerfectors'}>
            <FaXTwitter className='text-primary text-4xl' />
        </Link>
    </nav>
  )
}

export default MobileNavbar