const postExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    console.log(req.user);

    const {
      title,
      company,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      from,
      to,
      current,
      description
    };

    console.log(profile);
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
