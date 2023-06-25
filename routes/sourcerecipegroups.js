const express = require('express')
const {
  createSourceRecipeGroup,
  getSourceRecipeGroups,
  getSourceRecipeGroup,
  deleteSourceRecipeGroup,
  updateSourceRecipeGroup
} = require('../controllers/sourcerecipegroupController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all sourcerecipegroup routes
router.use(requireAuth)

// GET all sourcerecipegroups
router.get('/', getSourceRecipeGroups)

//GET a single sourcerecipegroup
router.get('/:id', getSourceRecipeGroup)

// POST a new sourcerecipegroup
router.post('/', createSourceRecipeGroup)

// DELETE a sourcerecipegroup
router.delete('/:id', deleteSourceRecipeGroup)

// UPDATE a sourcerecipegroup
router.patch('/:id', updateSourceRecipeGroup)


module.exports = router