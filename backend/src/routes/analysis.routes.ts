import { Router } from 'express';
import { analyzeResume, getATSScore, jobMatch } from '../controllers/analysis.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/analyze', authenticate, analyzeResume);
router.post('/ats-score', authenticate, getATSScore);
router.post('/job-match', authenticate, jobMatch);

export default router;
