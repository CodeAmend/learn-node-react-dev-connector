const express = require('express');
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


module.exports = router;
