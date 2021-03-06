import mongoose from 'mongoose';

const { Schema } = mongoose;

const Account = new Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  password: {
    type: String,
    select: false
  },
  accountType: String
});

export default Account;
