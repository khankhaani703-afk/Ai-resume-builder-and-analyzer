import { Request, Response } from 'express';
import Template, { ITemplate } from '../models/Template';
import { asyncHandler } from '../middleware/errorHandler';

export const getTemplates = asyncHandler(async (req: Request, res: Response) => {
  const templates = await Template.find().select('-content');

  res.status(200).json({
    success: true,
    count: templates.length,
    templates
  });
});

export const getTemplateById = asyncHandler(async (req: Request, res: Response) => {
  const template = await Template.findById(req.params.id);

  if (!template) {
    res.status(404).json({
      success: false,
      message: 'Template not found'
    });
    return;
  }

  res.status(200).json({
    success: true,
    template
  });
});
