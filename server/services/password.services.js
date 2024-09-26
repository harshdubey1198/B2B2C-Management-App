const bcrypt = require('bcrypt');
const saltRounds = 10; // Define salt rounds

let service = {};
service.passwordHash = passwordHash;
service.comparePassword = comparePassword;

// Hash the password
async function passwordHash(password) {
    try {
        if (!password) {
            throw new Error('Password is required for hashing');
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Password hashing failed');
    }
}

// Compare the password with the hash
async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error comparing password:', error);
        throw new Error('Password comparison failed');
    }
}

module.exports = service;
