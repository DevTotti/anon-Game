const GameResponse = require('../Models/game_response');
const SubGameModel = require('../Models/games');
const mongoose = require('mongoose');



//tested, perfect
const getGames = ((req, res) => {
    const gameId =  req.params.id;
    SubGameModel.find({mainGame: gameId})
        .then((games) => {
            res.json({
                error: false,
                message: `All games registered with gameID ${gameId} fetched!`,
                games: games
            });
        })
        .catch((err) => {
            res.json({
                error: true,
                message: `Error fetching games registered under gameId ${gameId}`,
                response: err
            });
        });
});



// tested, perfect
const gameResponse = ((req, res) => {
    const subGameId = req.params.id;
    const username = req.body.nick;
    const response = req.body.response;

    SubGameModel.findOne({_id: subGameId})
        .then((game) => {
            if (!game){
                return res.json({
                    error: true,
                    message: 'Invalid sub-game ID'
                });
            } else {
                console.log(game);
                const Response = new GameResponse({
                    subGameId: subGameId,
                    username: username,
                    response: response
                });
                console.log(Response);
                Response.save()
                    .then((result) => {
                        res.json({
                            error: false,
                            message: 'Response for game saved, thank you!',
                            response: result
                        });
                    })
                    .catch((err) => {
                        res.json({
                            error: true,
                            message: 'Response not saved!',
                            error: err
                        });
                    });
            }

        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'Invalid game',
                response: err
            });
        });
   
});


module.exports = {
    getGames,
    gameResponse
}