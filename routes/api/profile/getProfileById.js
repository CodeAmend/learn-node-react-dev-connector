const Profile = require('../../../models/Profile');

const getProfileById = async (req, res) => {

  try {

    const profile = await Profile.findById(req.params.userId)
      .populate('user', ['avatar', 'name' ]);

    if(!profile) {
      return res.status(400)
        .json({ msg: 'Profile not found.' });
    }

    res.json(profile);

    
  } catch (err) {
    /* handle error */
    let msg = 'Server Error';
    let status = 500;

    if(err.kind == 'ObjectId') {
      msg = 'Profile not found.'
      status = 400;
    }
    return res.status(status).json({ msg });

    console.log(err);
  }

}

module.exports = getProfileById;
