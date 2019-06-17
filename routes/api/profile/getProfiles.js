// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
const getProfiles = async (req, res) => {
  try {

    const profiles = await Profile.find().populate('user', [ 'avatar', 'name' ]);

    return res.json(profiles);

    
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = getProfiles;
