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

export interface IBreak {
  day: DayName;
  start: string;
  end: string;
  reason: string;
}

export interface IBlockedDate {
  date: string;
  reason: string;
}

export interface IBlockedTimeRange {
  date: string;
  start: string;
  end: string;
  reason: string;
}

export interface IConsultationScheduleConfig {
  name: string;
  email: string;
  country: string;
  state: string;
  providerId?: Types.ObjectId | null;
  consultantTZ: string;
  consultantTZ_IANA: string;
  slotDurationMinutes: number;
  workingHours: IWorkingHour[];
  breaks: IBreak[];
  blockedDates: IBlockedDate[];
  blockedTimeRanges: IBlockedTimeRange[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastUpdatedBy?: Types.ObjectId;
}
