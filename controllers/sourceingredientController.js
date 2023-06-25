const SourceIngredient = require('../models/sourceingredientModel')
const mongoose = require('mongoose')

// get all sourceingredients
const getSourceIngredients = async (req, res) => {
  const sourcerecipe_id = req.query.sourceingredientgroupid

  const sourceingredients = await SourceIngredient.find({sourcerecipe_id}).sort({createdAt: -1})

  res.status(200).json(sourceingredients)
}

// get a single sourceingredient
const getSourceIngredient = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourceingredient'})
  }

  const sourceingredient = await SourceIngredient.findById(id)

  if (!sourceingredient) {
    return res.status(404).json({error: 'No such sourceingredient'})
  }
  
  res.status(200).json(sourceingredient)
}


// create new sourceingredient
const createSourceIngredient = async (req, res) => {
  const {name, unit, price, amount, recipeId } = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!unit) {
    emptyFields.push('unit')
  }
  if(!price) {
    emptyFields.push('price')
  }
  if(!amount) {
    emptyFields.push('amount')
  }
  if(!recipeId) {
    emptyFields.push('recipeId')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const sourceingredient = await SourceIngredient.create({name, unit, price, amount, recipeId, createdBy: user_id})
    res.status(200).json(sourceingredient)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a sourceingredient
const deleteSourceIngredient = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourceingredient'})
  }

  const sourceingredient = await SourceIngredient.findOneAndDelete({_id: id})

  if (!sourceingredient) {
    return res.status(400).json({error: 'No such sourceingredient'})
  }

  res.status(200).json(sourceingredient)
}

// update a sourceingredient
const updateSourceIngredient = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such sourceingredient'})
  }

  const sourceingredient = await SourceIngredient.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!sourceingredient) {
    return res.status(400).json({error: 'No such sourceingredient'})
  }

  res.status(200).json(sourceingredient)
}


module.exports = {
  getSourceIngredients,
  getSourceIngredient,
  createSourceIngredient,
  deleteSourceIngredient,
  updateSourceIngredient
}