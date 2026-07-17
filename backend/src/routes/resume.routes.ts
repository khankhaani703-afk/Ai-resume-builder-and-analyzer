import { Router } from 'express';
import { uploadResume, getResumes, getResumeById, deleteResume } from '../controllers/resume.controller';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post('/upload', authenticate, upload.single('resume'), uploadResume);
router.get('/', authenticate, getResumes);
router.get('/:id', authenticate, getResumeById);
router.delete('/:id', authenticate, deleteResume);

export default router;
