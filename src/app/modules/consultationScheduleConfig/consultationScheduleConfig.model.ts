import { model, Schema } from 'mongoose';
import {
  IBlockedDate,
  IBlockedTimeRange,
  IBreak,
  IConsultationScheduleConfig,
  IWorkingHour,
} from './consultationScheduleConfig.interface';

const WorkingHourSchema = new Schema<IWorkingHour>({
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const BreakSchema = new Schema<IBreak>({
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  reason: { type: String, required: true },
});

const BlockedTimeRangeSchema = new Schema<IBlockedTimeRange>({
  date: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  reason: { type: String, required: true },
});

const BlockedDateSchema = new Schema<IBlockedDate>({
  date: { type: String, required: true },
  reason: { type: String, required: true },
});

const ConsultationScheduleConfigSchema =
  new Schema<IConsultationScheduleConfig>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      consultantTZ: {
        type: String,
        required: true,
        default: '(UTC-05:00) Eastern Time (US & Canada)',
      },
      consultantTZ_IANA: {
        type: String,
        required: true,
        default: 'America/Toronto',
      },
      slotDurationMinutes: { type: Number, required: true, default: 30 },
      workingHours: { type: [WorkingHourSchema], default: [] },

      breaks: { type: [BreakSchema], default: [] },
      blockedDates: { type: [BlockedDateSchema], default: [] },
      blockedTimeRanges: { type: [BlockedTimeRangeSchema], default: [] },

      active: { type: Boolean, default: true },
      lastUpdatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: false,
      },
    },
    { timestamps: true },
  );

export const ConsultationScheduleConfig = model<IConsultationScheduleConfig>(
  'ConsultationScheduleConfig',
  ConsultationScheduleConfigSchema,
);
