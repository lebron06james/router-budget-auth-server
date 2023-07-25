require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const sourcerecipegroupRoutes = require('./routes/sourcerecipegroups')
const sourcerecipeRoutes = require('./routes/sourcerecipes')
const sourceingredientRoutes = require('./routes/sourceingredients')
const userRoutes = require('./routes/user')
const userSignup = require('./routes/signup')


// mobile route constants
const mobile_sourcerecipegroupRoutes = require('./mobileroutes/sourcerecipegroups')
const mobile_sourcerecipeRoutes = require('./mobileroutes/sourcerecipes')
const mobile_sourceingredientRoutes = require('./mobileroutes/sourceingredients')
const mobile_userRoutes = require('./mobileroutes/user')
const mobile_userSignup = require('./mobileroutes/signup')
// end mobile route constants

const cors = require("cors");

// express app
const app = express()

app.use(cors());

// var corsOptions = {
//   origin: "http://localhost:5173"
// };

// app.use(cors(corsOptions));

// middleware
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/sourcerecipegroups', sourcerecipegroupRoutes)
app.use('/api/sourcerecipes', sourcerecipeRoutes)
app.use('/api/sourceingredients', sourceingredientRoutes)
app.use('/api/user', userRoutes)
app.use('/api/signup', userSignup)


// mobile routes
app.use('/mobile/sourcerecipegroups', mobile_sourcerecipegroupRoutes)
app.use('/mobile/sourcerecipes', mobile_sourcerecipeRoutes)
app.use('/mobile/sourceingredients', mobile_sourceingredientRoutes)
app.use('/mobile/user', mobile_userRoutes)
app.use('/mobile/signup', mobile_userSignup)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })