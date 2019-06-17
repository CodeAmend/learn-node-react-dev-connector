const getProfile = async (req, res) => {

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
}

module.exports = getProfile;
