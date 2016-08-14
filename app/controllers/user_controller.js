import jwt from 'jwt-simple';
import config from '../config';
import User from '../models/user_model';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.api_secret);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    return res.status(422).send('You must provide email, username, and password');
  }

  User.findOne({ email: req.body.email })
  .then(useremail => {
    if (!useremail) {
      const user = new User();
      user.email = email;
      user.password = password;
      user.username = username;
      user.save()
      .then(result => {
        res.send({ token: tokenForUser(user) });
      })
      .catch(error => {
        res.json({ error });
      });
    } else {
      res.status(422).send('User already exists');
    }
  });
};
