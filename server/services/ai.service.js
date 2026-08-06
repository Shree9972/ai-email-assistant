const {prepareEmailsForAI } = require('../utils/aiFormatter');
const { generateText } = require('../providers/gemini.provider');
const {buildSummaryPrompt} = require('../prompts/summary.prompt');
const {buildTaskPrompt} = require('../prompts/task.prompt');


const summarizeEmails = async (emails) => {


    const formattedEmails = await prepareEmailsForAI(emails);

    const prompt = await buildSummaryPrompt(formattedEmails);

    const aiResponse = await generateText(prompt);
    
    return {
        summary: aiResponse
    }

};


const extractTasks = async (emails) => {

    const formattedEmails = await prepareEmailsForAI(emails);

    

    const prompt = await buildTaskPrompt(formattedEmails);

    

    //console.log(prompt);

    const text = await generateText(prompt);

    const parsed = JSON.parse(text);

    return parsed;

};

module.exports = {
    summarizeEmails,
    extractTasks,
};