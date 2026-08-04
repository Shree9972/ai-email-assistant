const { getUserEmails , getEmailById } = require('../services/email.service');

const getUserEmailsController = async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const options = {
        page,
        limit,
        label: req.query.label,
        sender: req.query.sender,
        search : req.query.search,
    };

    if (req.query.hasAttachments !== undefined) {
        options.hasAttachments = req.query.hasAttachments === "true";
    }


    try {

        const userId = req.user._id;

        const data = await getUserEmails( req.user._id, options);

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


const getEmailByIdController = async (req, res) => {

    const emailId = req.params.id;

    try {

        const userId = req.user._id;
        const email = await getEmailById(userId, emailId);

        if (!email) {
            return res.status(404).json({
                success: false,
                message: "Email not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: email,
        });
    }
    catch (error)
    {
        console.error("Error fetching email by ID:", error);    

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


module.exports = {
    getUserEmailsController,
    getEmailByIdController,
};