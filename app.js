const express = require('express')
const logger = require('morgan') 
const indexRouter = require(`./routes/indexRouter`)
const gameRouter = require(`./routes/gameRouter`)

const port = 3000

const app = express()              
app.use(logger('dev'))   
app.use(express.json()) 
app.use('/', indexRouter) 
app.use('/api/game', gameRouter)


app.listen(port, ()=>{                        
    console.log(`Server Started on port ${port}.`)
})