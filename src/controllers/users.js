const User = require('../models/user');
const emailRule = require('../utils/emailValidation');
const validate = require('../utils/validations');
const { rule } = require('indicative');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const makeValidationRules = (emailRule) => {
  const commonRules = {
    username: 'required|min:3|max:15',
    password: 'required|min:6',
  };
  commonRules.email = emailRule;
  return commonRules;
};

module.exports = {
  // signup a user
  async signup(req, res, next) {
    const data = await validate(
      req,
      makeValidationRules(emailRule.concat(rule('unique', User))),
    );

    user = await User.create(data);
    return res.status(201).send({ user, message: 'User created successfully' });
  },
  //login user
  async login(req, res) {
    const { email, password } = await validate(req, {
      email: emailRule,
      password: 'required|min:6',
    });
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const { email, _id: user_id } = user;
      const payload = {
        email,
        user_id,
      };
      return res.send({
        message: 'You successfully loggedin',
        token: jwt.sign({ payload }, process.env.SECRET, { expiresIn: 86400 }),
      });
    }

    return res.status(401).send({ error: 'Incorrect email or password' });
  },
};