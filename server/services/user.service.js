const User = require('../models/user.model');

const findOrCreateUser = async (profile , tokens) => {

    try {

        let existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) 
        {
            const newUser = await User.create({
                googleId: profile.id,
                name: profile.name,
                email: profile.email,
                profilePicture: profile.picture,

                googleAuth: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                    expiryDate: tokens.expiry_date,
                },

            });

            return newUser;
        }

        existingUser.googleAuth.accessToken = tokens.access_token;

        if (tokens.refresh_token) {
            existingUser.googleAuth.refreshToken = tokens.refresh_token;
        }

        existingUser.googleAuth.expiryDate = new Date(tokens.expiry_date);

        await existingUser.save();

        return existingUser;

    } 
    catch (error) 
    {
        console.error("Error finding or creating user:", error);
        throw error;
    }
};

module.exports = {
    findOrCreateUser
};