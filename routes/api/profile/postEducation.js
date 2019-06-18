const postEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    };

    // Add experience 
    profile.education.unshift(newEdu);
    await profile.save()

    res.json(profile);
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

module.exports = postEducation;

