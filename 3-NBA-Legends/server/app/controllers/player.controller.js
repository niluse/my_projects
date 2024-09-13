const { Player, Statistics, sequelize } = require("../models/player.model.js");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await Player.findAndCountAll({ include: Statistics });

      const plainData = data.rows.map((item) => item.get({ plain: true }));

      res.status(200).send({
        error: false,
        result: {
          count: data.count,
          rows: plainData,
        },
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  create: async (req, res) => {
    const { statistics, ...playerData } = req.body;
    try {
      const player = await Player.create(playerData);

      await Statistics.create({
        points: statistics.points,
        rebounds: statistics.rebounds,
        assists: statistics.assists,
        allStar: statistics.allStar,
        playerId: player.id,
      });

      res.status(201).send({
        error: false,
        result: player.dataValues,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  read: async (req, res) => {
    try {
      const data = await Player.findByPk(req.params.id, {
        include: Statistics,
      });

      res.status(200).send({
        error: false,
        result: data,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { name, img } = req.body;

      const player = await Player.findByPk(req.params.id);

      await player.update({ name, img });
      let playerStatistics = await Statistics.findOne({
        where: { playerId: player.id },
      });

      if (playerStatistics) {
        await playerStatistics.update({
          points: statistics.points,
          rebounds: statistics.rebounds,
          assists: statistics.assists,
          allStar: statistics.allStar,
          playerId: player.id,
        });
      } else {
        await Statistics.create({
          points: statistics.points,
          rebounds: statistics.rebounds,
          assists: statistics.assists,
          allStar: statistics.allStar,
          playerId: player.id,
        });
      }

      res.status(202).send({
        error: false,
        message: "Updated",
        body: req.body, // data that we sent
        result: data,
        new: await Player.findByPk(req.params.id), // updated data
      });
    } catch (error) {
      res.status(400).send({ error: true, message: error.message });
    }
  },

  delete: async (req, res) => {
    const data = await Player.destroy({ where: { id: req.params.id } });

    if (data > 0) {
      res.status(204).send({ error: false, message: "Deleted" });
    } else {
      res.errorStatusCode = 404;
      throw new Error("Not Found");
    }
  },
};
