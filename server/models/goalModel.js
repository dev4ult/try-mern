import mongoose, { Schema } from 'mongoose';

const goalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'please add a user'],
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'please add a text'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Goal', goalSchema);
