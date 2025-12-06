
const express = require('express');
const { sendTextMessage, sendTemplateMessage } = require('./index');
const { saveMessage, getChatHistory } = require('./actions/messageSave');


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.set('trust proxy', 1);


const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;


  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});


app.post('/', async (req, res) => {
 const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
    res.status(200).end(); 

    const body = req.body;
    const isMessage = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (isMessage) {
        const messageObject = body.entry[0].changes[0].value.messages[0];
        const senderPhone = messageObject.from;
        const messageText = messageObject.text?.body || "Media/Not Text";
        const userName = body.entry[0].changes[0].value.contacts[0].profile.name;
        const  whatsappId = body.entry[0].id
      const res=await saveMessage(whatsappId,senderPhone, 'user', messageText, userName,)
        console.log(`📩 Received from ${senderPhone}: ${messageText}`);
        if (senderPhone) {
            const res=await sendTextMessage(senderPhone, "I received your message!",whatsappId);
const resai=await saveMessage(whatsappId,senderPhone, 'assistant', res, userName,)
        }
    } else {
        console.log("⚠️ No message found in the webhook payload.");
    }
    // console.log('first', first)
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});

