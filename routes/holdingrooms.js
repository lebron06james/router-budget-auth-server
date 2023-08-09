const express = require('express')
const {
  createHoldingRoom,
  getHoldingRooms,
  getHoldingRoom,
  deleteHoldingRoom,
  updateHoldingRoom
} = require('../controllers/holdingroomController')
const requireAuth = require('../middleware/requireAuth')
const requireSosec = require('../middleware/requireSosec')
const checkIsAuthAndAddTimestamp = require('../middleware/requireSession')

const router = express.Router()

// require auth for all routes
router.use(checkIsAuthAndAddTimestamp)

// GET all holdingrooms
router.get('/', requireAuth, (req, res) => {
  getHoldingRooms(req, res)
})

//GET a single holdingroom
router.get('/:id', requireAuth, (req, res) => {
  getHoldingRoom(req, res)
})

// POST a new holdingroom
router.post('/', requireSosec, (req, res) => {
  createHoldingRoom(req, res)
})

// DELETE a holdingroom
router.delete('/:id', requireSosec, (req, res) => {
  deleteHoldingRoom(req, res)
})

// UPDATE a holdingroom
router.patch('/:id', requireSosec, (req, res) => {
  updateHoldingRoom(req, res)
})

module.exports = router