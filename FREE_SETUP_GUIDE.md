# Complete Guide: Free Tools AI Resume Builder

## 🎉 100% FREE Setup

Your AI Resume Builder now uses **completely free tools**! No credit card required.

## 🛠️ Free Tools Used

### Frontend
- **Next.js** - Free & Open Source
- **React** - Free & Open Source
- **Tailwind CSS** - Free & Open Source
- **Zustand** - Free state management
- **Axios** - Free HTTP client
- **Lucide React** - Free icons
- **React Hot Toast** - Free notifications

### Backend
- **Node.js** - Free & Open Source
- **Express.js** - Free web framework
- **MongoDB Community** - Free database
- **JWT** - Free authentication
- **Multer** - Free file upload handler
- **pdf-parse** - Free PDF parser
- **mammoth** - Free DOCX parser

### AI & Analysis
- **Local Rule-Based AI** - COMPLETELY FREE (Built-in)
- **HuggingFace API** - FREE tier available (optional)

### Deployment (All FREE Tiers)
- **Vercel** - Free frontend hosting
- **Railway/Render** - Free backend hosting
- **MongoDB Atlas** - 512MB free database

---

## 🚀 How It Works - Free AI Analysis

### Option 1: Local Rule-Based Analysis (RECOMMENDED - NO API NEEDED)

The backend includes a built-in AI analyzer that:
- Detects technical skills
- Checks for education section
- Analyzes experience
- Identifies projects
- Provides suggestions
- Calculates ATS score
- Matches jobs with resume

**Cost: $0** ✅

**How it works:**
```
Resume Upload → Local Analysis → Results
                (No API calls)
```

### Option 2: HuggingFace Free API (Optional)

If you want cloud-based AI analysis:

1. **Get Free API Key**
   - Go to: https://huggingface.co/settings/tokens
   - Create free account
   - Generate API token
   - Copy token

2. **Add to backend/.env**
   ```
   HUGGINGFACE_API_KEY=your_token_here
   USE_LOCAL_AI=false
   ```

3. **Free Tier Limits**
   - Unlimited API calls
   - Rate limit: 30,000 calls/month
   - Perfect for small projects

**Cost: $0** ✅

---

## 💾 Free Database Options

### Option 1: Local MongoDB (Fastest - NO SETUP NEEDED)

Already configured in the project!

```bash
# Install MongoDB (Free)
# https://docs.mongodb.com/manual/installation/

# Run MongoDB
mongod

# In .env
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
```

**Cost: $0**

### Option 2: MongoDB Atlas Cloud (FREE TIER)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up (free)
   - No credit card required for free tier

2. **Create Cluster**
   - Click "Create a Deployment"
   - Select "M0 Sandbox" (Free)
   - Choose region
   - Create cluster (takes 1-2 minutes)

3. **Get Connection String**
   - Click "Connect"
   - Select "Connection string"
   - Copy string
   - Update in backend/.env

4. **Connection String Format**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-builder?retryWrites=true&w=majority
   ```

**Cost: $0** (Free tier: 512MB storage)

---

## 🌐 Free Hosting/Deployment

### Frontend - Vercel (FREE)

1. **Setup**
   - Push code to GitHub
   - Go to: https://vercel.com
   - Sign in with GitHub
   - Import your repository
   - Select `frontend` directory
   - Deploy (takes 2-3 minutes)

2. **Your App URL**
   - `https://your-project.vercel.app`

**Cost: $0** (Free tier includes 100GB bandwidth/month)

### Backend - Railway or Render (FREE)

#### Option A: Railway (Recommended)

1. **Setup**
   - Go to: https://railway.app
   - Sign up with GitHub (free)
   - New Project → GitHub Repo
   - Select `backend` directory

2. **Environment Variables**
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - FRONTEND_URL

3. **Deploy**
   - Click Deploy
   - Get API URL: `https://your-project-api.railway.app`

**Cost: $0** (Free tier: $5 credit/month)

#### Option B: Render

1. **Setup**
   - Go to: https://render.com
   - Sign up (free)
   - New Web Service
   - Connect GitHub repository

2. **Configuration**
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Add environment variables

3. **Deploy**
   - Click "Create Web Service"
   - Get API URL automatically

**Cost: $0** (Free tier: 750 compute hours/month)

---

## 📋 Complete Free Setup Checklist

### Backend
- [ ] Node.js installed (free)
- [ ] MongoDB installed locally OR MongoDB Atlas account (free)
- [ ] Environment variables configured
- [ ] No API keys needed for local analysis
- [ ] `npm install` completed
- [ ] `npm run dev` works

### Frontend
- [ ] Node.js installed (free)
- [ ] Environment variables configured
- [ ] `npm install` completed
- [ ] `npm run dev` works
- [ ] Can access `http://localhost:3000`

### Testing
- [ ] Can register account
- [ ] Can upload resume
- [ ] AI analysis works (local, free)
- [ ] ATS score calculates
- [ ] Job matching works

### Deployment (Optional)
- [ ] Frontend deployed on Vercel (free)
- [ ] Backend deployed on Railway/Render (free)
- [ ] MongoDB Atlas connected (free tier)
- [ ] Both apps accessible online

---

## 🎯 Cost Breakdown

| Component | Cost | Alternative |
|-----------|------|-------------|
| Frontend | FREE (Vercel) | - |
| Backend | FREE (Railway/Render) | - |
| Database | FREE (MongoDB Atlas 512MB) | Local MongoDB (FREE) |
| AI Analysis | FREE (Local) | HuggingFace (FREE) |
| File Upload | FREE (Multer) | - |
| PDF Parsing | FREE (pdf-parse) | - |
| DOCX Parsing | FREE (mammoth) | - |
| **TOTAL** | **$0** | - |

---

## 🚀 Quick Start (All FREE)

### 1. Clone Repository
```bash
git clone https://github.com/khankhaani703-afk/ai-resume-builder-and-analyzer.git
cd ai-resume-builder-and-analyzer
```

### 2. Install Dependencies (Free)
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Setup Environment (Free)
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env - MongoDB is FREE, no API key needed

# Frontend
cd ../frontend
cp .env.example .env.local
# No changes needed
```

### 4. Run Locally (Free)
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Access: http://localhost:3000
```

### 5. Deploy for FREE

**Frontend:**
```bash
npm install -g vercel
vercel
```

**Backend:** Use Railway or Render (connect GitHub)

---

## 💡 How to Update to Paid (Optional)

When your project grows, upgrade anytime:

### Claude/GPT API (Paid)
```typescript
// Replace local analysis with Claude API
import Anthropic from '@anthropic-ai/sdk';
```

### Better Hosting (Paid)
- Vercel Pro: $20/month
- Railway Pro: $10+/month
- AWS: Pay as you go

---

## 📚 Learning Resources (All FREE)

- **Next.js Docs**: https://nextjs.org/docs (free)
- **Express.js Docs**: https://expressjs.com (free)
- **MongoDB University**: https://learn.mongodb.com (free courses)
- **Node.js Guide**: https://nodejs.org/docs (free)
- **Tailwind CSS**: https://tailwindcss.com/docs (free)

---

## ⚠️ Important Notes

1. **Local AI Analysis**
   - Built-in, no API costs
   - Works offline
   - Instant results
   - 100% free

2. **MongoDB Atlas Free Tier**
   - 512MB storage
   - Shared cluster
   - Perfect for learning
   - Upgrade anytime

3. **Vercel Free Tier**
   - Unlimited deployments
   - 100GB bandwidth/month
   - Auto SSL
   - Perfect for projects

4. **Railway/Render Free Tier**
   - Limited hours
   - Great for small apps
   - Easy scaling
   - Try before paying

---

## 🎓 This Project Teaches

✅ Full-stack development
✅ Free tools & open source
✅ AI integration (local & cloud)
✅ Database design
✅ API development
✅ Authentication
✅ File handling
✅ Deployment
✅ Cost optimization

---

**Everything is FREE! Start building now!** 🚀
