'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';

const AnalyzePage =  () => {
    const [base64, setBase64] = useState<any>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [aiResponse, setAiResponse] = useState<string>('')
    const [userTokens, setUserTokens] = useState<number>(0)

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

                setUserTokens(data.purchaseTokens)
            } catch (error:any) {
                console.log(error)
            }
        }

        fetchProfile()

    }, [])

    // Create uploadImage functoin
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {

        // Check if the files exist
        if(e.target.files){
            // Grab file
            const file = e.target.files[0]

            // convert to base64
            const base64 = await convertBase64(file)

            // Set base64 state
            setBase64(base64)
        }

    }

    // Convert image to base64
    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {

            if(file){
                const fileReader = new FileReader();
                
    
                fileReader.readAsDataURL(file)
    
                fileReader.onload = () => {
                    resolve(fileReader.result)
                }
    
                fileReader.onerror = (error) => {
                    reject(error)
                }
            }


        })
    }

    // Handle form submit
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Check if there is an image
        if(!base64){
            toast.error('Please select an image')
            return
        }

        if(userTokens === 0){
            toast.error('You are out of tokens')
            return
        }

        setIsLoading(true)
        try {
            // POST req to get ai response
            const res = await fetch('/api/api/ai/createresponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    base64Image: base64
                })
            })

            
            // Check if res.ok is not true
            if(!res.ok){
                // If status is 401 remove user from local storage and redirect to login
                if(res.status === 401){
                    localStorage.removeItem('user')
                    router.push('/login')
                }

                // Toast a error
                toast.error('Error, please try again')
             }
             
             //  If res.ok is true
            if(res.ok){
                const data = await res.json()

                setAiResponse(data.message.message.content)

                setIsLoading(false)
            }
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }



        
    }

  return (
    <section>
        <div className='container'>
            <p className='absolute right-10 text-primary top-5'>Tokens: {userTokens}</p>
            <h1 className='text-center text-primary text-xl my-3'>Select an image of your website</h1>
            <form className='analyzeForm my-5 px-5' onSubmit={(e) => handleSubmit(e)}>
                <Image className='my-3' src={'/logo.png'} alt={'PixelPerfector logo'} height={150} width={150} />
                {base64 && <Image className='my-5' src={base64} alt="Image uploaded by user" width={250} height={200} />}
                <input className='my-5' type="file" onChange={(e) => uploadImage(e)} />
                {isLoading && 
                <div>
                    <h3 className='text-secondary text-center'>Loading...</h3>
                    <Image className='my-3' src={'/robot-dance.gif'} alt={'A robot waving his arms and head spinning'} height={100} width={100} /> 
                </div>}
                <div className='px-5'>
                    {aiResponse && aiResponse.split('\n').map((line, index) => (
                        <p className='my-3' key={index}>
                        {line}
                        <br />
                        </p>
                    ))}
                </div>
                <button className='bg-primary text-white py-2 px-5 my-5 shadow-md' type='submit'>Analyze</button>
            </form>
        </div>
        <ToastContainer toastStyle={{ backgroundColor: '#004D99', color: '#fff' }} />
    </section>
  )
}

export default AnalyzePage