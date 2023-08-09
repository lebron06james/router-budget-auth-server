const express = require('express')
const {
  createSourceComment,
  getSourceComments,
  getSourceCommentsByRecipeGroupId,
  getSourceComment,
  deleteSourceComment,
  updateSourceComment
} = require('../controllers/sourcecommentController')
const requireAuth = require('../middleware/requireAuth')
const checkIsAuthAndAddTimestamp = require('../middleware/requireSession')

const router = express.Router()

// require auth for all routes
router.use(checkIsAuthAndAddTimestamp)

// GET all sourcecommentgroups
router.get('/', requireAuth, (req, res) => {
  getSourceComments(req, res)
})

//FILTER sourcecomment by recipegroupId
router.get('/filter/:id', requireAuth, (req, res) => {
  getSourceCommentsByRecipeGroupId(req, res)
})

//GET a single sourcecomment
router.get('/:id', requireAuth, (req, res) => {
  getSourceComment(req, res)
})

// POST a new sourcecomment
router.post('/', requireAuth, (req, res) => {
  createSourceComment(req, res)
})

// DELETE a sourcecomment
router.delete('/:id', requireAuth, (req, res) => {
  deleteSourceComment(req, res)
})

// UPDATE a sourcecomment
router.patch('/:id', requireAuth, (req, res) => {
  updateSourceComment(req, res)
})

module.exports = router