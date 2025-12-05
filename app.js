
const express = require('express');
const { sendTextMessage, sendTemplateMessage } = require('./index');


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


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

        console.log(`📩 Received from ${senderPhone}: ${messageText}`);
        if (senderPhone) {
            await sendTextMessage(senderPhone, "I received your message!");
        }
    } else {
    
    }
    console.log('first', first)
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});

