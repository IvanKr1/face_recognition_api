const Sequelize = require('sequelize')
const db = require('../config/database')

const User = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(150)
      },
      email: {
          type: Sequelize.TEXT,
          unique: true,
          allowNull: false
      },
      entries: {
          type: Sequelize.BIGINT,
          defaultValue: 0
      },
      joined: {
          type: Sequelize.DATE,
          allowNull: false
      }
  }, {
    timestamps: false
  })
}

module.exports = User(db, Sequelize.DataTypes);