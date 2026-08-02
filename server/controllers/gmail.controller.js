const { getMessages } = require("../services/gmail.service");

const getUserMessages = async (req, res) => {

    try {

        const accessToken = req.user.googleAuth.accessToken;

        const messages = await getMessages(accessToken);

        return res.status(200).json({
            success: true,
            messages,
        });

    } catch (error) {

        console.error("Error fetching Gmail messages:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    getUserMessages,
};