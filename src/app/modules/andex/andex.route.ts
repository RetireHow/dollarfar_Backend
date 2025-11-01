import express from 'express';
import { AndexControllers } from './andex.controller';

const router = express.Router();

router.get('/data', AndexControllers.getAndexCombinedData);

export const AndexRoutes = router;
