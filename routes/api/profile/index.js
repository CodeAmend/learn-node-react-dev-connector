const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { Users, Profile } = require('../../../models');
const auth = require('../../../middleware/auth');

const getMyProfile   = require('./getMyProfile');
const getProfiles    = require('./getProfiles');
const updateProfile  = require('./updateProfile');
const getProfileById = require('./getProfileById');
const postExperience = require('./postExperience');
const postEducation  = require('./postEducation');
const deleteEducation  = require('./deleteEducation');
const deleteExperience  = require('./deleteExperience');
const deleteUserProfilePosts = require('./deleteUserProfilePosts');

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

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, deleteUserProfilePosts);

// @route   POST api/profile/experience
// @desc    Post experience obj to profile experience list
// @access  Private
router.post('/experience', auth, [
  check('name', 'Please add name'),
  check('company', 'Please add company name'),
  check('from', 'Please add from date'),
], postExperience);

// @route   POST api/profile/experience
// @desc    Post experience obj to profile experience list
// @access  Private
router.post('/education', auth, [
  check('name', 'Please add name'),
  check('school', 'Please add company name'),
  check('from', 'Please add from date'),
], postEducation);

// @route   POST api/profile/experience
// @desc    Post experience obj to profile experience list
// @access  Private
router.delete('/education/:edu_id', auth, deleteEducation);

// @route   POST api/profile/experience
// @desc    Post experience obj to profile experience list
// @access  Private
router.delete('/experience/:exp_id', auth, deleteExperience);

module.exports = router;
