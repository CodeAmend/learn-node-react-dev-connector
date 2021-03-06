const postExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    // Add experience 
    profile.experience.unshift(newExp);
    await profile.save()

    res.json(profile);
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

module.exports = postExperience;
