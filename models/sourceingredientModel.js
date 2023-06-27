const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sourceingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  recipeId: {
    type: String,
    required: true
  },
  recipeName: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('SourceIngredient', sourceingredientSchema)