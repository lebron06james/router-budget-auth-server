const express = require('express')
const {
  createVenue,
  getVenues,
  getVenue,
  deleteVenue,
  updateVenue
} = require('../controllers/venueController')
const requireAuth = require('../middleware/requireAuth')
const requireSosec = require('../middleware/requireSosec')
const checkIsAuthAndAddTimestamp = require('../middleware/requireSession')

const router = express.Router()

// require auth for all routes
router.use(checkIsAuthAndAddTimestamp)

// GET all venues
router.get('/', requireAuth, (req, res) => {
  getVenues(req, res)
})

//GET a single venue
router.get('/:id', requireAuth, (req, res) => {
  getVenue(req, res)
})

// POST a new venue
router.post('/', requireSosec, (req, res) => {
  createVenue(req, res)
})

// DELETE a venue
router.delete('/:id', requireSosec, (req, res) => {
  deleteVenue(req, res)
})

// UPDATE a venue
router.patch('/:id', requireSosec, (req, res) => {
  updateVenue(req, res)
})

module.exports = router