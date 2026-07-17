import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const USE_LOCAL_AI = process.env.USE_LOCAL_AI === 'true';

// Option 1: HuggingFace Inference API (Free Tier)
export const getHuggingFaceAnalysis = async (resumeText: string) => {
  if (!HUGGINGFACE_API_KEY) {
    throw new Error('HUGGINGFACE_API_KEY is not set');
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistral-community/Mistral-7B-Instruct-v0.1',
      {
        inputs: `Analyze this resume and provide feedback in JSON format:
{
  "overallFeedback": "summary",
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1"],
  "suggestions": ["suggestion1", "suggestion2"],
  "keywordAnalysis": ["keyword1", "keyword2"]
}

Resume:\n${resumeText}`,
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('HuggingFace API Error:', error);
    throw error;
  }
};

// Option 2: Local Rule-Based Analysis (NO API REQUIRED)
export const getLocalAnalysis = async (resumeText: string) => {
  const textLower = resumeText.toLowerCase();

  // Skills detection
  const technicalSkills = [
    'javascript', 'python', 'java', 'react', 'node.js', 'mongodb',
    'sql', 'html', 'css', 'git', 'aws', 'docker', 'typescript',
    'angular', 'vue', 'express', 'django', 'flask', 'postgresql'
  ];

  const foundSkills = technicalSkills.filter(skill =>
    textLower.includes(skill)
  );

  // Education detection
  const hasEducation = (
    textLower.includes('bachelor') ||
    textLower.includes('master') ||
    textLower.includes('degree') ||
    textLower.includes('diploma')
  );

  // Experience detection
  const hasExperience = (
    textLower.includes('experience') ||
    textLower.includes('worked') ||
    textLower.includes('years')
  );

  // Project detection
  const hasProjects = textLower.includes('project');

  // Length check
  const wordCount = resumeText.split(/\s+/).length;
  const isComprehensive = wordCount > 200;

  // Generate feedback
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  if (foundSkills.length > 5) strengths.push(`Strong technical skills: ${foundSkills.slice(0, 3).join(', ')}`);
  else if (foundSkills.length > 0) weaknesses.push('Limited technical skills listed');

  if (hasEducation) strengths.push('Education section included');
  else weaknesses.push('Missing education details');

  if (hasExperience) strengths.push('Experience section present');
  else weaknesses.push('Experience section is missing or minimal');

  if (hasProjects) strengths.push('Projects showcased');
  else suggestions.push('Add a projects section to showcase practical work');

  if (isComprehensive) strengths.push('Well-detailed resume');
  else suggestions.push('Add more details and descriptions to strengthen your resume');

  suggestions.push('Use action verbs (Led, Developed, Managed) to start bullet points');
  suggestions.push('Quantify achievements with metrics and numbers');
  suggestions.push('Include relevant keywords from job descriptions');

  return {
    overallFeedback: `Your resume contains ${foundSkills.length} relevant technical skills and is ${isComprehensive ? 'well-detailed' : 'could be more comprehensive'}. Focus on adding measurable achievements and relevant keywords.`,
    strengths: strengths.slice(0, 3),
    weaknesses: weaknesses.slice(0, 2),
    suggestions: suggestions.slice(0, 3),
    keywordAnalysis: foundSkills.slice(0, 5),
  };
};

// Main function - uses local analysis by default (FREE!)
export const analyzeResumeWithAI = async (resumeText: string) => {
  // Use free local analysis by default
  return await getLocalAnalysis(resumeText);
};

// ATS Score calculation (Local - FREE)
export const calculateATSScore = (resumeText: string, jobDescription: string): number => {
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();

  // Extract keywords from job description
  const jobKeywords = jobLower
    .split(/\W+/)
    .filter(word => word.length > 3)
    .filter(word => !['that', 'this', 'with', 'from', 'your', 'team', 'will', 'year', 'years'].includes(word));

  // Count matches
  const matches = jobKeywords.filter(keyword =>
    resumeLower.includes(keyword)
  ).length;

  // Calculate score
  const score = Math.min(100, Math.round((matches / jobKeywords.length) * 100));
  return score;
};

// Job matching (Local - FREE)
export const matchJobWithResume = (
  resumeText: string,
  jobDescription: string
): { matchPercentage: number; matchedSkills: string[]; missingSkills: string[] } => {
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();

  // Common technical skills
  const allSkills = [
    'javascript', 'python', 'java', 'c++', 'react', 'node.js', 'mongodb',
    'sql', 'html', 'css', 'git', 'aws', 'docker', 'kubernetes',
    'typescript', 'angular', 'vue', 'express', 'django', 'flask',
    'postgresql', 'mysql', 'rest api', 'graphql', 'firebase',
    'agile', 'scrum', 'jira', 'linux', 'bash', 'ci/cd'
  ];

  const matchedSkills = allSkills.filter(skill =>
    resumeLower.includes(skill) && jobLower.includes(skill)
  );

  const jobSkills = allSkills.filter(skill => jobLower.includes(skill));
  const missingSkills = jobSkills.filter(skill => !resumeLower.includes(skill));

  const matchPercentage = jobSkills.length > 0
    ? Math.round((matchedSkills.length / jobSkills.length) * 100)
    : 50;

  return {
    matchPercentage,
    matchedSkills: matchedSkills.slice(0, 5),
    missingSkills: missingSkills.slice(0, 3),
  };
};
