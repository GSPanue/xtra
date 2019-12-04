import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

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
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
  }, (jwtPayload, done) => (
    done(null, jwtPayload)
  )));
};

const usePassport = (controller) => {
  const params = [
    passport.authenticate('jwt', { session: false }),
    controller
  ];

  return params;
};

export {
  createStrategies,
  usePassport
};
