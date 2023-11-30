import React from 'react'
import Link from 'next/link';
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";



const Footer = () => {
  return (
    <footer className='pt-20'>
        <div className='footerDiv mb-4'>
            <div className='flex items-center justify-end border-b px-10 text-sm'>
                <h3 className='mr-3 py-3 text-secondary'>Contact Us</h3>
                <div className='flex items-center'>
                    <FaSquareXTwitter className='text-secondary text-xl mx-1' />
                    <FaSquareFacebook className='text-secondary text-xl mx-1' />
                </div>
            </div>
            <div className='px-10 py-2 flex justify-between items-center text-sm'>
                <Link className='text-secondary' href={'/privacypolicy'}>Privacy Policy</Link>
                <div className='flex items-center text-secondary'>
                    <i className='mr-2'><IoMdMail /></i>
                    <a href="mailto:pixelperfectorstudio@gmail.com">
                        pixelperfectorstudio@gmail
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer