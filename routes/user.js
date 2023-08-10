const express = require("express");

// controller functions
const { loginUser, getUser } = require("../controllers/userController");

const checkIsAuthAndAddTimestamp = require("../middleware/requireSession");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// login route
router.post("/login", loginUser);

//GET a single user
router.get("/:id", checkIsAuthAndAddTimestamp, requireAuth, (req, res) => {
  getUser(req, res);
});

module.exports = router;

// orig
// const express = require('express')

// // controller functions
// const { loginUser, signupUser } = require('../controllers/userController')

// const router = express.Router()

// // login route
// router.post('/login', loginUser)

// // signup route
// router.post('/signup', signupUser)

// module.exports = router
