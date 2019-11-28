import mongoose from 'mongoose';

const { Schema } = mongoose;

const Listing = new Schema({
  accountId: Schema.ObjectId,
  topic: String,
  tutor: String,
  location: String,
  time: String,
  duration: String,
  price: Number
});

export default Listing;
