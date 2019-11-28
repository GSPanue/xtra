import mongoose from 'mongoose';

import { Account, Listing, Rating } from '@/database/models';

const connectToDatabase = () => {
  mongoose.connect('mongodb://localhost/xtra', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const createModels = () => {
  mongoose.model('Account', Account);
  mongoose.model('Listing', Listing);
  mongoose.model('Rating', Rating);
};

const getDatabaseConnection = () => (
  mongoose.connection
);

export {
  connectToDatabase,
  createModels,
  getDatabaseConnection
};
