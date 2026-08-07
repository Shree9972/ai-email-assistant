const {getDashboardStats} = require('../services/email.service');
const {generateDashboardAnalysis} = require('../services/ai.service');

const getDashboardData = async (userId) => {

    try {

        const [stats, analysis_stats] = await Promise.all([
            getDashboardStats(userId),
            generateDashboardAnalysis(userId)
        ]);

        const analysis = {
            summary: analysis_stats.summary,
            stats: {
                tasks: analysis_stats.tasks.length,
                replyRequired: analysis_stats.replyRequired.length,
            },
            tasks: analysis_stats.tasks,
            replyRequired: analysis_stats.replyRequired,
        };

        return {
            stats,
            analysis,
        };
    } 
    catch (error) 
    {
        console.error('Error fetching dashboard data:', error);
        throw new Error('Failed to fetch dashboard data');
    }

};

module.exports = {
    getDashboardData
};
