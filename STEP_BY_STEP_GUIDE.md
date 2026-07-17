# 📖 COMPLETE STEP-BY-STEP ACCESS & SETUP GUIDE

## 🎯 What You'll Have at the End
- ✅ Project running locally on your computer
- ✅ Web app accessible at http://localhost:3000
- ✅ Can upload resumes and get AI analysis
- ✅ Can deploy online for free

---

## 📋 PREREQUISITES (Do This First!)

### Step 1: Install Node.js (15 minutes)

**Windows/Mac/Linux:**
1. Go to: https://nodejs.org
2. Download "LTS" version (Long Term Support)
3. Run installer and click "Next" for all options
4. Click "Install"
5. Restart your computer

**Verify Installation:**
```bash
node --version
npm --version
```

You should see version numbers (like v18.0.0)

### Step 2: Install Git (10 minutes)

**Windows:**
1. Go to: https://git-scm.com/download/win
2. Download and run installer
3. Click "Next" for all options

**Mac:**
```bash
# If you have Homebrew
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

**Verify Installation:**
```bash
git --version
```

### Step 3: Install MongoDB (20 minutes) - OPTIONAL

**Option A: Use MongoDB Locally (Easier for Testing)**

Download: https://www.mongodb.com/try/download/community

**Windows:**
1. Download installer
2. Run installer
3. Click "Next" for all options
4. Leave default settings
5. Click "Install"

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux:**
```bash
wget -qO - https://www.mongodb.com/static/pgp/server-5.0.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install mongodb-org
```

**Option B: Use MongoDB Cloud (Easier - No Installation)**

We'll do this in Step 2 of the setup process.

---

## 🚀 PART 1: GET YOUR CODE (5 minutes)

### Step 1: Open Terminal/Command Prompt

**Windows:**
- Press `Win + R`
- Type `cmd`
- Press Enter

**Mac/Linux:**
- Press `Cmd + Space`
- Type `Terminal`
- Press Enter

### Step 2: Create Project Folder

```bash
# Go to your Desktop or Documents
cd Desktop

# Create folder
mkdir my-resume-project

# Go into folder
cd my-resume-project
```

### Step 3: Clone Your GitHub Repository

```bash
git clone https://github.com/khankhaani703-afk/ai-resume-builder-and-analyzer.git

cd ai-resume-builder-and-analyzer
```

**You should see:**
```
backend/
frontend/
README.md
FREE_SETUP_GUIDE.md
... and other files
```

✅ Your code is now on your computer!

---

## 🔧 PART 2: SETUP BACKEND (10 minutes)

### Step 1: Go to Backend Folder

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

**This downloads all required packages (takes 2-3 minutes)**

You'll see:
```
added XXX packages in XXs
```

### Step 3: Create Environment File

**Windows (Command Prompt):**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

### Step 4: Configure MongoDB

**Open `.env` file:**

**Windows:**
- Go to folder `backend/`
- Find `.env` file
- Right-click → "Open with" → Notepad

**Mac/Linux:**
```bash
nano .env
```

**Edit the file:**

If using **Local MongoDB** (installed on your computer):
```
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
```

If using **MongoDB Cloud** (Create free account):
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Create Free Account"
3. Fill form and verify email
4. Create free cluster (M0)
5. Get connection string
6. Replace in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-resume-builder
```

**Other settings (Keep as is):**
```
USE_LOCAL_AI=true
JWT_SECRET=your_jwt_secret_key_here_change_this
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Save file:**
- Windows: `Ctrl + S`
- Mac: `Cmd + S`
- Linux: `Ctrl + X` then `Y` then `Enter`

### Step 5: Start Backend Server

```bash
npm run dev
```

**You should see:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📋 API URL: http://localhost:5000
```

✅ **Backend is running!**

**Don't close this terminal!**

---

## 🎨 PART 3: SETUP FRONTEND (10 minutes)

### Step 1: Open New Terminal/Command Prompt

**DO NOT close the backend terminal!**

**Open a NEW terminal:**

**Windows:**
- Press `Win + R`
- Type `cmd`
- Press Enter

**Mac/Linux:**
- Press `Cmd + T` or open new terminal

### Step 2: Go to Frontend Folder

```bash
# Navigate to your project folder
cd Desktop/my-resume-project/ai-resume-builder-and-analyzer

# Go to frontend
cd frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

**Takes 2-3 minutes**

### Step 4: Create Environment File

**Windows:**
```bash
copy .env.example .env.local
```

**Mac/Linux:**
```bash
cp .env.example .env.local
```

### Step 5: Configure Frontend

**Open `.env.local` file:**

**Windows:**
- Go to folder `frontend/`
- Find `.env.local`
- Right-click → Open with Notepad

**Mac/Linux:**
```bash
nano .env.local
```

**Content should be:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=AI Resume Builder & Analyzer
```

**Leave as is - Save and close**

### Step 6: Start Frontend Server

```bash
npm run dev
```

**You should see:**
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

✅ **Frontend is running!**

---

## 🌐 PART 4: ACCESS YOUR APP (2 minutes)

### Step 1: Open Web Browser

- Chrome
- Firefox
- Safari
- Edge

### Step 2: Go to Your App

**Type in address bar:**
```
http://localhost:3000
```

**Press Enter**

✅ **You should see your app's home page!**

---

## 🧪 PART 5: TEST YOUR APP (15 minutes)

### Step 1: Create Account

1. Click "Sign Up" button
2. Fill in:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Register"
4. You should be redirected to Dashboard

✅ **Account created!**

### Step 2: Upload Resume

1. Click upload area or drag & drop
2. Select a PDF or DOCX file from your computer
   - (If you don't have one, create a simple text file and rename to `.pdf`)
3. Wait for upload confirmation
4. You should see the resume in your dashboard

✅ **Resume uploaded!**

### Step 3: Analyze Resume

1. Click "Analyze" button on your resume
2. Wait 2-3 seconds
3. You'll see:
   - Overall Feedback
   - Strengths
   - Areas for Improvement
   - Suggestions

✅ **AI Analysis working!**

### Step 4: Calculate ATS Score

1. Scroll down to "ATS Compatibility Score"
2. Paste a job description (any job posting)
3. Click "Calculate ATS Score"
4. You'll see a percentage score

✅ **ATS Score working!**

### Step 5: Test Job Matching

1. Upload another resume (optional)
2. Test different job descriptions
3. See how well your resume matches

✅ **All features working!**

---

## 📱 PART 6: TROUBLESHOOTING

### Problem: "Cannot connect to server"

**Solution:**
1. Check if backend is running (Terminal 1)
2. See if you have `✅ MongoDB connected successfully`
3. Restart backend:
   - Press `Ctrl + C` in backend terminal
   - Run `npm run dev` again

### Problem: "Port 5000 already in use"

**Solution:**
1. Open `.env` in backend folder
2. Change `PORT=5000` to `PORT=5001`
3. Restart backend
4. In frontend `.env.local`, change:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   ```
5. Restart frontend

### Problem: "MongoDB connection failed"

**Solution:**
1. If using local MongoDB:
   - Make sure MongoDB is running
   - Windows: Check Services
   - Mac/Linux: Run `mongod` in another terminal

2. If using MongoDB Cloud:
   - Check your connection string in `.env`
   - Make sure IP is whitelisted in Atlas
   - Check username and password

### Problem: "npm: command not found"

**Solution:**
1. Node.js not installed
2. Go to https://nodejs.org
3. Download and install LTS version
4. Restart terminal
5. Try again

### Problem: "Can't upload file"

**Solution:**
1. File must be PDF or DOCX
2. File size must be less than 10MB
3. Create uploads folder:
   ```bash
   mkdir backend/uploads
   ```

---

## 🚀 PART 7: DEPLOY ONLINE (FREE!)

### Deploy Frontend (Vercel - 5 minutes)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
cd frontend
vercel
```

**Step 3: Follow prompts**
- Link to GitHub (yes)
- Deploy (yes)
- Your app is now online!

**Your frontend URL:** `https://your-app.vercel.app`

### Deploy Backend (Railway - 10 minutes)

**Step 1: Go to Railway.app**
1. https://railway.app
2. Sign up with GitHub (free)

**Step 2: Create new project**
1. Click "New Project"
2. Select "GitHub Repo"
3. Select your repository

**Step 3: Configure**
1. Select `backend` directory
2. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel URL

**Step 4: Deploy**
1. Click "Deploy"
2. Wait 2-3 minutes
3. Get your API URL

**Step 5: Update Frontend**
1. Go to Vercel dashboard
2. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your Railway API URL
3. Redeploy

✅ **Your app is online!**

---

## 📊 DIRECTORY STRUCTURE

```
ai-resume-builder-and-analyzer/
│
├── backend/                    (Your backend code)
│   ├── src/
│   │   ├── config/            (Database setup)
│   │   ├── models/            (Database schemas)
│   │   ├── controllers/        (Business logic)
│   │   ├── routes/            (API endpoints)
│   │   ├── middleware/        (Auth & errors)
│   │   ├── services/          (AI analysis)
│   │   └── server.ts          (Main file)
│   ├── uploads/               (Resume files go here)
│   ├── .env                   (Your config)
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   (Your frontend code)
│   ├── app/
│   │   ├── page.tsx           (Home page)
│   │   ├── login/             (Login)
│   │   ├── register/          (Registration)
│   │   ├── dashboard/         (Main dashboard)
│   │   ├── analyze/           (Analysis page)
│   │   ├── layout.tsx         (Layout)
│   │   └── globals.css        (Styles)
│   ├── components/            (React components)
│   ├── lib/
│   │   ├── api.ts             (API client)
│   │   └── store/             (State management)
│   ├── .env.local             (Your config)
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                   (Project info)
├── FREE_SETUP_GUIDE.md         (This guide)
├── SETUP.md                    (Setup details)
├── DEVELOPMENT.md              (Development guide)
├── DEPLOYMENT.md               (Deployment guide)
└── docker-compose.yml          (Docker setup)
```

---

## 🎓 WHAT YOU LEARNED

✅ How to clone a GitHub repository
✅ How to install dependencies with npm
✅ How to configure environment variables
✅ How to run a backend server
✅ How to run a frontend app
✅ How to test your application
✅ How to deploy online for free
✅ How to use a full-stack application

---

## 📞 QUICK REFERENCE

### Commands You Used

```bash
# Clone project
git clone https://github.com/khankhaani703-afk/ai-resume-builder-and-analyzer.git

# Install backend
cd backend && npm install

# Start backend
npm run dev

# Install frontend (new terminal)
cd frontend && npm install

# Start frontend
npm run dev

# Access app
http://localhost:3000

# Deploy frontend
npm install -g vercel && vercel
```

---

## ✅ FINAL CHECKLIST

- [ ] Node.js installed
- [ ] Git installed
- [ ] MongoDB installed or account created
- [ ] Project cloned
- [ ] Backend `.env` configured
- [ ] Backend running on port 5000
- [ ] Frontend `.env.local` configured
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can create account
- [ ] Can upload resume
- [ ] Can analyze resume
- [ ] Can calculate ATS score
- [ ] Ready to deploy!

---

## 🎉 YOU'RE DONE!

Your AI Resume Builder is now:
- ✅ Running locally
- ✅ Fully functional
- ✅ Ready to deploy
- ✅ Completely free

**Share your project link:**
```
https://github.com/khankhaani703-afk/ai-resume-builder-and-analyzer
```

**Happy coding!** 🚀💚
