'use client';
import Image from "next/image"
import Link from "next/link"
import { MouseEventHandler } from "react";
import { FaBars } from "react-icons/fa";


interface onClickTypes {
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Navbar = ({ onClick }: onClickTypes) => {
  return (
    <nav className="py-5">
        <div className="container flex justify-between">
            <header>
                <Image className="" src={'/logo.png'} alt={'Pixel Perfector Logo'} width={'220'} height='50' />
            </header>
            <div className="navBtns mt-4">
                <Link href={'/register'} className="bg-primary text-white px-5 py-1 mx-2 pointer border-primary border hover:bg-white hover:text-primary transition-all duration-100">Register</Link>
                <Link href={'/login'} className="mx-2 border border-primary px-5 py-1 pointer hover:bg-primary hover:text-white transition-all duration-100">Login</Link>
            </div>
            <button onClick={onClick} className="mobileNavBtn hidden text-primary text-2xl pointer"><FaBars /></button>
        </div>
    </nav>
  )
}

export default Navbar