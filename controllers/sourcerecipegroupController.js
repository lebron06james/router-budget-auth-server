const SourceRecipeGroup = require('../models/sourcerecipegroupModel')
const mongoose = require('mongoose')

// get all sourcerecipegroups
const getSourceRecipeGroups = async (req, res) => {

  const sourcerecipegroups = await SourceRecipeGroup.find({}).sort({createdAt: 1})

  res.status(200).json(sourcerecipegroups)
}

// get a single sourcerecipegroup
const getSourceRecipeGroup = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourcerecipegroup'})
  }

  const sourcerecipegroup = await SourceRecipeGroup.findById(id)

  if (!sourcerecipegroup) {
    return res.status(404).json({error: 'No such sourcerecipegroup'})
  }
  
  res.status(200).json(sourcerecipegroup)
}


// create new sourcerecipegroup
const createSourceRecipeGroup = async (req, res) => {
  const {name, color} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!color) {
    emptyFields.push('color')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const sourcerecipegroup = await SourceRecipeGroup.create({name, color, updatedby: user_id})
    res.status(200).json(sourcerecipegroup)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a sourcerecipegroup
const deleteSourceRecipeGroup = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourcerecipegroup'})
  }

  const sourcerecipegroup = await SourceRecipeGroup.findOneAndDelete({_id: id})

  if (!sourcerecipegroup) {
    return res.status(400).json({error: 'No such sourcerecipegroup'})
  }

  res.status(200).json(sourcerecipegroup)
}

// update a sourcerecipegroup
const updateSourceRecipeGroup = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourcerecipegroup'})
  }

  const sourcerecipegroup = await SourceRecipeGroup.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!sourcerecipegroup) {
    return res.status(400).json({error: 'No such sourcerecipegroup'})
  }

  res.status(200).json(sourcerecipegroup)
}


module.exports = {
  getSourceRecipeGroups,
  getSourceRecipeGroup,
  createSourceRecipeGroup,
  deleteSourceRecipeGroup,
  updateSourceRecipeGroup
}