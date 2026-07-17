const {getGoogleAuthURL} = require('../services/google.service');

const getGoogleAuth = (req, res) => {
    
    const url = getGoogleAuthURL();
    
    res.redirect(url);
}

module.exports = {
    getGoogleAuth,
};