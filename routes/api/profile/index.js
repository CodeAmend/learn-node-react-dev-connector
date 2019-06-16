const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { Users, Profile } = require('../../../models');
const auth = require('../../../middleware/auth');

const getProfile    = require('./getProfile');
const getProfiles   = require('./getProfiles');
const updateProfile = require('./updateProfile');

const router = express.Router();


// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, getProfile);


// @route   POST api/profile 
// @desc    Create or Update user profile
// @accress Private
router.post('/', auth,
  [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty(),
  ],
  updateProfile
);


// @route
// @desc
// @access
router.get('/', getProfiles);

module.exports = router;
