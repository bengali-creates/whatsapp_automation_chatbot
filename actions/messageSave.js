const { connectDb } = require('../db/connectedb');
const Message = require('../model/message');

const saveMessage = async (whatsappId,whatsappnumber, role, content, name="user") => {
    try {
        await connectDb();
        const res= await Message.create({
            whatsappId,
            role,
            content,
            name,
            whatsappnumber
        });
        console.log(`Saved ${role} message to DB`);
        return {data:res,status:"success"}
    } catch (error) {
        console.error("Error saving message:", error);
        return{error:error,status:"success"}
    }
}
const getChatHistory = async (whatsappId) => {
     await connectDb();
    const messages = await Message.find({ whatsappId })
        .sort({ createdAt: 1 }) 
        .limit(10); 

    return messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));
};

module.exports = { saveMessage, getChatHistory };