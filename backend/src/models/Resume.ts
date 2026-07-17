import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  fileName: string;
  filePath: string;
  fileType: 'pdf' | 'docx';
  textContent: string;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true
    },
    fileName: {
      type: String,
      required: [true, 'File name is required']
    },
    filePath: {
      type: String,
      required: [true, 'File path is required']
    },
    fileType: {
      type: String,
      enum: ['pdf', 'docx'],
      required: [true, 'File type is required']
    },
    textContent: {
      type: String,
      required: [true, 'Text content is required']
    }
  },
  {
    timestamps: true
  }
);

const Resume: Model<IResume> = mongoose.model<IResume>('Resume', resumeSchema);

export default Resume;
