const SourceRecipe = require('../models/sourcerecipeModel')
const mongoose = require('mongoose')

// get all sourcerecipes
const getSourceRecipes = async (req, res) => {

  const sourcerecipes = await SourceRecipe.find({}).sort({createdAt: -1})

  res.status(200).json(sourcerecipes)
}

// filter sourcerecipes by recipegroupId
const getSourceRecipesByRecipeGroupId = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourcerecipegroup'})
  }
  
  const recipegroupId = id

  const sourcerecipes = await SourceRecipe.find({recipegroupId}).sort({createdAt: -1})

  res.status(200).json(sourcerecipes)
}

// get a single sourcerecipe
const getSourceRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourcerecipe'})
  }

  const sourcerecipe = await SourceRecipe.findById(id)

  if (!sourcerecipe) {
    return res.status(404).json({error: 'No such sourcerecipe'})
  }
  
  res.status(200).json(sourcerecipe)
}


// create new sourcerecipe
const createSourceRecipe = async (req, res) => {
  const {name, amount, serving, instruction, cookingtime, color, recipegroupId, recipegroupName } = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!amount) {
    emptyFields.push('amount')
  }
  if(!serving) {
    emptyFields.push('serving')
  }
  if(!instruction) {
    emptyFields.push('instruction')
  }
  if(!cookingtime) {
    emptyFields.push('cookingtime')
  }
  if(!color) {
    emptyFields.push('color')
  }
  if(!recipegroupId) {
    emptyFields.push('recipegroupId')
  }
  if(!recipegroupName) {
    emptyFields.push('recipegroupName')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const sourcerecipe = await SourceRecipe.create({name, amount, serving, instruction, cookingtime, color, recipegroupId, recipegroupName, createdBy: user_id})
    res.status(200).json(sourcerecipe)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a sourcerecipe
const deleteSourceRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourcerecipe'})
  }

  const sourcerecipe = await SourceRecipe.findOneAndDelete({_id: id})

  if (!sourcerecipe) {
    return res.status(400).json({error: 'No such sourcerecipe'})
  }

  res.status(200).json(sourcerecipe)
}

// update a sourcerecipe
const updateSourceRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourcerecipe'})
  }

  const sourcerecipe = await SourceRecipe.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!sourcerecipe) {
    return res.status(400).json({error: 'No such sourcerecipe'})
  }

  res.status(200).json(sourcerecipe)
}


module.exports = {
  getSourceRecipes,
  getSourceRecipesByRecipeGroupId,
  getSourceRecipe,
  createSourceRecipe,
  deleteSourceRecipe,
  updateSourceRecipe
}