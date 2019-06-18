const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    let removeIndex = profile.education
      .map(edu => edu.id)
      .indexOf(req.params.edu_id);


    profile.education.splice(removeIndex, 1);
    await profile.save()

    res.json(profile);
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
}

module.exports = deleteEducation;


