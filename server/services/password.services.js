const bcrypt = require('bcrypt');
const saltRounds = 10;

let service = {};
service.passwordHash = passwordHash;
service.comparePassword = comparePassword;

// Hash the password
async function passwordHash(password) {
    try {
        // Hash the password with salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Password hashing failed');
    }
}


// Compare the password with the hash
async function comparePassword(password, hashedPassword) {
    // console.log(password, hashedPassword)
    try {
        // Compare the password with the hashed password
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Password comparison failed');
    }
}

module.exports = service;
