const express = require('express')
const {
  createSourceRecipe,
  getSourceRecipes,
  getSourceRecipesByRecipeGroupId,
  getSourceRecipe,
  deleteSourceRecipe,
  updateSourceRecipe
} = require('../controllers/sourcerecipeController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all sourcerecipe routes
router.use(requireAuth)

// GET all sourcerecipegroups
router.get('/', getSourceRecipes)

//FILTER sourcerecipe by recipegroupId
router.get('/filter/:id', getSourceRecipesByRecipeGroupId)

//GET a single sourcerecipe
router.get('/:id', getSourceRecipe)

// POST a new sourcerecipe
router.post('/', createSourceRecipe)

// DELETE a sourcerecipe
router.delete('/:id', deleteSourceRecipe)

// UPDATE a sourcerecipe
router.patch('/:id', updateSourceRecipe)


module.exports = router