const userRepo = require("../repositories/user");

async function profile(req, res) {
  const userDb = await userRepo.profile(req.user._id);
  const user = userDb.excludePasswordField();
  res.send(user);
}

async function updateProfile(req, res) {
  await userRepo.updateProfile(req.user._id, req.body);
  res.send({ message: "Successfully updated user profile" });
}

module.exports = { profile, updateProfile };
