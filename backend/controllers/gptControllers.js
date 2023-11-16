import asyncHandler from 'express-async-handler'
import OpenAI from 'openai';


// @desc    Register user
// @route   POST /api/ai/createresponse
// @access  Private
const getGptResponse = asyncHandler(async (req, res) => {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })
    // Get base64 from body
    const { base64Image} = req.body

    // Check if there is a base64 image
    if(!base64Image){
        // Send 400 error
        res.status(400)

        // Throw new error
        throw new Error('Please provide a image')
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        max_tokens: 4096,
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: 'Can you analyze my web design and give me feedback on anything I can improve!' },
                    {
                        type: 'image_url',
                        image_url: {
                            "url": base64Image
                        }
                    }
                ]
            }
        ]

    })

    if(response){
        res.status(200).json({ message: response.choices[0] })
    }else{
        res.status(500)

        throw new Error('Failed to get a response, please try again')
    }
    
})

export {
    getGptResponse
}

