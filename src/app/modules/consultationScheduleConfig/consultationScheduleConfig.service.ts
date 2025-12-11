// services/schedule.service.ts
import { DateTime } from 'luxon';
import { ConsultationScheduleConfig } from './consultationScheduleConfig.model';
import { IConsultationScheduleConfig } from './consultationScheduleConfig.interface';
import { ConsultationSession } from '../consultationSession/consultationSession.model';

export type SlotInfo = {
  utc: string; // ISO string in UTC
  providerTime: string; // ISO string in provider timezone
  available: boolean;
};

// Luxon weekday number → DB day names (capitalized)
const WEEKDAY_MAP: Record<number, string> = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

// helper → converts "HH:mm" into DateTime for given date + zone
function timeOnDate(dateIso: string, time: string, zone: string): DateTime {
  const [h, m] = time.split(':').map(Number);
  return DateTime.fromISO(dateIso, { zone }).set({
    hour: h,
    minute: m,
    second: 0,
    millisecond: 0,
  });
}

const createConsultationScheduleConfigIntoDB = async (
  payload: IConsultationScheduleConfig,
) => {
  const res = await ConsultationScheduleConfig.create(payload);
  return res;
};

const updateConsultationScheduleConfigIntoDB = async (
  configId: string,
  payload: IConsultationScheduleConfig,
) => {
  const res = await ConsultationScheduleConfig.findByIdAndUpdate(
    configId,
    payload,
    { new: true },
  );
  return res;
};

const getConsultationScheduleConfigFromDB = async () => {
  const res = await ConsultationScheduleConfig.findOne();
  return res;
};

export async function generateSlotsForDateIsoDynamic(
  dateIso: string,
): Promise<SlotInfo[]> {
  const config =
    await ConsultationScheduleConfig.findOne().lean<IConsultationScheduleConfig>();
  if (!config) return [];

  const zone = config.providerTimezone || 'UTC';
  const slotMinutes = config.slotDurationMinutes || 30;

  const date = DateTime.fromISO(dateIso, { zone });
  if (!date.isValid) return [];

  const weekdayKey = WEEKDAY_MAP[date.weekday];

  // Find working hours for the day
  const hours = config.workingHours.find(w => w.day === weekdayKey);
  if (!hours) return []; // office closed today

  // Disabled full date
  if ((config.disabledDates ?? []).includes(date.toISODate()!)) return [];

  const workingStart = timeOnDate(dateIso, hours.start, zone);
  const workingEnd = timeOnDate(dateIso, hours.end, zone);
  if (!workingStart.isValid || !workingEnd.isValid) return [];

  const breaks = config.breaks ?? [];
  const disabledTimeRanges = config.disabledTimeRanges ?? [];

  // Generate all candidate slots first
  const candidateSlots: DateTime[] = [];
  let cursor = workingStart;

  while (cursor.plus({ minutes: slotMinutes }) <= workingEnd) {
    const slotStart = cursor;
    const slotEnd = cursor.plus({ minutes: slotMinutes });

    // Check if slot overlaps any recurring break
    const overlapsBreak = breaks.some(b => {
      if (b.day !== weekdayKey) return false;
      const bStart = timeOnDate(dateIso, b.start, zone);
      const bEnd = timeOnDate(dateIso, b.end, zone);
      return slotStart < bEnd && slotEnd > bStart;
    });

    // Check if slot overlaps any disabledTimeRanges
    const overlapsDisabled = disabledTimeRanges.some(d => {
      if (d.date !== date.toISODate()) return false;
      const dStart = timeOnDate(dateIso, d.start, zone);
      const dEnd = timeOnDate(dateIso, d.end, zone);
      return slotStart < dEnd && slotEnd > dStart;
    });

    if (!overlapsBreak && !overlapsDisabled) {
      candidateSlots.push(slotStart);
    }

    cursor = cursor.plus({ minutes: slotMinutes });
  }

  // Fetch booked sessions for this date (UTC slots)
  const startWindow = candidateSlots[0]?.toUTC().toJSDate();
  const endWindow = candidateSlots[candidateSlots.length - 1]
    ?.plus({ minutes: slotMinutes })
    .toUTC()
    .toJSDate();

  let bookedSlotsSet = new Set<string>();
  if (startWindow && endWindow) {
    const bookedSessions = await ConsultationSession.find({
      slot: {
        $gte: startWindow,
        $lt: endWindow,
      },
      isDeleted: false,
    }).select('slot -_id');

    bookedSlotsSet = new Set(bookedSessions.map(b => b.slot.toISOString()));
  }

  // Build final SlotInfo array
  const slots: SlotInfo[] = candidateSlots.map(slotStart => {
    const utc = slotStart.toUTC().toISO();
    return {
      utc,
      providerTime: slotStart.toISO(),
      available: !bookedSlotsSet.has(utc!),
    };
  }) as SlotInfo[];

  return slots;
}

const getAllConsultationSessionSlotsFromDB = async (date: string) => {
  const res = await generateSlotsForDateIsoDynamic(date);
  return res;
};

export const ConsultationScheduleConfigServices = {
  getAllConsultationSessionSlotsFromDB,
  createConsultationScheduleConfigIntoDB,
  updateConsultationScheduleConfigIntoDB,
  getConsultationScheduleConfigFromDB,
};
