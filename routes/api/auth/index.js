const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const { auth } = require('../../../middleware');
const { User } = require('../../../models');

const router = express.Router();


// @route            GET api/auth
// @desc             Test route
// @access           Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch (err) {
    res.status(500).send({ msg: "Invalid Credentials" });
  }
});

// @route            POST api/auth
// @desc             Login Authentication
// @access           Public
router.post('/',
  [
    check('email', 'Pease use a valid email').isEmail(),
    check('password', 'Must have a password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    bcrypt.compare(password, user.password, (err, isValid) => {
      if(!isValid)
        res.status(401).send({ msg: 'Invalid Credentials' });
    });


    const tokenSecret = config.get('jwtSecret');
    const payload = {
      user: {
        id: user.id
      }
    };

    await jwt.sign(
      payload,
      tokenSecret,
      { expiresIn: 36000 },

      (err, token) => {
        if(err) throw err;

        res.json({
          success: true,
          msg: 'You logged in!',
          token: token,
        });
      }
    );


  } catch (err) {

    console.log(err.message);
    res.status(500).send('Server Error');

  }
});


module.exports = router;
