require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// express session // redis / redis store
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

// web routes constants
const sourcerecipegroupRoutes = require("./routes/sourcerecipegroups");
const sourcerecipeRoutes = require("./routes/sourcerecipes");
const sourceingredientRoutes = require("./routes/sourceingredients");
const sourcecommentRoutes = require("./routes/sourcecomments");
const venueRoutes = require("./routes/venues");
const holdingroomRoutes = require("./routes/holdingrooms");
const userRoutes = require("./routes/user");
const userSignup = require("./routes/signup");

// mobile routes constants
const mobile_sourcerecipegroupRoutes = require("./mobileroutes/sourcerecipegroups");
const mobile_sourcerecipeRoutes = require("./mobileroutes/sourcerecipes");
const mobile_sourceingredientRoutes = require("./mobileroutes/sourceingredients");
const mobile_userRoutes = require("./mobileroutes/user");
const mobile_userSignup = require("./mobileroutes/signup");
// end mobile route constants

const cors = require("cors");

// express app
const app = express();

app.use(express.json());

// prod origins
const PROD_ORIGINS = [
  "https://recipe-chef.vercel.app",
  "https://events-menu.vercel.app",
];

// dev | trash | stage origins
const DEV_ORIGINS = [
  "https://stage-chef-recipe.vercel.app",
  "https://stage-menu-events.vercel.app",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  process.env.ADD_TRASH_SITE_I,
  process.env.ADD_TRASH_SITE_II,
];

// origin
const ORIGIN = process.env.IS_PROD === "Yes" ? PROD_ORIGINS : DEV_ORIGINS;

// cors
var corsOptions = {
  origin: ORIGIN,
  default: "https://recipe-chef.vercel.app",
  methods: ["POST", "PUT", "PATCH", "GET", "OPTIONS", "DELETE", "UPDATE", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));

// use first proxy when deployed on edge or behind a proxy
app.set("trust proxy", 1);

// middleware
app.use(express.json());

// middleware
app.use((req, res, next) => {
  res.header("Content-Type", "application/json;charset=UTF-8");
  const allowedOrigins = ORIGIN;
  const origin = req.headers.origin;
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   allowedOrigins.includes(origin) ? origin : "https://stage-chef-recipe.vercel.app"
  // );
  res.header("Access-Control-Allow-Origin", allowedOrigins.includes(origin) ? origin : "https://recipe-chef.vercel.app")
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  console.log(req.path, req.method);
  next();
});

// REDIS
const redisClient =
  process.env.IS_PROD === "Yes" || process.env.IS_PROD === "Stage"
    ? redis.createClient({ url: process.env.REMOTE_REDIS_URL })
    : redis.createClient({
      socket: {
        host: "127.0.0.1",
        port: 6379,
      },
      password: process.env.LOCAL_REDIS_PASS,
      username: "default",
    });

// // Set up session store using Redis
const RedisStore = connectRedis(session);

// // Handle Redis connection events
redisClient.on("error", (err) =>
  console.log(`Failed to connect to Redis. ${err}`)
);
redisClient.on("connect", () => console.log("Successfully connected to Redis"));

// session store / cookie
const secure_bool = process.env.IS_PROD === "Yes" || process.env.IS_PROD === "Stage" || process.env.IS_PROD === "Trash";
const same_site_state = secure_bool ? "none" : "lax";
app.use(
  session({
    store: new RedisStore({ client: redisClient, ttl: 43200 }), // seconds 12 hours
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: secure_bool,
      sameSite: same_site_state,
      maxAge: 43200000, // milliseconds 12 hours
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// Middleware of parsing URL-encoded form data, for getting username and password
app.use(express.urlencoded({ extended: true }));

//// -----------------------------------
// TEST

// app.post("/new", async (req, res) => {
//   try {
//     req.session.isAuth = true;
//     // in prod use data from mongo user.username value
//     req.session.userName = req.body.name;
//     req.session.timestamps = [];
//     // in prod use data from mongo user object except -password
//     req.session.user = {
//       email: "a@a.com",
//       username: req.body.name,
//       usertype: "Chef",
//       token: "tokenmo",
//     };

//     const response = {
//       isAuth: req.session.isAuth,
//       userName: req.session.userName,
//       user: req.session.user,
//     };

//     res.send(response);
//   } catch (error) {
//     console.log(error);
//     // res.status(404);
//     res.send(error);
//   }
// });

const checkIsAuthAndAddTimestamp = require("./middleware/requireSession");

app.get("/name", checkIsAuthAndAddTimestamp, async (req, res) => {
  try {
    const { isAuth, user, userName, timestamps } = req.session;
    const response = {
      isAuth: isAuth,
      userName: userName,
      user: user,
      timestamps: timestamps,
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.send(error);
    // res.json({}); // okay
  }
});

app.get("/logout", function (req, res) {
  // Clearing the cookie
  const userName = req.session.userName;
  res.clearCookie("connect.sid");
  console.log(`Cookie of ${userName} Cleared.`);

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.userName = null;
  req.session.isAuth = null;
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      console.log(`Session regenerated to avoid session fixation.`);
      req.session.destroy(function (err) {
        console.log(`Session of ${userName} Destroyed.`);
        res.send({ message: "logout success!" });
      });
    })
  })

});

// END TEST
//// -----------------------------------

// web routes
app.use("/api/sourcerecipegroups", sourcerecipegroupRoutes);
app.use("/api/sourcerecipes", sourcerecipeRoutes);
app.use("/api/sourceingredients", sourceingredientRoutes);

app.use("/api/sourcecomments", sourcecommentRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/holdingrooms", holdingroomRoutes);

app.use("/api/user", userRoutes);
app.use("/api/signup", userSignup);

// mobile routes
app.use("/mobile/sourcerecipegroups", mobile_sourcerecipegroupRoutes);
app.use("/mobile/sourcerecipes", mobile_sourcerecipeRoutes);
app.use("/mobile/sourceingredients", mobile_sourceingredientRoutes);
app.use("/mobile/user", mobile_userRoutes);
app.use("/mobile/signup", mobile_userSignup);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

////////

// REDIS START

// var whitelist = ['https://recipe-chef.vercel.app', 'https://events-menu.vercel.app', 'http://127.0.0.1:5173', 'http://localhost:5173']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   default: "https://recipe-auth.cyclic.app",
//   credentials: true,
// }

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     var originIsWhitelisted = whitelist.indexOf(origin) !== -1
//     callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
//   }
// }

// app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
// })

// origin: function (origin, callback) {
//   if (!origin || whitelist.indexOf(origin) !== -1) {
//     callback(null, true)
//   } else {
//     callback(new Error('Not allowed by CORS'))
//   }
// },