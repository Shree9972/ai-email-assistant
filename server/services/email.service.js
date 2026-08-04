const Email = require("../models/email.model");

const getUserEmails = async (userId, options) => {

    const { page, limit, label } = options;

    const skip = (page - 1) * limit;

    const query = {
        user: userId,
    };

    if (options.label) {
        query.label = options.label;
    }

    if(options.hasAttachments)
    {
        query.attachments = { $exists: true, $ne: [] };
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

    const totalEmails = await Email.countDocuments({
        query
    });

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

module.exports = {
    getUserEmails,
    getEmailById,
};