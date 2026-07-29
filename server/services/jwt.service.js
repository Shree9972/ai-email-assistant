const jwt = require('jsonwebtoken');

const generateToken = (user) => {

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '10h',
    });

    return token;

};

module.exports = {
    generateToken,
};