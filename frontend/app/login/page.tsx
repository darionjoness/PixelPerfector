'use client';
import React, {useState} from 'react'
import Link from 'next/link';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';


const LoginPage = () => {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Setup router hook
    const router = useRouter()
  
    const getLabelClasses = (isFocused: any, hasValue: any) => 
      `absolute left-2 transition-all duration-300 text-white ${isFocused || hasValue ? 'top-3 text-xs' : 'top-1/2 transform -translate-y-1/2'}`;
  
    const inputClass = "pt-4 pb-2 px-2 border border-gray-300 rounded w-full relative bg-transparent text-white outline-white my-2";
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Check if email is empty
      if(!email){
        toast.error('Please type in a email')
        return 
      }

      if(!password){
        toast.error('Please type in a password')
        return
      }
  
      try {
        // Send post request
        const res = await fetch('/api/api/users/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        })
    
        // Check if response is successful
        if(res.ok){
          const data = await res.json()
  
  
          // Set local storage to new user
          localStorage.setItem('user', JSON.stringify(data))

          setEmail('')
          setPassword('')
  
          // Redirect user
          router.push('/analyze')
  
          // check if status is 400
        }else if(res.status === 401){
          toast.error('Invalid email or password')
        }
      } catch (err:any) {
        // Send toast error
        toast.error(err?.data?.message || err.error)
      }
    }
  
    return (
      <section className='loginPage px-24'>
        <div className='container'>
          <h1 className='text-secondary text-3xl text-center mt-12 mb-6'>Welcome Back</h1>
          <div className='formDiv bg-primary p-5 px-16'>
            <h1 className='text-center text-white text-xl py-3 my-3'>Login to your account</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="relative mb-4">
                <label 
                  htmlFor="email" 
                  className={getLabelClasses(emailFocused, email)}
                >
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  className={inputClass}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative mb-4">
                <label 
                  htmlFor="password" 
                  className={getLabelClasses(passwordFocused, password)}
                >
                  Password
                </label>
                <input 
                  type="password" 
                  id="password"
                  className={inputClass}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className='text-white'>Don't have an account? Register <Link className='underline' href={'/register'}>Here</Link></p>
              <div className='text-center my-5'>
                  <button className='bg-white text-primary py-1 px-5 active:scale-95' type='submit'>Login</button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer toastStyle={{ backgroundColor: '#004D99', color: '#fff' }} />
      </section>
  )
}

export default LoginPage