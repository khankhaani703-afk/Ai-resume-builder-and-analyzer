import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Analysis, { IAnalysis } from '../models/Analysis';
import Resume from '../models/Resume';
import { getGeminiModel } from '../config/gemini';
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

  const model = getGeminiModel();
  const prompt = `Analyze this resume and provide detailed professional feedback in JSON format ONLY (no extra text). Use this exact structure:
  {
    "overallFeedback": "2-3 sentences of overall assessment",
    "strengths": ["strength1", "strength2", "strength3"],
    "weaknesses": ["weakness1", "weakness2"],
    "suggestions": ["improvement1", "improvement2", "improvement3"],
    "keywordAnalysis": ["keyword1", "keyword2", "keyword3"]
  }

  Resume Content:
  ${resume.textContent}`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // Parse JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }

  const analysisData = JSON.parse(jsonMatch[0]);

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
    message: 'Resume analyzed successfully',
    analysis
  });
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

  const model = getGeminiModel();
  const prompt = `Calculate the ATS (Applicant Tracking System) compatibility score between this resume and job description.
  Return ONLY a single number between 0-100 as the score.

  Resume:
  ${resume.textContent}

  Job Description:
  ${jobDescription}`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const atsScore = parseInt(responseText.match(/\d+/)?.[0] || '0');
  const finalScore = Math.min(100, Math.max(0, atsScore));

  res.status(200).json({
    success: true,
    message: 'ATS score calculated successfully',
    atsScore: finalScore
  });
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

  const model = getGeminiModel();
  const prompt = `Analyze the match between this resume and job description. Return ONLY JSON (no extra text) with this structure:
  {
    "matchPercentage": number (0-100),
    "matchedSkills": ["skill1", "skill2"],
    "missingSkills": ["skill1", "skill2"],
    "recommendations": ["recommendation1", "recommendation2"]
  }

  Resume:
  ${resume.textContent}

  Job Description:
  ${jobDescription}`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error('Failed to parse job matching response');
  }

  const matchData = JSON.parse(jsonMatch[0]);

  res.status(200).json({
    success: true,
    message: 'Job matching completed',
    matchData
  });
});
