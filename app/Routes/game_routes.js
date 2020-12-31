const gameController = require('../Controllers/games_controller');
const express = require('express');
const checkAuth = require('../Middlewares/check-auth');

const router = express.Router();

router.post('/create', checkAuth, gameController.createGame);
router.post('/sub', checkAuth, gameController.createSubGame);
router.post('/:id',checkAuth, gameController.gameList);
router.post('/main/get', checkAuth, gameController.mainGameList);

module.exports = router;