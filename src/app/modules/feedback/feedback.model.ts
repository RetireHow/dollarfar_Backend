import { model, Schema } from 'mongoose';
import { TFeedback } from './feedback.interface';

const feedbackSchema = new Schema<TFeedback>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const FeedbackModel = model<TFeedback>('Feedback', feedbackSchema);
