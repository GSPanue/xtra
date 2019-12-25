import passport from 'passport';
import jwt from 'jsonwebtoken';
import { getModel } from '@/helpers';

const createAccount = ({ body }, res) => {
  const Account = getModel('Account');

  const account = new Account({
    ...body
  });

  account.save((error) => {
    if (error) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

const authAccount = (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {
      if (error || !user) {
        res.sendStatus(400);
        return;
      }

      const payload = {
        _id: user._id,
        emailAddress: user.emailAddress,
        accountType: user.accountType
      };

      req.login(payload, { session: false }, (err) => {
        if (err) {
          res.sendStatus(400);
          return;
        }

        const token = jwt.sign(JSON.stringify(payload), 'secret');

        res.cookie('jwt', token, {
          httpOnly: true
        });

        res.sendStatus(200);
      });
    }
  )(req, res);
};

const findAccount = ({ user }, res) => {
  const Account = getModel('Account');
  const { emailAddress } = user;

  Account.findOne({
    emailAddress: new RegExp(`^${emailAddress}$`, 'i')
  }).select('-__v').then((account) => {
    if (account) {
      res.status(200).send(account);
      return;
    }

    res.sendStatus(400);
  }).catch(() => {
    res.sendStatus(500);
  });
};

const findEmail = ({ query }, res) => {
  const Account = getModel('Account');
  const { emailAddress } = query;

  Account.findOne({
    emailAddress: new RegExp(`^${emailAddress}$`, 'i')
  }).then((account) => {
    if (account) {
      res.sendStatus(400);
      return;
    }

    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(500);
  });
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.sendStatus(200);
};

export {
  createAccount,
  authAccount,
  findAccount,
  findEmail,
  logout
};
