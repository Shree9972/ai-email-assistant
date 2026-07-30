const {getGoogleAuthURL , getGoogleUser} = require('../services/google.service');

const {findOrCreateUser} = require('../services/user.service');

const {generateToken} = require('../services/jwt.service');

const getGoogleAuth = (req, res) => {
    
    const url = getGoogleAuthURL();
    
    res.redirect(url);
}

const googleCallback = async (req, res) => {

    try {

        const { code } = req.query;

        //console.log("Authorization code:", code);

        const profile = await getGoogleUser(code);

        const user = await findOrCreateUser(profile);

        const token = generateToken(user);

        console.log("Generated JWT token:", token);

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            user,
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