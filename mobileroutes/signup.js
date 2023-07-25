const express = require('express')

// controller functions
const { signupUser } = require('../controllers/mobileUserController')

const requireBron = require('../middleware/mobileRequireBron')

const router = express.Router()

// require auth for user signup route
router.use(requireBron)

// signup route
router.post('/create', signupUser)

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