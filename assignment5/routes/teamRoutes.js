const express = require("express");

const teamAction = require("../controllers/TeamController.js");

const router = express.Router();

router.get("/", teamAction.getAllTeams);
router.get("/:id", teamAction.getspecTeam);
router.post("/", teamAction.createTeam);
router.patch("/:id", teamAction.updateTeam);
router.delete("/:id", teamAction.deleteTeam);

module.exports = router;
