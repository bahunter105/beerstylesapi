// Turn the server on
require('dotenv').config()

const express = require("express");
const req = require('express/lib/request');
const app = express()
const mongoose = require("mongoose")

mongoose.connect( process.env.DB_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
// db.once('open', () => console.log("Connected to Database"))


// middleware
app.use(express.json())

// routes
const beerstylesRouter = require('./routes/beerstyles')

app.use('/beerstyles', beerstylesRouter) // ie for the routes of localhost:3000/beerstyles

const port = process.env.PORT || 3000;

app.listen(port, console.log('server on!'))

// define beer style
const Beerstyle = require('./models/beerstyle')


// open csv
const csvFilePath='seedbeerstyles.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj);
    console.log("seeding...")
    jsonObj.forEach( async style => {
      const beerstyle = await new Beerstyle({
      styleGroup: style.styleGroup,
      styleOrigin: style.styleOrigin,
      category: style.category,
      subCategory: style.subCategory,
      perceivedMaltAromaAndFlavor: style.perceivedMaltAromaAndFlavor,
      perceivedHopAromaAndFlavor: style.perceivedHopAromaAndFlavor,
      perceivedBitterness: style.perceivedBitterness,
      body: style.body,
      originalGravityPlato: style.originalGravityPlato.replace(/['"]+/g, ''),
      finalGravityPlato: style.finalGravityPlato.replace(/['"]+/g, ''),
      alcoholByVolume: style.alcoholByVolume.replace(/['"]+/g, ''),
      bitternessIbu: style.bitternessIbu.replace(/['"]+/g, ''), // get rid of double quotes in my excel
      colorSrm: style.colorSrm.replace(/['"]+/g, ''),
      colorEbc: style.colorEbc.replace(/['"]+/g, ''),
      fermentationCharacteristics: style.fermentationCharacteristics,
      additionalNotes: style.additionalNotes
    })

    try {
      const newBeerstyles = await beerstyle.save()
      console.log('beer added')
    } catch (error) {
      // res.status(400).json({message: error.message}) //  400 shows that there is an issue on the client side
      console.error(error)
      // res.status(400).json({message: error.message}) //  400 shows that there is an issue on the client side
    }
  });
  console.log('done seeding')
})
