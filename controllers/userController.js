const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        // if (err) next(err);
        if (err) {
          console.log({regenerate_error: err});
          return res.json({regenerate_error: err});
        }

        // create a token
        const token = createToken(user._id);
        const email = user.email;
        const username = user.username;
        const usertype = user.usertype;

        // store user information in session, typically a user id
        try {
          req.session.isAuth = true;
          // in prod use data from mongo user.username value
          req.session.userName = username;
          req.session.timestamps = [];
          // in prod use data from mongo user object except -password
          req.session.user = {
            email: email,
            username: username,
            usertype: usertype,
            token: token,
          };
      
          const response = {
            isAuth: req.session.isAuth,
            userName: req.session.userName,
            user: req.session.user,
          };

          // save the session before redirection to ensure page
          // load does not happen before session is saved
          req.session.save(function (err) {
            // if (err) return next(err);
            if (err) {
              console.log({session_save_error: err});
              return res.json({session_save_error: err});
            }
            console.log('session saved.');
          });          
      
          res.status(200).json({ email, username, usertype, token });
          // res.json({ response, token });
        } catch (error) {
          console.log({create_session_error: error.message});
          // res.status(404);
          res.send({create_session_error: error.message});
        }

      });
    } else {
      res.status(400).json({ error: 'user not found' });
    }
  } catch (error) {
    res.status(400).json({ user_login_error: error.message });
  }
};

// signup a user
const signupUser = async (req, res, next) => {
  const { email, password, username, usertype } = req.body;

  try {
    const user = await User.signup(email, password, username, usertype);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, username, usertype, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
