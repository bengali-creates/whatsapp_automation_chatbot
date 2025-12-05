require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

async function sendTemplateMessage() {
        const response = await axios({
        url: 'https://graph.facebook.com/v20.0/phone_number_id/messages',
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

async function sendTextMessage(phone_number,text) {
    const response = await axios({
        url: 'https://graph.facebook.com/v22.0/892378397293995/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.VERIFY_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phone_number,
            type: 'text',
            text:{
                body: `hi human u said ${text} .Dammmmmnnn this is crazy`
            }
        })
    })

    console.log(response.data) 
}
sendTextMessage()

async function webHookTextMessage() {
    const response= fetch

}

module.exports = {
    sendTextMessage,
    sendTemplateMessage
}