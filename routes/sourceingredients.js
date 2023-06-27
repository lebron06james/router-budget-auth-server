const express = require('express')
const {
  createSourceIngredient,
  getSourceIngredients,
  getSourceIngredientsByRecipeId,
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

//FILTER sourceingredient by recipeId
router.get('/filter/:id', getSourceIngredientsByRecipeId)

//GET a single sourceingredient
router.get('/:id', getSourceIngredient)

// POST a new sourceingredient
router.post('/', createSourceIngredient)

// DELETE a sourceingredient
router.delete('/:id', deleteSourceIngredient)

// UPDATE a sourceingredient
router.patch('/:id', updateSourceIngredient)


module.exports = router