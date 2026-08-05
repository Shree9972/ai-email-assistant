const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateText = async (prompt) => {

    // Implement the logic to generate text based on the prompt
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return response.text;
};

module.exports = {
    generateText,
};
