require('dotenv').config()

const express = require("express");
const req = require('express/lib/request');
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require("mongoose")

mongoose.connect( process.env.DB_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))


// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// routes
const beerstylesRouter = require('./routes/beerstyles')

app.use('/beerstyles', beerstylesRouter) // ie for the routes of localhost:3000/beerstyles

const port = process.env.PORT || 3000;

app.listen(port, console.log('server on!'))
