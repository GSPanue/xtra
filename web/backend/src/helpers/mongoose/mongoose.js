import mongoose from 'mongoose';

import { Account, Listing } from '@/database/models';

const connectToDatabase = () => {
  mongoose.connect('mongodb://localhost/xtra', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

const createModels = () => {
  mongoose.model('Account', Account);
  mongoose.model('Listing', Listing);
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
