'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
  // Focus states
  const [nameFocused, setNameFocused] = useState<boolean>(false)
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState<boolean>(false);

  // Input field states
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // setup useRouter hook
  const router = useRouter()

  const getLabelClasses = (isFocused: any, hasValue: any) => 
    `absolute left-2 transition-all duration-300 text-white ${isFocused || hasValue ? 'top-3 text-xs' : 'top-1/2 transform -translate-y-1/2'}`;

  const inputClass = "pt-4 pb-2 px-2 border border-gray-300 rounded w-full relative bg-transparent text-white outline-white my-2";

  // Email test regex
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password format regex
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default submit
    e.preventDefault()

    if(!name){
      toast.error('Please type in a name')
      return
    }

    // Check if email is empty
    if(!email){
      toast.error('Please type in a email')
      return 
    }

    // Check if email is in a valid format
    if(!re.test(email)){
      toast.error('Please type in a valid email')
      return 
    }

    if(!password){
      toast.error('Please type in a password')
      return
    }

    if(!regex.test(password)){
      toast.error('Password should have one lowercase letter, one uppercase letter, one number and one special character ')
      return
    }

    // Check if passwords match
    if(password !== confirmPassword){
      toast.error('Your passwords do not match!')
      return
    }

    try {
      // Send post request
      const res = await fetch('api/api/users/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
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
        setConfirmPassword('')

        // Redirect user
        router.push('/analyze')

        // check if status is 400
      }else if(res.status === 400){
        toast.error('User already exists with that email')
      }
    } catch (err:any) {
      // Send toast error
      toast.error(err?.data?.message || err.error)
    }
    
  }

  return (
    <section className='registerPage px-24'>
      <div className='container'>
        <h1 className='text-secondary text-3xl text-center mt-6 mb-6'>Welcome to PixelPerfector</h1>
        <div className='formDiv bg-primary p-5 px-16'>
          <h1 className='text-center text-white text-xl py-3 my-3'>Create an account</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="relative mb-4">
              <label 
                htmlFor="name" 
                className={getLabelClasses(nameFocused, name)}
              >
                Name
              </label>
              <input 
                type="name" 
                id="name"
                className={inputClass}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="relative mb-4">
              <label 
                htmlFor="confirmPassword" 
                className={getLabelClasses(confirmPasswordFocused, confirmPassword)}
              >
                Confirm Password
              </label>
              <input 
                type="password" 
                id="confirmPassword"
                className={inputClass}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <p className='text-white'>Already have an account? Login <Link className='underline' href={'/login'}>Here</Link></p>
            <div className='text-center my-5'>
                <button className='bg-white text-primary py-1 px-5 active:scale-95' type='submit'>Register</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer toastStyle={{ backgroundColor: '#004D99', color: '#fff' }} />
    </section>
  );
}

export default RegisterPage;
