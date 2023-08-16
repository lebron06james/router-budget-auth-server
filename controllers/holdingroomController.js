const HoldingRoom = require('../models/holdingroomModel')
const mongoose = require('mongoose')

// get all holdingrooms
const getHoldingRooms = async (req, res) => {

  const holdingrooms = await HoldingRoom.find({}).sort({createdAt: -1})

  res.status(200).json(holdingrooms)
}

// get a single holdingroom
const getHoldingRoom = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such holdingroom'})
  }

  const holdingroom = await HoldingRoom.findById(id)

  if (!holdingroom) {
    return res.status(404).json({error: 'No such holdingroom'})
  }
  
  res.status(200).json(holdingroom)
}


// create new holdingroom
const createHoldingRoom = async (req, res) => {
  const { name } = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const holdingroom = await HoldingRoom.create({name, updatedby: user_id})
    res.status(200).json(holdingroom)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a holdingroom
const deleteHoldingRoom = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such holdingroom'})
  }

  const holdingroom = await HoldingRoom.findOneAndDelete({_id: id})

  if (!holdingroom) {
    return res.status(400).json({error: 'No such holdingroom'})
  }

  res.status(200).json(holdingroom)
}

// update a holdingroom
const updateHoldingRoom = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such holdingroom'})
  }

  const holdingroom = await HoldingRoom.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!holdingroom) {
    return res.status(400).json({error: 'No such holdingroom'})
  }

  res.status(200).json(holdingroom)
}


module.exports = {
  getHoldingRooms,
  getHoldingRoom,
  createHoldingRoom,
  deleteHoldingRoom,
  updateHoldingRoom
}