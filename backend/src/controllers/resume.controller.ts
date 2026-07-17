import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Resume, { IResume } from '../models/Resume';
import { extractTextFromPDF, extractTextFromDOCX } from '../services/fileParser';
import { asyncHandler } from '../middleware/errorHandler';
import fs from 'fs';

export const uploadResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
    return;
  }

  const { title } = req.body;
  const fileType = req.file.mimetype.includes('pdf') ? 'pdf' : 'docx';
  let textContent = '';

  try {
    // Extract text based on file type
    if (fileType === 'pdf') {
      textContent = await extractTextFromPDF(req.file.path);
    } else {
      textContent = await extractTextFromDOCX(req.file.path);
    }

    const resume = new Resume({
      userId: req.userId,
      title: title || req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType,
      textContent
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully',
      resume: {
        id: resume._id,
        title: resume.title,
        fileName: resume.fileName,
        fileType: resume.fileType,
        createdAt: resume.createdAt
      }
    });
  } catch (error) {
    // Delete the file if processing fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    throw error;
  }
});

export const getResumes = asyncHandler(async (req: AuthRequest, res: Response) => {
  const resumes = await Resume.find({ userId: req.userId })
    .select('-textContent')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: resumes.length,
    resumes
  });
});

export const getResumeById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.userId
  });

  if (!resume) {
    res.status(404).json({
      success: false,
      message: 'Resume not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    resume
  });
});

export const deleteResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const resume = await Resume.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  if (!resume) {
    res.status(404).json({
      success: false,
      message: 'Resume not found'
    });
    return;
  }

  // Delete file from storage
  fs.unlink(resume.filePath, (err) => {
    if (err) console.error('Error deleting file:', err);
  });

  res.status(200).json({
    success: true,
    message: 'Resume deleted successfully'
  });
});
