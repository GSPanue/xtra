import mongoose from 'mongoose';

const { Schema } = mongoose;

const Rating = new Schema({
  accountId: Schema.ObjectId,
  rating: Number
});

export default Rating;
