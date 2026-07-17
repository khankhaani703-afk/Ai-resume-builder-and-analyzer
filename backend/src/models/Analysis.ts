import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
  overallFeedback: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsScore: number;
  keywordAnalysis: string[];
  createdAt: Date;
  updatedAt: Date;
}

const analysisSchema = new Schema<IAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
      required: true
    },
    overallFeedback: {
      type: String,
      required: true
    },
    strengths: [{
      type: String
    }],
    weaknesses: [{
      type: String
    }],
    suggestions: [{
      type: String
    }],
    atsScore: {
      type: Number,
      min: 0,
      max: 100
    },
    keywordAnalysis: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
);

const Analysis: Model<IAnalysis> = mongoose.model<IAnalysis>('Analysis', analysisSchema);

export default Analysis;
