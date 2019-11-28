import mongoose from 'mongoose';

import Rating from '@/database/models/Rating';

const { Schema } = mongoose;

const Listing = new Schema({
  accountId: Schema.ObjectId,
  topic: String,
  tutor: String,
  location: String,
  time: String,
  duration: String,
  price: Number,
  ratings: [Rating]
});

export default Listing;
