const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4


let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
    ]

    router.get(`/get-all-games`, (req, res)=>{
        res.json({payload: games})
    })

    router.get('/get-game-by-id/:id', (req, res)=>{
        const { id } = req.params
        const game = games.find(game => game.id === id)
        if (game) {
            res.json({message: 'Game found.', payload: game})
        }else{
            res.json({message: "The game with the id does not exist, please check id"})
        }
    })

    router.get(`/get-game-by-id/:id`, (req, res)=>{
        const { id } = req.params
        const gameItem = games.find((game)=> game.id === id)
        if (!gameItem) {
            return res.json({message:'The game with the id does not exist, please check id'})
        }
        res.json({message: "Game found", payload: gameItem })
    })
    
    router.post('/create-new-game', (req, res) => {
        const game = req.body.description
        const description = req.body.description
        if(game === undefined || description === undefined){
            res.json({message: "cannot leave text area blank"})
        }else if(games.find(element => element.game === game)){
            res.json({message:"Game already exists, cannot add game"})
        }else{
            const newGame = {
                id: uuidv4(),
                game: req.body.game,
                description: req.body.description
            }
            games.push(newGame)
            res.json({message:"Game added.", payload: games})
        }
    })
    
    
    // const {game, description} = req.body   //destructuring
    // // if(game || description)
    // if(game === undefined || description === undefined || games.find(element => element.game === game))
    //     res.json({game, description})

    router.put('/update-game/:id', function (req, res) {
        const id = req.params.id
        const { game, description } = req.body
        const gameUpdate = games.find(gameElement => gameElement.id === id)
        if (!gameUpdate) {
            return res.json({message: "Game not found, cannot update"})
        }else if (game !== undefined && game !== ""){
            gameUpdate.game = game
        }else (description !== undefined && description !== ""){
            gameUpdate.description = description
            res.json({message: "Game updated successfully", payload: gameUpdate})
        }
    })

    router.delete('/delete-game/:id', function (req, res) {
        const id = req.params.id
        const gameToDelete = games.find(game => game.id === id)
        if (!gameToDelete) {
            res.json({message: "Game not found, cannot delete"})
        }else{
            games = games.filter(game => game.id !== id)
            res.json({message: "Game deleted successfully"})
        }
    })

    router.get('/get-game-by-name/:name', (req, res) => {
        const gameName = req.params.name
        const filteredGames = games.filter(game => game.game === gameName)
        if (filteredGames.length === 0) {
            res.json({message: "The game does not exist, please check name"})
        }else{
            res.json({message: "Game found", payload: filteredGames[0]})
        }
    })

    
module.exports = router