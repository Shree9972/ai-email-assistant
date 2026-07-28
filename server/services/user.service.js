const User = require('../models/user.model');

const findOrCreateUser = async (profile) => {

    try {

        let existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) 
        {
            newUser = await User.create({
                googleId: profile.id,
                name: profile.name,
                email: profile.email,
                profilePicture: profile.picture
            });

            return newUser;
        }

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