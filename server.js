const express = require("express");
const cors = require("cors");
const passport = require('passport')
const Router = require('./routes/routes')
require('dotenv').config()
require('./config/database')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json());
app.use(passport.initialize())


app.use('/api', Router)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname+'/client/build/index.html'))
    })
}

app.listen( process.env.PORT || 4000, process.env.HOST || '0.0.0.0' ,()=> console.log('Servidor escuchando'))