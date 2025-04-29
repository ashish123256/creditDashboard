import express from 'express';
import {
  getFeed,
  saveContent,
  getSavedContent,
  reportContent,
  getReportedContent,
  toggleContentStatus,
} from '../controllers/feed.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getFeed);
router.post('/save/:feedItemId', saveContent);
router.get('/saved', getSavedContent);
router.post('/report/:feedItemId', reportContent);

// Admin routes
router.use(admin);
router.get('/reported', getReportedContent);
router.put('/:feedItemId/status', toggleContentStatus);

export default router;