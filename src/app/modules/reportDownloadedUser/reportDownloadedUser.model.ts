import { model, Schema } from 'mongoose';
import { TDownloadFile, TReportDownloadedUser } from './reportDownloadedUser.interface';

const downloadedFileSchema = new Schema<TDownloadFile>(
  {
    downloadedFileName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, _id: false }, // Disable _id if you don't need it for each file
);

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
      unique: true,
    },
    downloadedFiles: {
      type: [downloadedFileSchema],
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

export const ReportDownloadedUserModel = model<TReportDownloadedUser>('ReportDownloadedUser', reportDownloadedUserSchema);
