const Email = require("../models/email.model");

const getUserEmails = async (userId, options) => {

    const { page, limit, label } = options;

    const skip = (page - 1) * limit;

    const query = {
        user: userId,
    };

    if (label) 
    {
        query.labels = label;
    }

    if(options.hasAttachments)
    {
        query.hasAttachments = options.hasAttachments;
    }
    else if(options.hasAttachments === false)
    {
        query.hasAttachments = false;
    }

    if(options.search) 
    {
        query.$or = [
            { subject: { $regex: options.search, $options: 'i' } },
            { body: { $regex: options.search, $options: 'i' } },
            { snippet: { $regex: options.search, $options: 'i' } },
        ];
    }

    if(options.sender) 
    {
        query.sender = {
            $regex: options.sender,
            $options: 'i',
        };
    }

    const totalEmails = await Email.countDocuments(
        query
    );

    const totalPages = Math.ceil(totalEmails / limit);

    const emails = await Email.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    
    return {
        
        emails,
        
        pagination: {

            page,
            limit,
            totalEmails,
            totalPages,

            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,

        },
    };

}


//get single email by id
const getEmailById = async (userId, emailId) => {

    const email = await Email.findOne({ _id: emailId, user: userId });

    return email;
};

const getDashboardStats = async (userId) => {

    const totalEmails = await Email.countDocuments({ user: userId });

    const unreadEmails = await Email.countDocuments({ user: userId, labels: "UNREAD" });

    const emailsWithAttachments = await Email.countDocuments({ user: userId, hasAttachments: true });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const emailsReceivedToday = await Email.countDocuments({ user: userId, createdAt: { $gte: startOfToday } });

    return {
        totalEmails,
        unreadEmails,
        emailsWithAttachments,
        emailsReceivedToday,
    };
    
}

const getEmailsByDateRange = async (userId, startDate, endDate) => {

    const emails = await Email.find({
        user: userId,
        createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ createdAt: -1 });

    return emails;

};

module.exports = {
    getUserEmails,
    getEmailById,
    getEmailsByDateRange,
    getDashboardStats,
};