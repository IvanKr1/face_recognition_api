const Sequelize = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcrypt");

const User = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(150),
      },
      email: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
      },
      entries: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      joined: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: (user, options) => {
          {
            user.password =
              user.password && user.password != ""
                ? bcrypt.hashSync(user.password, 10)
                : "";
          }
        },
      },
    }
  );
};

module.exports = User(db, Sequelize.DataTypes);
