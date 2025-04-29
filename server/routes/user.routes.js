import express from 'express';
import {
  getAllUsers,
  getUserById,
  getUserActivity,
  updateUserRole,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/:userId/activity', getUserActivity);
router.put('/:userId/role', updateUserRole);

export default router;