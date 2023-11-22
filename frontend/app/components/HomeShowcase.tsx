import React from 'react'
import Image from 'next/image'

const HomeShowcase = () => {
  return (
    <section>
        <div className='homeShowcaseItems container'>
            <h1 className='text-4xl mt-16 text-primary'>Revolutionize Your Websites with AI-Powered Insights</h1>
            <div className='showcaseGrid grid grid-cols-2 mt-12'>
                <div className='gridText'>
                    <p className='text-secondary leading-10'>Enhance your website effectively with our AI analysis. Simply upload an image of your webpage and receive targeted, actionable feedback to improve its design, user experience, and overall performance, ensuring a standout and engaging online presence.</p>
                    <button className='bg-primary text-white py-2 px-5 mt-10'>Analyze My Profile</button>
                </div>
                <div className='gridImgDiv w-full h-full'>
                    <Image className='gridImg' src={'/aibot.svg'} alt='Person communicating with a robot' width={600} height={400} />
                </div>
            </div>
        </div>
    </section>
  )
}

export default HomeShowcase