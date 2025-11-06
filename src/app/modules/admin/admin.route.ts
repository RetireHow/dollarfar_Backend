import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.post('/create-admin', AdminControllers.createAdmin);

router.post('/login-admin', AdminControllers.loginAdmin);

router.get('/admin-details', AdminControllers.getAdminDetails);

export const AdminRoutes = router;
