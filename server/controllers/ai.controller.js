const { summarizeEmails , extractTasks , extractReplies , extractDashboard , generateDashboardAnalysis} = require('../services/ai.service');
const { getEmailsByDateRange } = require('../services/email.service');

const summarizeEmailsController = async (req, res) => {

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    try {
        const emails = await getEmailsByDateRange(req.user._id, startDate, endDate);

        const summary = await summarizeEmails(emails);

        res.status(200).json(summary);
    } 
    catch (error) 
    {
        console.error('Error summarizing emails:', error);
        res.status(500).json({ message: 'Failed to summarize emails' });
    }
};


const extractTasksController = async (req, res) => {

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    try {
        const emails = await getEmailsByDateRange(req.user._id, startDate, endDate);

        const tasks = await extractTasks(emails);

        res.status(200).json(tasks);
    }
    catch (error)
    {
        console.error('Error extracting tasks:', error);
        res.status(500).json({ message: 'Failed to extract tasks' });
    }

}

const extractRepliesController = async (req, res) => {

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    try {
        const emails = await getEmailsByDateRange(req.user._id, startDate, endDate);

        const replies = await extractReplies(emails);

        res.status(200).json(replies);
    }
    catch (error)
    {
        console.error('Error extracting replies:', error);
        res.status(500).json({ message: 'Failed to extract replies' });
    }
};


const extractDashboardController = async (req, res) => {

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    try
    {
        const emails = await getEmailsByDateRange(req.user._id, startDate, endDate);

        const dashboard = await extractDashboard(emails);

        res.status(200).json(dashboard);
    }
    catch (error)
    {
        console.error('Error building dashboard prompt:', error);
        res.status(500).json({ message: 'Failed to build dashboard prompt' });
    }
};

const generateDashboardAnalysisController = async (req, res) => {

    try
    {

        const analysis = await generateDashboardAnalysis(req.user._id); 

        res.status(200).json(analysis);
    }
    catch (error)
    {
        console.error('Error generating dashboard analysis:', error);
        res.status(500).json({ message: 'Failed to generate dashboard analysis' });
    }
};

module.exports = {
    summarizeEmailsController,
    extractTasksController,
    extractRepliesController,
    extractDashboardController,
    generateDashboardAnalysisController,
};