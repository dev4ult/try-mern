import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    text: String,
  },
  { timestamps: true }
);

const goalModel = mongoose.model('goals', goalSchema, 'goals');

export default goalModel;
