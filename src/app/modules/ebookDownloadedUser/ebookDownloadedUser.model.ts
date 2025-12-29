import { model, Schema } from 'mongoose';
import { TEbookDownloadedUser } from './ebookDownloadedUser.interface';

const ebookDownloadedUserSchema = new Schema<TEbookDownloadedUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    ebookName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const EbookDownloadedUserModel = model<TEbookDownloadedUser>(
  'EbookDownloadedUser',
  ebookDownloadedUserSchema,
);
