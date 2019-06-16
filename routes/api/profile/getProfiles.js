const getProfiles = async (req, res) => {
  try {

    return res.send('ALL PROFILES');

    
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = getProfiles;
