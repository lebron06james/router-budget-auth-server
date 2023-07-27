const express = require('express')
const {
  createSourceRecipeGroup,
  getSourceRecipeGroups,
  getSourceRecipeGroup,
  deleteSourceRecipeGroup,
  updateSourceRecipeGroup
} = require('../controllers/sourcerecipegroupController')
const requireAuth = require('../middleware/requireAuth')
const requireChef = require('../middleware/requireChef')

const router = express.Router()

// require auth for all sourcerecipegroup routes
// router.use(requireAuth)

// GET all sourcerecipegroups
router.get('/', requireAuth, (req, res) => {
  getSourceRecipeGroups(req, res)
})

//GET a single sourcerecipegroup
router.get('/:id', requireAuth, (req, res) => {
  getSourceRecipeGroup(req, res)
})

// POST a new sourcerecipegroup
router.post('/', requireChef, (req, res) => {
  createSourceRecipeGroup(req, res)
})

// DELETE a sourcerecipegroup
router.delete('/:id', requireChef, (req, res) => {
  deleteSourceRecipeGroup(req, res)
})

// UPDATE a sourcerecipegroup
router.patch('/:id', requireChef, (req, res) => {
  updateSourceRecipeGroup(req, res)
})


module.exports = router