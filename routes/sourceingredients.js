const express = require('express')
const {
  createSourceIngredient,
  getSourceIngredients,
  getSourceIngredientsByRecipeId,
  getSourceIngredientsByRecipeGroupId,
  getSourceIngredient,
  deleteSourceIngredient,
  updateSourceIngredient
} = require('../controllers/sourceingredientController')
const requireAuth = require('../middleware/requireAuth')
const requireChef = require('../middleware/requireChef')
const checkIsAuthAndAddTimestamp = require('../middleware/requireSession')

const router = express.Router()

// require auth for all routes
router.use(checkIsAuthAndAddTimestamp)

// GET all sourcerecipegroups
router.get('/', requireAuth, (req, res) => {
  getSourceIngredients(req, res)
})

//FILTER sourceingredient by recipeId
router.get('/filter/:id', requireAuth, (req, res) => {
  getSourceIngredientsByRecipeId(req, res)
})

//FILTER MORE sourceingredient by recipegroupId
router.get('/groupfilter/:id', requireAuth, (req, res) => {
  getSourceIngredientsByRecipeGroupId(req, res)
})

//GET a single sourceingredient
router.get('/:id', requireAuth, (req, res) => {
  getSourceIngredient(req, res)
})

// POST a new sourceingredient
router.post('/', requireChef, (req, res) => {
  createSourceIngredient(req, res)
})

// DELETE a sourceingredient
router.delete('/:id', requireChef, (req, res) => {
  deleteSourceIngredient(req, res)
})

// UPDATE a sourceingredient
router.patch('/:id', requireChef, (req, res) => {
  updateSourceIngredient(req, res)
})

module.exports = router