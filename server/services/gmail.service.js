const { google } = require("googleapis");

const getMessages = async (accessToken) => {

    const oauth2Client = new google.auth.OAuth2();

    oauth2Client.setCredentials({
        access_token: accessToken,
    });

    const gmail = google.gmail({
        version: "v1",
        auth: oauth2Client,
    });

    const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
    });

    return response.data.messages || [];
};

module.exports = {
    getMessages,
};