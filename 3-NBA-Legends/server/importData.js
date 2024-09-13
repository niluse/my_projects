const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./nbalegendsdb.sqlite3",
});

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

async function importData() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const dataPath = path.join(__dirname, "nbaData.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    for (const item of data) {
      const player = await Player.create({
        name: item.name,
        img: item.img,
      });
      await Statistics.create({
        points: item.statistics.points,
        rebounds: item.statistics.rebounds,
        assists: item.statistics.assists,
        allStar: item.statistics.allStar,
        playerId: player.id,
      });
    }
    console.log("Data imported successfully!");
    await sequelize.close();
  } catch (error) {
    console.error("Error importing data:", error);
  }
}

importData();
