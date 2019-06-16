const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch (err) {
    res.status(500).send({ msg: "Invalid Credentials" });
  }
}

module.exports = getUser;
