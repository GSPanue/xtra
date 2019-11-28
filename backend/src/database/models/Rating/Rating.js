import mongoose from 'mongoose';

const { Schema } = mongoose;

const Rating = new Schema({
  id: Schema.ObjectId,
  accountId: Schema.ObjectId,
  rating: Number
});

export default Rating;
