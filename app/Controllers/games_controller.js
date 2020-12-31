const MainGameModel = require('../Models/main_game');
const SubGameModel = require('../Models/games');
const shortid = require('shortid');
const mongoose = require('mongoose');





function checkID(){
    var id;
    var done = '';

    while(done === ''){
        id = shortid.generate();
        console.log(id);
        MainGameModel.findOne({_id: id})
            .then((result) => {
                if (!result){
                    done = ''
                }
                else {
                    done = 'done'
                }
            })
            .catch((err) => {
                console.log(err);
                done = 'done'
            });

    return id;
}
}


// tested, works well
const createGame = ((req, res) => {
    const creator = req.username;
    const gameId = checkID();
    const newGame = new MainGameModel({
        _id: gameId,
        title: req.body.title,
        creator: creator,
        url: `${req.protocol}://${req.get('host')}/play/${gameId}`
    });
    console.log(newGame);

    newGame.save()
        .then((result) => {
            res.json({
                error: false,
                message: `New game with gameID ${gameId} created`,
                url: `${req.protocol}://${req.get('host')}/play/${gameId}`
            })
        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'Unable to create game',
                response: err
            });
        });
    
});



//tested, perfect
const createSubGame = ((req, res) => {
    const gameId = req.body.id;
    MainGameModel.find({_id: gameId})
        .then((result) => {
            console.log(result);
            if (result.length === 0){
                return res.json({
                    error: true,
                    message: 'Invalid main gameId'
                });
            } else {
                SubGameModel.find({mainGame: gameId}).countDocuments(function (err, count) {
                    console.log(count);
                    if (count < 10) {
                        const subGame = new SubGameModel({
                            _id: new mongoose.Types.ObjectId,
                            mainGame: gameId,
                            game: req.body.game
                        })
                        console.log(subGame);
                        subGame.save()
                            .then((result) => {
                                res.json({
                                    error: false,
                                    message: 'Sub-game created successfully'
                                });
                            })
                            .catch((err) => {
                                res.json({
                                    error: true,
                                    message: 'Error saving sub-game',
                                    response: err
                                });
                            });
                    } else {
                        return res.json({
                            error: true,
                            message: 'Games limit reached',
                            response: 'Maximum game limit of 10 reached'
                        });
                    }
                });
            }

        })
        .catch((err) => {
            res.json({
                error: true,
                message: 'Invalid game ID',
                response: err
            });
        });
});


// tested, perfect
const gameList = ((req, res) => {
    console.log(req.params);
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




//tested, perfect
const mainGameList = ((req, res) => {
    console.log(req.username);
    const username =  req.username;
    MainGameModel.find({creator: username})
        .then((games) => {
            res.json({
                error: false,
                message: `All main games created by ${username} fetched!`,
                games: games
            });
        })
        .catch((err) => {
            res.json({
                error: true,
                message: `Error fetching games created by ${username}`,
                response: err
            });
        });

});






module.exports = {
    createGame,
    createSubGame,
    gameList,
    mainGameList
}
