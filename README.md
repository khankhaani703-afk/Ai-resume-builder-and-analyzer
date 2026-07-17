# AI Resume Builder & Analyzer

A full-stack web application that uses Google Gemini AI to analyze, optimize, and improve resumes. Built with Next.js, Node.js, MongoDB, and Google Gemini API.

## Features

✅ **User Authentication** - Sign up/Login with JWT
✅ **Resume Upload** - Support for PDF and DOCX files
✅ **AI Resume Analysis** - Get detailed feedback using Google Gemini
✅ **Optimization Suggestions** - Get actionable improvements
✅ **ATS Score** - Calculate Applicant Tracking System compatibility score
✅ **Resume Templates** - Multiple professional templates
✅ **Job Matching** - Match resume with job descriptions
✅ **Multiple Resumes** - Manage multiple resumes
✅ **Download Improved Resume** - Export optimized resume

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **pdf-parse** - PDF parsing
- **docx** - DOCX parsing

### AI
- **Google Gemini API** - AI analysis and suggestions

## Project Structure

```
ai-resume-builder-and-analyzer/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   ├── types/              # TypeScript types
│   └── public/             # Static files
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── config/         # Configuration
│   └── server.ts           # Server entry point
├── docker-compose.yml       # Docker setup
├── .env.example            # Environment variables template
└── docs/                   # Documentation
```

## Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
# MONGODB_URI=your_mongodb_connection_string
# GEMINI_API_KEY=your_gemini_api_key
# JWT_SECRET=your_jwt_secret

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file
cp .env.example .env.local

# Add API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000

npm run dev
```

Access the app at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token

### Resumes
- `POST /api/resumes/upload` - Upload resume file
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get specific resume
- `DELETE /api/resumes/:id` - Delete resume

### Analysis
- `POST /api/analysis/analyze` - Analyze resume with Gemini
- `POST /api/analysis/optimize` - Get optimization suggestions
- `POST /api/analysis/ats-score` - Calculate ATS score
- `POST /api/analysis/job-match` - Match resume with job description

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get specific template

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/db_name
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=AI Resume Builder
```

## Getting Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create new API key"
3. Copy the API key
4. Add it to your `.env` file

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Backend (Railway/Render)
1. Create account on Railway or Render
2. Connect GitHub repository
3. Add environment variables
4. Deploy

## Usage

1. **Sign Up** - Create a new account
2. **Upload Resume** - Upload your resume (PDF or DOCX)
3. **Analyze** - Get AI-powered analysis
4. **Review Suggestions** - See optimization recommendations
5. **Check ATS Score** - View compatibility score
6. **Download** - Export improved resume
7. **Job Matching** - Match with job descriptions

## Contributing

Fork the repository and create a pull request with your improvements.

## License

MIT License - feel free to use this project for educational and commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

**Made for final year students learning full-stack development!** 🚀
