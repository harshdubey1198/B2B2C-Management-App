const jwt = require('jsonwebtoken');

const createSecretToken = (id) => {
    console.log(id)
    console.log(process.env.TOKEN_KEY)
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: '3d', // Token validity
    });
}

module.exports = createSecretToken;
