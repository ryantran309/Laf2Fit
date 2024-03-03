const userRepo = require("../repositories/user");

async function register(req, res) {
  await userRepo.register(req.body);
  res.send({ message: "Successfully registered user" });
}

async function login(req, res) {
  let user = await userRepo.login(req.body);
  const token = user.generateToken();
  user = { ...user.excludePasswordField(), token };

  res.send({ user });
}

module.exports = { register, login };
