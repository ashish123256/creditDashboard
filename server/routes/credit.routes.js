import express from 'express';
import {
  getCredits,
  addDailyCredits,
  addProfileCompletionCredits,
  addInteractionCredits,
  updateUserCredits,
  getAllCredits,
} from '../controllers/credit.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getCredits);
router.post('/daily', addDailyCredits);
router.post('/profile', addProfileCompletionCredits);
router.post('/interaction', addInteractionCredits);

// Admin routes
router.use(admin);
router.get('/all', getAllCredits);
router.put('/:userId', updateUserCredits);

export default router;