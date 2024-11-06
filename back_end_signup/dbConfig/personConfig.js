require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST,        // Host for the database
    USER: process.env.DB_USERNAME,    // Database username (change from NAME to USER)
    PASSWORD: process.env.DB_PASSWORD, // Database password
    DB: process.env.DB_NAME,           // Database name (change from USERNAME to NAME)
    dialect: process.env.DB_DIALECT,   // Database dialect
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,               // Consider adjusting this value as needed
        idle: 10000
    }
    
};
