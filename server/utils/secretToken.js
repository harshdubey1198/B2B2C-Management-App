const jwt = require('jsonwebtoken');

const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: '3d', // Token validity
    });
}

module.exports = createSecretToken;
