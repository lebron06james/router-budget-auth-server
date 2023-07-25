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
const requireChef = require('../middleware/requireChef')
const checkIsAuthAndAddTimestamp = require('../middleware/requireSession')

const router = express.Router()

// require auth for all routes
router.use(checkIsAuthAndAddTimestamp)

// GET all sourcerecipegroups
router.get('/', requireAuth, (req, res) => {
  getSourceRecipes(req, res)
})

//FILTER sourcerecipe by recipegroupId
router.get('/filter/:id', requireAuth, (req, res) => {
  getSourceRecipesByRecipeGroupId(req, res)
})

//GET a single sourcerecipe
router.get('/:id', requireAuth, (req, res) => {
  getSourceRecipe(req, res)
})

// POST a new sourcerecipe
router.post('/', requireChef, (req, res) => {
  createSourceRecipe(req, res)
})

// DELETE a sourcerecipe
router.delete('/:id', requireChef, (req, res) => {
  deleteSourceRecipe(req, res)
})

// UPDATE a sourcerecipe
router.patch('/:id', requireChef, (req, res) => {
  updateSourceRecipe(req, res)
})

module.exports = router