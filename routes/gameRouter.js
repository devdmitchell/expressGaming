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
         }})
    
    
    // const {game, description} = req.body   //destructuring
    // // if(game || description)
    // if(game === undefined || description === undefined || games.find(element => element.game === game))
    //     res.json({game, description})

    
module.exports = router