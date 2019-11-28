import mongoose from 'mongoose';

const connectToDatabase = () => {
  mongoose.connect('mongodb://localhost/xtra', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const getDatabaseConnection = () => (
  mongoose.connection
);

export {
  connectToDatabase,
  getDatabaseConnection
};
