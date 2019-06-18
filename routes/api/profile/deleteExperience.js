const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    let removeIndex = profile.experience
      .map(exp => exp.id)
      .indexOf(req.params.exp_id);


    profile.experience.splice(removeIndex, 1);
    await profile.save()

    res.json(profile);
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

module.exports = deleteExperience;


