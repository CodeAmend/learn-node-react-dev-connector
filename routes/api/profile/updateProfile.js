const updateProfile = async (req, res) => {
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

module.exports = updateProfile;
