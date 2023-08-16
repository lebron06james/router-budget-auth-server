const Venue = require('../models/venueModel')
const mongoose = require('mongoose')

// get all venues
const getVenues = async (req, res) => {

  const venues = await Venue.find({}).sort({createdAt: -1})

  res.status(200).json(venues)
}

// get a single venue
const getVenue = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such venue'})
  }

  const venue = await Venue.findById(id)

  if (!venue) {
    return res.status(404).json({error: 'No such venue'})
  }
  
  res.status(200).json(venue)
}


// create new venue
const createVenue = async (req, res) => {
  const { name, color } = req.body

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
    const venue = await Venue.create({name, color, updatedby: user_id})
    res.status(200).json(venue)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a venue
const deleteVenue = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such venue'})
  }

  const venue = await Venue.findOneAndDelete({_id: id})

  if (!venue) {
    return res.status(400).json({error: 'No such venue'})
  }

  res.status(200).json(venue)
}

// update a venue
const updateVenue = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such venue'})
  }

  const venue = await Venue.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!venue) {
    return res.status(400).json({error: 'No such venue'})
  }

  res.status(200).json(venue)
}


module.exports = {
  getVenues,
  getVenue,
  createVenue,
  deleteVenue,
  updateVenue
}