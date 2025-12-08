require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const{generateNodeAi}=require('./llm/conversation_agent')

async function sendTemplateMessage() {
        const response = await axios({
        url: ' https://graph.facebook.com/v22.0/893308493870482/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.VERIFY_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: 'phone_number',
            type: 'template',
            template:{
                name: 'discount',
                language: {
                    code: 'en_US'
                },
                components: [
                    {
                        type: 'header',
                        parameters: [
                            {
                                type: 'text',
                                text: 'John Doe'
                            }
                        ]
                    },
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: '50'
                            }
                        ]
                    }
                ]
            }
        })
    })

    console.log(response.data)
}

async function sendTextMessage(phone_number,text,id) {
    console.log(process.env.WHATSAPP_TOKEN)
    const airesponse= await generateNodeAi(text,id);
    const response = await axios({
        url: ' https://graph.facebook.com/v22.0/893308493870482/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phone_number,
            type: 'text',
            text:{
                // body: `hi human u said ${text} .Dammmmmnnn this is crazy`
                body: airesponse
            }
        })
    })

    console.log(response.data) 
    return airesponse;
}

async function sendMediaMessage() {
    const response = await axios({
        url: ' https://graph.facebook.com/v22.0/893308493870482/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '916290700659',
            type: 'image',
            image:{
                link: 'https://dummyimage.com/600x400/000/fff.png&text=manfra.io',
                caption: 'This is a media message'
            }
        })
    })

    console.log(response.data)    
}
async function sendAudioMessage() {
    const response = await axios({
        url: ' https://graph.facebook.com/v22.0/893308493870482/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '916290700659',
            type: 'image',
            image:{
                link: 'https://dummyimage.com/600x400/000/fff.png&text=manfra.io',
                caption: 'This is a media message'
            }
        })
    })

    console.log(response.data)    
}

// sendMediaMessage()
// async function webHookTextMessage() {
//     const response= fetch

// }

module.exports = {
    sendTextMessage,
    sendTemplateMessage
}