import { getModel } from '@/helpers';

const createAccount = ({ body }, res) => {
  const Account = getModel('Account');

  const account = new Account({
    ...body
  });

  account.save((error) => {
    if (error) {
      res.sendStatus(500);
    }

    res.sendStatus(200);
  });
};

const findAccount = ({ query }, res) => {
  const Account = getModel('Account');
  const isValidQuery = (query._id !== undefined) || (query.emailAddress !== undefined);

  if (isValidQuery) {
    Account.findOne({
      ...query
    }).then((account) => {
      res.status(200).send({
        data: account
      });
    }).catch(() => {
      res.status(500).send({
        data: []
      });
    });
  }
  else {
    res.status(200).send({
      data: []
    });
  }
};

export {
  createAccount,
  findAccount
};
