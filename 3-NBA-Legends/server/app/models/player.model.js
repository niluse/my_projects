"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:./nbalegendsdb.sqlite3");

const Player = sequelize.define("legends", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Statistics = sequelize.define("statistics", {
  points: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rebounds: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  assists: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  allStar: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  playerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Player,
      key: "id",
    },
  },
});

//* Defineing the Relation
Player.hasOne(Statistics, {
  foreignKey: "playerId",
  onDelete: "CASCADE",
});
Statistics.belongsTo(Player, {
  foreignKey: "playerId",
});

//* Syncronization:
sequelize.sync(); // CREATE TABLE
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP

sequelize
  .authenticate()
  .then(() => console.log("* DB Connected *"))
  .catch(() => console.log("* DB NOT Connected *"));

// sequelize.sync({ force: true })  // force: true, varolan tabloları silip yeniden oluşturur
//     .then(() => console.log('*DB Synced'))
//     .catch(() => console.log('*DB Sync Error'));

module.exports = { Product, Rating };
