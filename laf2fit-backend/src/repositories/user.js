const User = require("../db/user");
const Errors = require("../libs/custom-errors");

// ********** PRIVATE FUNCTIONS **********
async function isUserExistsAndPasswordMatched(userInDb, password) {
  if (!userInDb) return false;

  return userInDb.comparePassword(password);
}
// ********** PRIVATE FUNCTIONS **********

async function register(userFields) {
  const userInDb = await User.findOne({ email: userFields.email });
  if (userInDb) throw new Errors.BadRequestError("Email already exists");

  try {
    const user = new User({ ...userFields });
    await user.save();
  } catch (err) {
    throw new Errors.BadRequestError(err.message);
  }
}

async function login(credentials) {
  const { email, password } = credentials;
  const userInDb = await User.findOne({ email });

  if (!(await isUserExistsAndPasswordMatched(userInDb, password)))
    throw new Errors.BadRequestError("Your credentials not matched");

  return userInDb;
}

async function profile(userId) {
  return User.findOne({ _id: userId });
}

async function updateProfile(userId, userFields) {
  if (!userFields.password) {
    // eslint-disable-next-line no-param-reassign
    delete userFields.password;
  }

  const userInDb = await User.findOne({ _id: userId });
  if (!userInDb) throw new Errors.BadRequestError("User is not found");

  await User.updateOne({ _id: userId }, userFields);

  if (userFields.password) {
    userInDb.password = userFields.password;
    await userInDb.save();
  }
}

module.exports = { register, login, profile, updateProfile };
