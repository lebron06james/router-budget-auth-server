const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sourcerecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // pax
  amount: {
    type: Number,
    required: true
  },
  serving: {
    type: Number,
    required: true
  },
  instruction: {
    type: String,
    required: true
  },
  cookingtime: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  recipegroupId: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('SourceRecipe', sourcerecipeSchema)