# 🚀 Deployment Guide - Vercel

Complete step-by-step guide to deploy FinanceTracker on Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Railway account for MySQL database (or any MySQL provider)
- Google Gemini API key

## 🗂️ Project Structure for Deployment

```
finance-tracker/
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── vercel.json       # Vercel configuration
└── README.md
```

---

## 🎯 Part 1: Prepare Your Code

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Finance Tracker App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/finance-tracker.git
git branch -M main
git push -u origin main
```

---

## 🔧 Part 2: Deploy Backend (FastAPI)

### Step 1: Create Backend Configuration

The `vercel.json` file is already created in the backend folder.

### Step 2: Deploy Backend to Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New" → "Project"

2. **Import Repository**
   - Click "Import Git Repository"
   - Select your `finance-tracker` repository
   - Click "Import"

3. **Configure Backend Project**
   - **Project Name**: `finance-tracker-backend`
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" → Select `backend`
   - **Build Command**: Leave empty or use `pip install -r requirements.txt`
   - **Output Directory**: Leave empty
   - **Install Command**: `pip install -r requirements.txt`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   DATABASE_URL=mysql://root:your-password@host:port/database
   SECRET_KEY=your-super-secret-jwt-key-min-32-characters
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   GEMINI_API_KEY=your-gemini-api-key
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

   **Important**: 
   - Use your Railway MySQL connection string for `DATABASE_URL`
   - Generate a strong `SECRET_KEY` (at least 32 characters)
   - You'll update `FRONTEND_URL` after deploying frontend

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Copy your backend URL (e.g., `https://finance-tracker-backend.vercel.app`)

### Step 3: Test Backend

Visit: `https://your-backend-url.vercel.app/`

You should see: `{"message": "Finance Tracker API is running!"}`

---

## 🎨 Part 3: Deploy Frontend (React)

### Step 1: Update Frontend Environment

Before deploying, you need to know your backend URL from Part 2.

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Click "Add New" → "Project"

2. **Import Same Repository**
   - Select your `finance-tracker` repository again
   - Click "Import"

3. **Configure Frontend Project**
   - **Project Name**: `finance-tracker-frontend` (or just `finance-tracker`)
   - **Framework Preset**: Vite
   - **Root Directory**: Click "Edit" → Select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

   Replace with your actual backend URL from Part 2.

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Copy your frontend URL (e.g., `https://finance-tracker.vercel.app`)

### Step 3: Update Backend CORS

1. **Go back to Backend Project** in Vercel
2. **Settings** → **Environment Variables**
3. **Edit** `FRONTEND_URL` variable
4. **Update** with your frontend URL: `https://your-frontend-url.vercel.app`
5. **Save**
6. **Redeploy** backend:
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## ✅ Part 4: Verify Deployment

### Test Your Application

1. **Visit Frontend URL**: `https://your-frontend-url.vercel.app`
2. **Create Account**: Register a new user
3. **Login**: Sign in with your credentials
4. **Test Features**:
   - Add a transaction
   - Create a budget
   - Chat with AI assistant

### Check Backend Health

Visit: `https://your-backend-url.vercel.app/health`

Should return: `{"status": "healthy"}`

---

## 🔧 Part 5: Custom Domain (Optional)

### Add Custom Domain to Frontend

1. **Go to Frontend Project** in Vercel
2. **Settings** → **Domains**
3. **Add Domain**: Enter your domain (e.g., `financetracker.com`)
4. **Follow DNS Instructions**: Update your domain's DNS records
5. **Wait for Verification** (can take up to 48 hours)

### Add Custom Domain to Backend

1. **Go to Backend Project** in Vercel
2. **Settings** → **Domains**
3. **Add Domain**: Enter subdomain (e.g., `api.financetracker.com`)
4. **Update Frontend Environment Variable**:
   - Change `VITE_API_URL` to `https://api.financetracker.com`
   - Redeploy frontend

---

## 🐛 Troubleshooting

### Backend Issues

**Error: "Module not found"**
- Check `requirements.txt` is in backend folder
- Verify all dependencies are listed
- Redeploy

**Error: "Database connection failed"**
- Verify `DATABASE_URL` in environment variables
- Check Railway database is running
- Ensure IP whitelist allows Vercel (use 0.0.0.0/0 for all IPs)

**Error: "Internal Server Error"**
- Check Vercel logs: Project → Deployments → Click deployment → View Function Logs
- Look for Python errors

### Frontend Issues

**Error: "API connection failed"**
- Verify `VITE_API_URL` is correct
- Check backend is deployed and running
- Test backend URL directly in browser

**Error: "Blank page"**
- Check browser console (F12)
- Verify build completed successfully
- Check Vercel build logs

**Error: "CORS error"**
- Verify `FRONTEND_URL` in backend environment variables
- Must match exactly (including https://)
- Redeploy backend after changing

### Database Issues

**Error: "Too many connections"**
- Railway free tier has connection limits
- Add connection pooling in backend
- Upgrade Railway plan

---

## 📊 Monitoring & Logs

### View Backend Logs

1. Go to Backend Project in Vercel
2. Click "Deployments"
3. Click on latest deployment
4. Click "View Function Logs"
5. See real-time logs

### View Frontend Logs

1. Go to Frontend Project in Vercel
2. Click "Deployments"
3. Click on latest deployment
4. Check build logs for errors

---

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy new version
4. Update the live site

---

## 💰 Pricing

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Serverless functions (limited)

### Railway Free Tier Includes:
- ✅ $5 free credit/month
- ✅ MySQL database
- ✅ 500 hours/month

---

## 🔐 Security Checklist

Before going live:

- [ ] Change `SECRET_KEY` to a strong random string
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set proper CORS origins
- [ ] Review Railway database security settings
- [ ] Enable rate limiting (if needed)
- [ ] Set up monitoring and alerts

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
DATABASE_URL=mysql://root:password@host:port/database
SECRET_KEY=your-super-secret-jwt-key-min-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=your-gemini-api-key
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.vercel.app
```

---

## 🎉 Success!

Your Finance Tracker app is now live!

- **Frontend**: https://your-frontend-url.vercel.app
- **Backend**: https://your-backend-url.vercel.app
- **Database**: Railway MySQL

Share your app with friends and start tracking finances! 💰

---

## 📞 Need Help?

- Vercel Documentation: https://vercel.com/docs
- Railway Documentation: https://docs.railway.app
- Check Vercel Community: https://github.com/vercel/vercel/discussions

---

## 🚀 Next Steps

1. Set up custom domain
2. Add analytics (Vercel Analytics)
3. Set up error tracking (Sentry)
4. Enable monitoring
5. Add more features!

**Happy Deploying! 🎊**