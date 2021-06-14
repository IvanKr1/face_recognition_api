const Sequelize = require('sequelize');
require('dotenv').config()

module.exports = new Sequelize(
	{
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		host: process.env.DB_HOST,
		dialect: "postgres",
		password: process.env.DB_PASS
	})

