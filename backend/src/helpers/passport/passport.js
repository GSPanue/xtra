import mongoose from 'mongoose';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';

const createStrategies = () => {
  passport.use(new LocalStrategy({
    usernameField: 'emailAddress'
  }, (emailAddress, password, done) => {
    const Account = mongoose.model('Account');

    Account.findOne({
      emailAddress: new RegExp(emailAddress, 'i'),
      password
    }).then((account) => {
      if (account) {
        return done(null, account);
      }

      return done(null, false);
    });
  }));

  passport.use(new JWTStrategy({
    jwtFromRequest: (req) => (req.cookies.jwt),
    secretOrKey: 'secret'
  }, (jwtPayload, done) => {
    jwt.verify(jwtPayload, 'secret', (error) => {
      if (error) {
        return done('jwt expired');
      }

      return done(null, jwtPayload);
    });
  }));
};

export {
  createStrategies
};
