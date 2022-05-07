const express = require('express')
const beerstyle = require('../models/beerstyle')
const router = express.Router()
const Beerstyle = require('../models/beerstyle')
//  Get all
router.get('/', async (req, res) => {
  // res.send({message:"Hello World"})
  try {
    const beerstyles = await Beerstyle.find()
    res.send(beerstyles)
  } catch (error) {
    res.status(500).json({message: error.message}) // 500 shows that there is an issue on the server side
  }
})

// Get one
router.get('/:id', getBeerstyle, (req, res) => {
  res.json(res.beerstyle)
})

// Create
router.post('/', async (req, res) => {
  const beerstyle = await new Beerstyle({
    styleGroup: req.body.styleGroup,
    styleOrigin: req.body.styleOrigin,
    category: req.body.category,
    subCategory: req.body.subCategory,
    color: req.body.color,
    clarity: req.body.clarity,
    perceivedMaltAromaAndFlavor: req.body.perceivedMaltAromaAndFlavor,
    perceivedHopAromaAndFlavor: req.body.perceivedHopAromaAndFlavor,
    perceivedBitterness: req.body.perceivedBitterness,
    fermentationCharacteristics: req.body.fermentationCharacteristics,
    body: req.body.body,
    additionalNotes: req.body.additionalNotes,
    originalGravityPlato: req.body.originalGravityPlato,
    apparentExtractFinalGravityPlato: req.body.apparentExtractFinalGravityPlato,
    alcoholByVolume: req.body.alcoholByVolume,
    bitternessIbu: req.body.bitternessIbu,
    colorSrm: req.body.colorSrm,
    colorEbc: req.body.colorEbc
  })

  try {
    const newBeerstyles = await beerstyle.save()
    res.status(201).send(newBeerstyles) // 201 is more specific for creating to a database
  } catch (error) {
    // res.status(400).json({message: error.message}) //  400 shows that there is an issue on the client side
    console.error(error)
    res.status(400).json({message: error.message}) //  400 shows that there is an issue on the client side
  }
})

// Update (using patch instead of instead of put, bc patch will update only info that the user sends, not the whole thing)
router.patch('/:id', getBeerstyle, async (req, res) => {

  // need to refactor

  if(req.body.styleGroup != null){
    res.beerstyle.styleGroup = req.body.styleGroup
  }
  if (req.body.styleOrigin!= null) {
    res.beerstyle.styleOrigin = req.body.styleOrigin
  }
  if (req.body.category != null) {
    res.beerstyle.category = req.body.category
  }
  if (req.body.subCategor != null) {
    res.beerstyle.subCategory = req.body.subCategory
  }
  if (req.body.color != null) {
    res.beerstyle.color = req.body.color
  }
  if (req.body.clarity != null) {
    res.beerstyle.clarity = req.body.clarity
  }
  if (req.body.perceivedMaltAromaAndFlavor != null) {
    res.beerstyle.perceivedMaltAromaAndFlavor = req.body.perceivedMaltAromaAndFlavor
  }
  if (req.body.perceivedHopAromaAndFlavor != null) {
    res.beerstyle.perceivedHopAromaAndFlavor = req.body.perceivedHopAromaAndFlavor
  }
  if (req.body.perceivedBitterness != null) {
    res.beerstyle.perceivedBitterness = req.body.perceivedBitterness
  }
  if (req.body.fermentationCharacteristics != null) {
    res.beerstyle.fermentationCharacteristics = req.body.fermentationCharacteristics
  }
  if (req.body.body != null) {
    res.beerstyle.body = req.body.body
  }
  if (!req.body.additionalNotes != null) {
    res.beerstyle.additionalNotes = req.body.additionalNotes
  }
  if (req.body.originalGravityPlat != null) {
    res.beerstyle.originalGravityPlato = req.body.originalGravityPlato
  }
  if (req.body.apparentExtractFinalGravityPlato != null) {
    res.beerstyle.apparentExtractFinalGravityPlato = req.body.apparentExtractFinalGravityPlato
  }
  if (req.body.alcoholByVolume != null) {
    res.beerstyle.alcoholByVolume = req.body.alcoholByVolume
  }
  if (req.body.bitternessIbu != null) {
    res.beerstyle.bitternessIbu = req.body.bitternessIbu
  }
  if (req.body.colorSr != null) {
    res.beerstyle.colorSrm = req.body.colorSrm
  }
  if (req.body.colorEbc != null) {
    res.beerstyle.colorEbc = req.body.colorEbc
  }

  try {
    const updatedBeerstyle = await res.beerstyle.save()
    res.json(updatedBeerstyle)
  } catch (error) {
    res.status(400).json({message: error.message})
  }

})

// Delete one
router.delete('/:id', getBeerstyle, async (req, res) => {
  try {
    await res.beerstyle.remove()
    res.json({message: "beerstyle removed"})
  } catch (error) {
    res.status(500).json({message: error.message}) // 500 shows that there is an issue on the server side
  }
})


// middleware
async function getBeerstyle (req, res, next) {
  let beerstyle
  try {
    beerstyle = await Beerstyle.findById(req.params.id)
    if (!beerstyle) {
      return res.status(404).json({message: "cannot find what you're looking for"})  // 404 is for when you cant find anything
    }
  } catch (error) {
    res.status(500).json({message: error.message}) // 500 shows that there is an issue on the server side
  }

  res.beerstyle = beerstyle
  next()
}


module.exports = router
