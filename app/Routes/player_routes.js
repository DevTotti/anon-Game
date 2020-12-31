const playerController = require('../Controllers/player_controller');
const express = require('express');

const router = express.Router();


router.get('/:id', playerController.getGames);
router.post('/:id', playerController.gameResponse);


module.exports = router;