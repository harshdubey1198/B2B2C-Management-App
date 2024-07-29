const CryptoJS = require("crypto-js");

let service = {};
service.passwordEncryption = passwordEncryption;
service.passwordDecryption = passwordDecryption;

function passwordEncryption(password) {
    const encryptedData = CryptoJS.AES.encrypt(password, process.env.PASSWORD_ALGORITHM).toString();
    return encryptedData;
}

function passwordDecryption(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.PASSWORD_ALGORITHM);
    const password = bytes.toString(CryptoJS.enc.Utf8);
    return password;
}

module.exports = service;