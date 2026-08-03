const Email = require("../models/email.model");
const { getMessages, getMessage } = require("./gmail.service");
const { parseGmailMessage } = require("../utils/gmailParser");

const syncEmails = async (user) => {

    let res = [];

    try
    {
        const accessToken = user.googleAuth.accessToken;

        const messages = await getMessages(accessToken);

        for (const message of messages)
        {
            
            const existingEmail = await Email.findOne({ user: user._id, gmailId: message.id });

            if (existingEmail)
            {
                continue; // Skip if the email already exists in the database
            }

            const emailData = await getMessage(accessToken, message.id);

            const parsedEmail = parseGmailMessage(emailData);

            const newEmail = new Email({
                    user: user._id,
                    ...parsedEmail,
                });
            
                await newEmail.save();
                res.push(newEmail);

        }

        return res;

    }
    catch (error)
    {
        console.error("Error syncing emails:", error);
        throw error;
    }

};