import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITemplate extends Document {
  name: string;
  description: string;
  content: string;
  category: string;
  createdAt: Date;
}

const templateSchema = new Schema<ITemplate>(
  {
    name: {
      type: String,
      required: [true, 'Template name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Template description is required']
    },
    content: {
      type: String,
      required: [true, 'Template content is required']
    },
    category: {
      type: String,
      required: [true, 'Template category is required'],
      enum: ['professional', 'creative', 'modern', 'simple']
    }
  },
  {
    timestamps: true
  }
);

const Template: Model<ITemplate> = mongoose.model<ITemplate>('Template', templateSchema);

export default Template;
