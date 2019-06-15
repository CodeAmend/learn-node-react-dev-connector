const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { Users, Profile } = require('../../models');
const auth = require('../../middleware/auth');

const router = express.Router();


// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {

  // TODO: What does populate do!! Why does it know which user?
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar']);


    if(!profile) {
      res.status(400).json({
        msg: "No profile for this user"
      })
    }

    res.json(profile);
    

  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST api/profile 
// @desc    Create or Update user profile
// @accress Private
router.post('/',
  auth,
  [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      console.log("empty");
      return res.status(400).json({ errors: errors.array() })
    }

    try {

      const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
      } = req.body;


      const profileFields = {};
      profileFields.user = req.user.id;
      if(company) profileFields.company = company;
      if(website) profileFields.website = website;
      if(location) profileFields.location = location;
      if(bio) profileFields.bio = bio;
      if(status) profileFields.status = status;
      if(githubusername) profileFields.githubusername = githubusername;
      if(youtube) profileFields.youtube = youtube;
      if(facebook) profileFields.facebook = facebook;
      if(twitter) profileFields.twitter = twitter;
      if(instagram) profileFields.instagram = instagram;
      if(linkedin) profileFields.linkedin = linkedin;
      if(skills) {
        const skillsArray = skills.split(',');
        profileFields.skills = skillsArray;
      }

      res.json(profileFields)

    } catch(err) {
      res.status(500).json({ msg: 'Server Error'});
    }
  }
);


module.exports = router;
