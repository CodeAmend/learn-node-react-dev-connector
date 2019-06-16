const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check } = require('express-validator/check');
const { auth } = require('../../../middleware');
const { User } = require('../../../models');
const getUser = require('./getUser');
const loginUser = require('./loginUser');

const router = express.Router();


// @route            GET api/auth
// @desc             Test route
// @access           Public
router.get('/', auth, getUser);

// @route            POST api/auth
// @desc             Login Authentication
// @access           Public
router.post('/',
  [
    check('email', 'Pease use a valid email').isEmail(),
    check('password', 'Must have a password').exists()
  ],
  loginUser
);


module.exports = router;
