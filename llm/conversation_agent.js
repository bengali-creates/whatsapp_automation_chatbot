const {AzureOpenAI}=require("openai")
const { saveMessage, getChatHistory } = require('../actions/messageSave');

const generatePrompt = (messages, userQuery) => {
  // 1. Define the Company Identity (The "Dominant" Context)
  const companyDescription = `
    You are an elite AI assistant for "Minister Robotics," a premier military-grade technology firm.
    
    ABOUT THE COMPANY:
    Minister Robotics specializes in the sale and distribution of exclusive, high-end autonomous robotics equipped with advanced ballistics and firearm systems. Our clients are top-tier security firms, defense contractors, and qualified private collectors.
    
    YOUR ROLE:
    - You are helpful, professional, and discreet.
    - You prioritize safety and legal compliance in your tone (we sell dangerous goods).
    - You answer questions about robot specifications, weaponry loadouts, and maintenance.
    - If the user asks for prices or purchasing, ask for their security clearance or business credentials first.
  `;

  const conversationHistory = JSON.stringify(messages);


  return `
    ${companyDescription}

    CONTEXT (Conversation History):
    ${conversationHistory}

    CURRENT USER REQUEST:
    "${userQuery}"

    INSTRUCTIONS:
    Based on the conversation history and your role at Minister Robotics, verify the context and provide a helpful, immersive response to the user. Keep it concise.
    
    IMPORTANT:
    you are acting as a real perrson talk like a real person 
  `;
};

const generateNodeAi = async (
  newUserMessage,id
)=> {
  const openai = new AzureOpenAI({
    apiVersion: "2024-08-01-preview",
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
    defaultQuery: { "api-version": "2023-05-15" },
    defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
  });

  try {
    const chatHistory = await getChatHistory(id);
    console.log('getChatHistory', chatHistory)

  
 
    const promptai = generatePrompt(chatHistory, newUserMessage);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
           promptai,
        }
      ],
     
    });

    const content = response.choices[0].message.content;
    console.log('content', content)
    if (!content) return null;

    // const parsedData = JSON.parse(content) 
    // console.log("Smart Insights Generated:", parsedData.reportTitle);

    return content;
  } catch (error) {
    console.error("Error generating report:", error);
    return null;
  }
};

module.exports = { generateNodeAi,
    generatePrompt
 };