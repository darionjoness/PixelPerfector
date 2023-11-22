'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const RegisterPage = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getLabelClasses = (isFocused: any, hasValue: any) => 
    `absolute left-2 transition-all duration-300 text-white ${isFocused || hasValue ? 'top-3 text-xs' : 'top-1/2 transform -translate-y-1/2'}`;

  const inputClass = "pt-4 pb-2 px-2 border border-gray-300 rounded w-full relative bg-transparent text-white outline-white my-2";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Register')
  }

  return (
    <section className='px-24'>
      <div className='container'>
        <h1 className='text-secondary text-3xl text-center mt-12 mb-6'>Welcome to PixelPerfector</h1>
        <div className='bg-primary p-5 px-16'>
          <h1 className='text-center text-white text-xl py-3 my-3'>Create an account</h1>
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
    </section>
  );
}

export default RegisterPage;
