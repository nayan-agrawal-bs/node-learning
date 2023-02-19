const teamModel = require("../models/Team.js");

const getAllTeams = async (req, res) => {
  try {
    const team = await teamModel.find();
    res.status(200).json(team);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getspecTeam = async (req, res) => {
  const id = req.params.id;
  try {
    const team = await teamModel.findOne({ id: id });
    res.status(200).json(team);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createTeam = async (req, res) => {
  console.log(req.body);
  const newteam = new teamModel({
    id: req.body.id,
    team_name: req.body.team_name,
  });
  try {
    await newteam.save();
    res.status(201).json(newteam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTeam = async (req, res) => {
  const id = req.params.id;
  try {
    await teamModel.findOneAndUpdate(
      {
        id: id,
      },
      {
        team_name: req.body.team_name,
      }
    );
    res.status(202).json({ id: id });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const id = req.params.id;

  try {
    await teamModel.findOneAndRemove({ id: id });
    res.status(203).json({ id: id });
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

module.exports.getAllTeams = getAllTeams;
module.exports.getspecTeam = getspecTeam;
module.exports.createTeam = createTeam;
module.exports.updateTeam = updateTeam;
module.exports.deleteTeam = deleteTeam;
