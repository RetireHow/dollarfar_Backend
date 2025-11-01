import httpStatus from 'http-status';
import { AndexServices } from './andex.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

interface DataPoint {
  date: string;
  close: number;
}

interface CombinedData {
  date: string;
  sp500: number;
  tsx: number | null;
  inflation: number | null;
}

const getAndexCombinedData = catchAsync(async (req, res) => {
  // const [inflation, sp500, tsx] = await Promise.all([
  //   AndexServices.getFredInflation(),
  //   AndexServices.getYahooIndexData('^GSPC'), // S&P 500
  //   AndexServices.getYahooIndexData('^GSPTSE'), // TSX
  // ]);

  // Combine data by date (simplified)
  // const combined: CombinedData[] = sp500.map((point: DataPoint, i: number) => ({
  //   date: point.date,
  //   sp500: point.close,
  //   tsx: tsx[i]?.close || null,
  //   inflation: inflation[i]?.value || null,
  // }));

  const combined = await AndexServices.getFredInflation()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Andex data is retrieved successfully.',
    data: combined,
  });
});

export const AndexControllers = {
  getAndexCombinedData,
};
