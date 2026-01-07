import { IPOCInterest } from './POCInterest.interface';
import { POCInterest } from './POCInterest.model';

const createPOCInterestIntoDB = async (payload: IPOCInterest) => {
  const res = await POCInterest.create(payload);
  return res;
};

const getAllPOCInterestsFromDB = async () => {
  const res = await POCInterest.find({}).sort({ _id: -1 });
  return res;
};

const getSinglePOCInterestFromDB = async (pocId: string) => {
  const res = await POCInterest.findById(pocId);
  return res;
};

export const POCInterestServices = {
  createPOCInterestIntoDB,
  getAllPOCInterestsFromDB,
  getSinglePOCInterestFromDB,
};
