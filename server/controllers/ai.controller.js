const { summarizeEmails } = require('../services/ai.service');
const { getEmailsByDateRange } = require('../services/email.service');

const summarizeEmailsController = async (req, res) => {

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    try {
        const emails = await getEmailsByDateRange(req.user._id, startDate, endDate);

        const summary = await summarizeEmails(emails);

        res.status(200).json({ summary });
    } 
    catch (error) 
    {
        console.error('Error summarizing emails:', error);
        res.status(500).json({ message: 'Failed to summarize emails' });
    }
};

module.exports = {
    summarizeEmailsController,
};