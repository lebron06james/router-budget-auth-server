const express = require('express')
const {
  createSourceIngredient,
  getSourceIngredients,
  getSourceIngredient,
  deleteSourceIngredient,
  updateSourceIngredient
} = require('../controllers/sourceingredientController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all sourceingredient routes
router.use(requireAuth)

// GET all sourcerecipegroups
router.get('/', getSourceIngredients)

//GET a single sourceingredient
router.get('/:id', getSourceIngredient)

// POST a new sourceingredient
router.post('/', createSourceIngredient)

// DELETE a sourceingredient
router.delete('/:id', deleteSourceIngredient)

// UPDATE a sourceingredient
router.patch('/:id', updateSourceIngredient)


module.exports = router