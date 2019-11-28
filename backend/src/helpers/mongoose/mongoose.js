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

const createObjectId = () => (
  mongoose.Types.ObjectId()
);

const getDatabaseConnection = () => (
  mongoose.connection
);

const getModel = (modelName) => (
  mongoose.model(modelName)
);

export {
  connectToDatabase,
  createModels,
  createObjectId,
  getDatabaseConnection,
  getModel
};
