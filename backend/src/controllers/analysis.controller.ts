import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Analysis, { IAnalysis } from '../models/Analysis';
import Resume from '../models/Resume';
import { analyzeResumeWithAI, calculateATSScore, matchJobWithResume } from '../services/aiAnalysis';
import { asyncHandler } from '../middleware/errorHandler';

export const analyzeResume = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { resumeId } = req.body;

  if (!resumeId) {
    res.status(400).json({
      success: false,
      message: 'Resume ID is required'
    });
    return;
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    userId: req.userId
  });

  if (!resume) {
    res.status(404).json({
      success: false,
      message: 'Resume not found'
    });
    return;
  }

  try {
    // Use free local AI analysis (NO API COST)
    const analysisData = await analyzeResumeWithAI(resume.textContent);

    const analysis = new Analysis({
      userId: req.userId,
      resumeId,
      overallFeedback: analysisData.overallFeedback,
      strengths: analysisData.strengths || [],
      weaknesses: analysisData.weaknesses || [],
      suggestions: analysisData.suggestions || [],
      keywordAnalysis: analysisData.keywordAnalysis || [],
      atsScore: 75
    });

    await analysis.save();

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully (Using Free AI Analysis)',
      analysis
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Analysis failed',
      error: error.message
    });
  }
});

export const getATSScore = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { resumeId, jobDescription } = req.body;

  if (!resumeId || !jobDescription) {
    res.status(400).json({
      success: false,
      message: 'Resume ID and job description are required'
    });
    return;
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    userId: req.userId
  });

  if (!resume) {
    res.status(404).json({
      success: false,
      message: 'Resume not found'
    });
    return;
  }

  try {
    // Free local ATS score calculation
    const atsScore = calculateATSScore(resume.textContent, jobDescription);

    res.status(200).json({
      success: true,
      message: 'ATS score calculated successfully (Free Analysis)',
      atsScore
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'ATS calculation failed',
      error: error.message
    });
  }
});

export const jobMatch = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { resumeId, jobDescription } = req.body;

  if (!resumeId || !jobDescription) {
    res.status(400).json({
      success: false,
      message: 'Resume ID and job description are required'
    });
    return;
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    userId: req.userId
  });

  if (!resume) {
    res.status(404).json({
      success: false,
      message: 'Resume not found'
    });
    return;
  }

  try {
    // Free local job matching
    const matchData = matchJobWithResume(resume.textContent, jobDescription);

    const recommendations = [
      `Your profile matches ${matchData.matchPercentage}% of the job requirements`,
      `Focus on acquiring: ${matchData.missingSkills.join(', ')}`,
      'Update your resume with these missing skills to improve chances',
      'Use the exact terminology from the job description'
    ];

    res.status(200).json({
      success: true,
      message: 'Job matching completed (Free Analysis)',
      matchData: {
        ...matchData,
        recommendations: recommendations.slice(0, 3)
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Job matching failed',
      error: error.message
    });
  }
});
