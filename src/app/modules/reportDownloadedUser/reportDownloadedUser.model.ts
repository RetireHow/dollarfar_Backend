import { model, Schema } from 'mongoose';
import { TReportDownloadedUser } from './reportDownloadedUser.interface';

const reportDownloadedUserSchema = new Schema<TReportDownloadedUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    downloadedFileName: {
      type: String,
      required: true,
      trim: true
    },
  },
  { timestamps: true, versionKey: false },
);

export const ReportDownloadedUserModel = model<TReportDownloadedUser>(
  'ReportDownloadedUser',
  reportDownloadedUserSchema,
);
