const mongoose = require('mongoose')

const beerstyleSchema = new mongoose.Schema({
  styleGroup:{
    type: String,
    required: true
  },
  styleOrigin:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  subCategory:{
    type: String,
    required: true
  },
  perceivedMaltAromaAndFlavor:{
    type: String,
    required: true
  },
  perceivedHopAromaAndFlavor:{
    type: String,
    required: true
  },
  perceivedBitterness:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  originalGravityPlato:{
    type: String,
    required: true
  },
  finalGravityPlato:{
    type: String,
    required: true
  },
  alcoholByVolume:{
    type: String,
    required: true
  },
  bitternessIbu:{
    type: String,
    required: true
  },
  colorSrm:{
    type: String,
    required: true
  },
  colorEbc:{
    type: String,
    required: true
  },
  fermentationCharacteristics:{
    type: String,
    required: false
  },
  additionalNotes:{
    type: String,
    required: false
  },
})

module.exports = mongoose.model('Beerstyle', beerstyleSchema)
