'use client';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const AnalyzePage =  () => {

    const router = useRouter()

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/api/users/profile')

                if(!res.ok){
                    if(res.status === 401){
                        localStorage.removeItem('user')
                        router.push('/login')
                    }
                }
        
                const data = await res.json()

                console.log(data)
            } catch (error:any) {
                console.log(error)
            }
        }

        fetchProfile()

    }, [])

  return (
    <div>
        <h1>text</h1>
    </div>
  )
}

export default AnalyzePage