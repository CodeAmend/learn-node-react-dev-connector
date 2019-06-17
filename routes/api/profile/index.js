const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { Users, Profile } = require('../../../models');
const auth = require('../../../middleware/auth');

const getMyProfile   = require('./getMyProfile');
const getProfiles    = require('./getProfiles');
const updateProfile  = require('./updateProfile');
const getProfileById = require('./getProfileById');

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, getMyProfile);

// @route   POST api/profile 
// @desc    Create or Update user profile
// @accress Private
router.post('/', auth, [
  check('status', 'status is required').not().isEmpty(),
  check('skills', 'skills is required').not().isEmpty(),
  updateProfile
]);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getProfiles);

// @route   GET api/profile/user/:userId
// @desc    Get profile by id
// @access  Public
router.get('/user/:userId', getProfileById);

module.exports = router;
