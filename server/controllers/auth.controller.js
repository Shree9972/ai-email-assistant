const {getGoogleAuthURL , getGoogleUser} = require('../services/google.service');

const getGoogleAuth = (req, res) => {
    
    const url = getGoogleAuthURL();
    
    res.redirect(url);
}

const googleCallback = async (req, res) => {

    try {

        const { code } = req.query;

        console.log("Authorization code:", code);

        const profile = await getGoogleUser(code);

        res.status(200).json({
            success: true,
            profile,
        });

    } 
    catch (error) 
    {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    getGoogleAuth,
    googleCallback,
};