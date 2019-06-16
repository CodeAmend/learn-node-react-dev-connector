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

      // Util function
      let setField;
      const setFieldObj = fieldObj => name => {
        if(req.body[name]) fieldObj[name] = req.body[name];
      }

      const profileFields = { 
        user: req.user.id,
        social: {} 
      };

      setField = setFieldObj(profileFields);
      setField('company');
      setField('website');
      setField('location');
      setField('bio');
      setField('status');
      setField('education');
      setField('experience');

      setField = setFieldObj(profileFields.social);
      setField('githubusername');
      setField('youtube');
      setField('facebook');
      setField('twitter');
      setField('instagram');
      setField('linkedin');

      if(req.body.skills) {
        profileFields.skills = req.body.skills.split(',');
      }

      try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile) {
          profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );

          return res.json(profile);
        }


        profile = new Profile(profileFields);
        await profile.save();

        res.json(profile);

      } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
      }

      res.json(profileFields)

    } catch(err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server Error', errors: err });
    }
  }
);


module.exports = router;
