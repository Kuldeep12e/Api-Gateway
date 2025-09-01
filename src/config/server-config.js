const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
    BOOKINGS_SERVICE_URL: process.env.BOOKINGS_SERVICE_URL
}