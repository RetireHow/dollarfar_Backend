import { model, Schema } from 'mongoose';
import { TRecentComparison } from './numbeo.interface';

const recentComparisonSchema = new Schema<TRecentComparison>(
  {
    cityA: {
      type: String,
      required: true,
      index: true,
    },
    cityB: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-expire after 7 days
recentComparisonSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7 },
);

export const RecentComparison = model<TRecentComparison>(
  'RecentComparison',
  recentComparisonSchema,
);
