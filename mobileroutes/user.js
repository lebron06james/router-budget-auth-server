const express = require('express')

// controller functions
const { loginUser } = require('../controllers/mobileUserController')

const router = express.Router()

// login route
router.post('/login', loginUser)

module.exports = router

// orig
// const express = require('express')

// // controller functions
// const { loginUser, signupUser } = require('../controllers/mobileUserController')

// const router = express.Router()

// // login route
// router.post('/login', loginUser)

// // signup route
// router.post('/signup', signupUser)

// module.exports = router