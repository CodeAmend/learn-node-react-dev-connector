const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const { User } = require('../../models');
const config = require('config');

const router = express.Router();


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters')
      .isLength({ min: 6 })
  ],
  // CALLBACK for route
  async (req, res) => {

    // Validation package parses body.errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Destruct body params
    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      // IF User exists, 400 and error message
      if(user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }


      //
      // Below here - User does not exist!
      //

      // Get users gravatar s:size r:rating d:default
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      // New USER instance (password: not encrypted yet!)
      user = new User({ name, email, avatar, password });

      // Encrypt password 
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Update the actual database with new User information
      await user.save();


      // JWT: Token creation and signing
      const payload = { user: { id: user.id } };
      const secretKey = config.get('jwtSecret');
      const miliseconds = 360000;


      jwt.sign(
        payload,
        secretKey,
        { expiresIn: miliseconds },
        (err, token) => {
          // Error
          if(err) throw err;

          // Token to json
          res.json({ token });
        }
      );


    // New user register fail!
    } catch(err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;
