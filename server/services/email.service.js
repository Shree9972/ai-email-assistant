

const getUserEmails = async (userId, page = 1, limit = 20) => {

    const skip = (page - 1) * limit;

    const totalEmails = await Email.countDocuments({
        user: userId,
    });

    const totalPages = Math.ceil(totalEmails / limit);

    const emails = await Email.find({ userId })
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

module.exports = {
  getUserEmails,
};