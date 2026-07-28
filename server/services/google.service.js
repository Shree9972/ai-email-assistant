const {google} = require('googleapis');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI} = require('../config/env');

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

const getGoogleAuthURL = () => {

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            "openid",
            "profile",
            "email"
        ]
    });

    return url;
}   

const getGoogleUser = async (code) => {

    const {tokens} = await oauth2Client.getToken(code);

    //console.log("Tokens:", tokens);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    }); 

    const {data} = await oauth2.userinfo.get();

    //console.log("User profile data:", data);

    return data;
}


module.exports = {
    oauth2Client,
    getGoogleAuthURL,
    getGoogleUser,
};