'use client';
import React, { useEffect } from 'react'

const AnalyzePage =  () => {

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/api/users/profile')
        
                const data = await res.json()

                console.log(data)
            } catch (error:any) {
                console.log(error.message)
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