const deleteUserProfilePosts = async (req, res) => {
  
  try {
    // TODO: delete user posts

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted ' });
  } catch (err) {
    /* handle error */
    console.log(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = deleteUserProfilePosts
