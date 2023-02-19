const PlayerModel = require("../models/Player.js");

const getAllPlayers = async (req, res) => {
  try {
    const player = await PlayerModel.find();
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getspecPlayer = async (req, res) => {
  const id = req.params.id;
  try {
    const player = await PlayerModel.findOne({ id: id });
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPlayer = async (req, res) => {
  console.log(req.body);
  const newPlayer = new PlayerModel({
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    runs: req.body.runs,
    iplTeam: req.body.iplTeam,
    wickets: req.body.wickets,
    matchPlayed: req.body.matchPlayed,
    strikeRate: req.body.runs / req.body.matchPlayed,
  });
  try {
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePlayer = async (req, res) => {
  const id = req.params.id;
  try {
    await PlayerModel.findOneAndUpdate(
      {
        id: id,
      },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        runs: req.body.runs,
        iplTeam: req.body.iplTeam,
        wickets: req.body.wickets,
        matchPlayed: req.body.matchPlayed,
        strikeRate: req.body.runs / req.body.matchPlayed,
      }
    );
    res.status(202).json({ id: id });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deletePlayer = async (req, res) => {
  const id = req.params.id;

  try {
    await PlayerModel.findOneAndRemove({ id: id });
    res.status(203).json({ id: id });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

const getPurpleCap = async (req, res) => {
  try {
    const player = await PlayerModel.find().sort({ runs: -1 }).limit(1);
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOrangeCap = async (req, res) => {
  try {
    const player = await PlayerModel.find().sort({ wickets: -1 }).limit(1);
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getAllPlayers = getAllPlayers;
module.exports.getspecPlayer = getspecPlayer;
module.exports.createPlayer = createPlayer;
module.exports.updatePlayer = updatePlayer;
module.exports.deletePlayer = deletePlayer;
module.exports.getPurpleCap = getPurpleCap;
module.exports.getOrangeCap = getOrangeCap;
