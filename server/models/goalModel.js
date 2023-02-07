import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'please add text value'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('goals', goalSchema, 'goals');
