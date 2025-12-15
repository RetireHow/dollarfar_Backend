import { model, Schema } from 'mongoose';
import {
  IConsultationScheduleConfig,
  IDisabledTimeRange,
  IWorkingHour,
} from './consultationScheduleConfig.interface';

const WorkingHourSchema = new Schema<IWorkingHour>({
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const DisabledTimeRangeSchema = new Schema<IDisabledTimeRange>({
  date: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const ConsultationScheduleConfigSchema =
  new Schema<IConsultationScheduleConfig>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      providerTimezone: { type: String, required: true, default: 'UTC' },
      slotDurationMinutes: { type: Number, required: true, default: 30 },
      workingHours: { type: [WorkingHourSchema], default: [] },
      breaks: {
        type: [
          new Schema({
            day: { type: String, required: true },
            start: { type: String, required: true },
            end: { type: String, required: true },
          }),
        ],
        default: [],
      },
      disabledDates: { type: [String], default: [] },
      disabledTimeRanges: { type: [DisabledTimeRangeSchema], default: [] },
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
