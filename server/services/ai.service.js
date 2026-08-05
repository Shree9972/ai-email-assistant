const {prepareEmailsForAI } = require('../utils/aiFormatter');
const { generateText } = require('../providers/gemini.provider');
const {buildSummaryPrompt} = require('../prompts/summary.prompt');


const summarizeEmails = async (emails) => {


    const formattedEmails = await prepareEmailsForAI(emails);

    const prompt = await buildSummaryPrompt(formattedEmails);

    const aiResponse = await generateText(prompt);
    
    return {
        summary: aiResponse
    }

};

module.exports = {
    summarizeEmails,
};