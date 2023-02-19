const express = require("express");

const playerAction = require("../controllers/PlayerController.js");

const router = express.Router();

router.get("/", playerAction.getAllPlayers);
router.get("/purple", playerAction.getPurpleCap);
router.get("/orange", playerAction.getOrangeCap);
router.get("/:id", playerAction.getspecPlayer);
router.post("/", playerAction.createPlayer);
router.patch("/:id", playerAction.updatePlayer);
router.delete("/:id", playerAction.deletePlayer);

module.exports = router;
