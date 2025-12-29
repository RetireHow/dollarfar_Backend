import express from 'express';
import { NumbeoControllers } from './numbeo.controller';

const router = express.Router();

router.get('/all-cities', NumbeoControllers.getAllCities);
router.get('/city-prices', NumbeoControllers.getCityPrices);
router.get('/exchange-rates', NumbeoControllers.getExchangeRates);
router.get('/city-cost-esitmator', NumbeoControllers.getCityCostEstimator);
router.get(
  '/close-cities-with-price',
  NumbeoControllers.getCloseCitiesWithPrice,
);
router.get('/city-indices', NumbeoControllers.getCityIndices);
router.get('/city-crime', NumbeoControllers.getCityCrime);
router.get('/city-healthcare', NumbeoControllers.getCityHealthCare);
router.get('/city-pollution', NumbeoControllers.getCityPollution);
router.get('/city-traffic', NumbeoControllers.getCityTraffic);

router.post('/log', NumbeoControllers.logRecentComparison);
router.get('/recent', NumbeoControllers.getRecentComparisons);

export const NumbeoRoutes = router;
