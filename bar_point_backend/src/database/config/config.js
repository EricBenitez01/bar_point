require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
<<<<<<< HEAD
    password: 'root',
=======
    password: process.env.DB_PASSWORD,
>>>>>>> 12e17715170f25c237f23cd568c2b52587a89422
    database: process.env.DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};