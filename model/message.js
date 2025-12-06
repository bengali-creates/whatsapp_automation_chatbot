const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    whatsappId: { type: String, required: true, index: true }, 
    name: { type: String },
    whatsappnumber: { type: String },
    
    role: { 
        type: String, 
        required: true, 
        enum: ['user', 'assistant', 'system'] 
    },
    
    content: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.models.Message || mongoose.model("Message", MessageSchema);


const data={
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "3344370225711318",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15551953115",
              "phone_number_id": "892378397293995"
            },
            "contacts": [
              {
                "profile": {
                  "name": "menma"
                },
                "wa_id": "919929902867"
              }
            ],
            "messages": [
              {
                "from": "919929902867",
                "id": "wamid.HBgMOTE5OTI5OTAyODY3FQIAEhggQUM5NzM2NUNCNTZCMkI3OTJBRkI0QjZDNEYzMThDQUYA",
                "timestamp": "1765023292",
                "text": {
                  "body": "what is sentinel x"
                },
                "type": "text"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}