const jwt = require('jsonwebtoken');

const createSecretToken = (user) => {
    return jwt.sign({ id: user._id , role: user.role}, process.env.TOKEN_KEY, {
        expiresIn: '1d', // Token validity and jwt expiry
    });
}

module.exports = createSecretToken;
