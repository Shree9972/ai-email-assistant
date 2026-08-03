const { getUserEmails } = require('../services/email.service');

const getUserEmailsController = async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;


    try {

        const userId = req.user._id;

        const data = await getUserEmails( req.user._id, page, limit );

        return res.status(200).json({
            success: true,
            data,
        });

    }
    catch (error) 
    {
        console.error("Error fetching user emails:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

module.exports = {
    getUserEmailsController,
};