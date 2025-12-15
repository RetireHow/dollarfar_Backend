import { Types } from 'mongoose';

export type DayName =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface IWorkingHour {
  day: DayName;
  start: string; // "HH:mm" in provider tz
  end: string; // "HH:mm"
}

export interface ITimeRange {
  start: string; // "HH:mm"
  end: string; // "HH:mm"
  day?: DayName; // optional: if not provided, applies to all days (used for breaks with day) or provide date-specific ranges via disabledTimeRanges
}

export interface IDisabledTimeRange {
  date: string; // ISO date 'YYYY-MM-DD' (provider local date)
  start: string; // 'HH:mm'
  end: string; // 'HH:mm'
}

export interface IConsultationScheduleConfig {
  name: string;
  email: string;
  country: string;
  state: string;
  providerId?: Types.ObjectId | null; // optional for global config
  providerTimezone: string; // e.g. 'America/Toronto'
  slotDurationMinutes: number; // e.g. 30
  workingHours: IWorkingHour[]; // weekly working hours
  breaks: Array<{ day: DayName; start: string; end: string }>; // recurring breaks per weekday
  disabledDates: string[]; // array of ISO local dates (provider tz) like '2025-12-25'
  disabledTimeRanges: IDisabledTimeRange[]; // date specific disabled ranges
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastUpdatedBy?: Types.ObjectId;
}
