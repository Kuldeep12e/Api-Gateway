const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config/server-config');

async function checkPassword(plainPassword, encryptedPassword) {
      return bcrypt.compare(plainPassword, encryptedPassword);
 }

  function createToken(input) {
        try {
            const token = jwt.sign(input, SECRET_KEY, { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw error;
        }
 }

 function verifyToken(token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (error) {
            throw error;
        }
 }

module.exports = {
    checkPassword,
    createToken,
    verifyToken
}