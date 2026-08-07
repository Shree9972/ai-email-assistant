const {prepareEmailsForAI } = require('../utils/aiFormatter');
const { generateText } = require('../providers/gemini.provider');
const {buildSummaryPrompt} = require('../prompts/summary.prompt');
const {buildTaskPrompt} = require('../prompts/task.prompt');
const {buildReplyRequiredPrompt} = require('../prompts/reply.prompt');
const {buildDashboardPrompt} = require('../prompts/dashboard.prompt');
const {AIAnalysis} = require('../models/aiAnalysis.model');
const { getEmailsByDateRange } = require('../services/email.service');


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


const extractReplies = async (emails) => {

    const formattedEmails = await prepareEmailsForAI(emails);

    const prompt = await buildReplyRequiredPrompt(formattedEmails);

    const text = await generateText(prompt);

    const parsed = JSON.parse(text);

    return parsed;

};

const saveTodayAnalysis = async (userId, analysis) => {

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const savedAnalysis = await AIAnalysis.create({
        user: userId,
        analysisDate: startOfToday,
        ...analysis
    });

    return savedAnalysis;
}


const extractDashboard = async (emails) => {

    const formattedEmails = await prepareEmailsForAI(emails);

    const prompt = await buildDashboardPrompt(formattedEmails);

    const aiResponse = await generateText(prompt);

    const parsed = JSON.parse(aiResponse);

    return parsed;
};


const getTodayAnalysis = async (userId) => {

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const emails = await AIAnalysis.findOne({
        user: userId, 
        analysisDate: startOfToday,
    }).lean();

    return emails;

};

const generateDashboardAnalysis = async (userId) => {

    const todaysAnalysis = await getTodayAnalysis(userId);

    if(todaysAnalysis)
    {
        return todaysAnalysis;
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();  
    endOfToday.setHours(23, 59, 59, 999);

    const emails = await getEmailsByDateRange(userId, startOfToday, endOfToday);

    const formattedEmails = await prepareEmailsForAI(emails);

    const dashboardPrompt = await buildDashboardPrompt(formattedEmails);

    const dashboardResponse = await generateText(dashboardPrompt);

    const parsedDashboard = JSON.parse(dashboardResponse);

    const savedAnalysis = await saveTodayAnalysis(userId, parsedDashboard);

    return savedAnalysis;

};


module.exports = {
    summarizeEmails,
    extractTasks,
    extractReplies,
    extractDashboard,
    generateDashboardAnalysis,
};