const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sourcerecipegroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  updatedby: {
    type: String,
    required: true
  }
}, { timestamps: true })

// just if you want to change the names of timestamps
// timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

module.exports = mongoose.model('SourceRecipeGroup', sourcerecipegroupSchema)