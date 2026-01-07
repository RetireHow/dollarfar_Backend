import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { POCInterestValidation } from './POCInterest.validation';
import { POCInterestControllers } from './POCInterest.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(POCInterestValidation.createPOCInterestValidationSchema),
  POCInterestControllers.createPOCInterest,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  POCInterestControllers.getAllPOCInterests,
);

router.get(
  '/:pocId',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  POCInterestControllers.getSinglePOCInterest,
);

export const POCInterestRoutes = router;
