# ✅ Deployment Checklist

## Before Deployment

### 1. Code Preparation
- [ ] All code committed to GitHub
- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` files are committed
- [ ] No sensitive data in code
- [ ] All dependencies listed in `requirements.txt` and `package.json`

### 2. Database Setup
- [ ] Railway MySQL database created
- [ ] Database connection string ready
- [ ] Database accessible from internet (0.0.0.0/0 whitelist)

### 3. API Keys Ready
- [ ] Google Gemini API key obtained
- [ ] JWT secret key generated (32+ characters)

---

## 🔴 Backend Deployment (Vercel)

### Step 1: Create New Project
- [ ] Login to Vercel
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository

### Step 2: Configure Backend
- [ ] Project name: `finance-tracker-backend`
- [ ] Root directory: `backend`
- [ ] Framework: Other
- [ ] Build command: (leave empty)
- [ ] Output directory: (leave empty)

### Step 3: Environment Variables
Add these in Vercel dashboard:

```
DATABASE_URL=mysql://root:WovAdyFQtvIRsggjpoUmNpwyeGocQEKu@hopper.proxy.rlwy.net:38912/railway
SECRET_KEY=generate-a-strong-random-32-character-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=AIzaSyCfjFVXxxEi6bvzEHza6tUWU1E7Anjh8uM
FRONTEND_URL=https://your-frontend-url.vercel.app
```

- [ ] All environment variables added
- [ ] Values are correct
- [ ] No trailing spaces

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Copy backend URL (e.g., `https://finance-tracker-backend.vercel.app`)
- [ ] Test: Visit `https://your-backend-url.vercel.app/` - should see welcome message

---

## 🔵 Frontend Deployment (Vercel)

### Step 1: Create New Project
- [ ] Click "Add New" → "Project" again
- [ ] Import same GitHub repository

### Step 2: Configure Frontend
- [ ] Project name: `finance-tracker` or `finance-tracker-frontend`
- [ ] Root directory: `frontend`
- [ ] Framework: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Install command: `npm install`

### Step 3: Environment Variables
Add in Vercel dashboard:

```
VITE_API_URL=https://your-backend-url.vercel.app
```

- [ ] Backend URL is correct (from Step 4 of backend deployment)
- [ ] No trailing slash in URL

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Copy frontend URL (e.g., `https://finance-tracker.vercel.app`)

---

## 🔄 Post-Deployment

### Step 1: Update Backend CORS
- [ ] Go to backend project in Vercel
- [ ] Settings → Environment Variables
- [ ] Edit `FRONTEND_URL`
- [ ] Set to your frontend URL: `https://your-frontend-url.vercel.app`
- [ ] Save
- [ ] Redeploy backend (Deployments → ... → Redeploy)

### Step 2: Test Everything
- [ ] Visit frontend URL
- [ ] Register a new account
- [ ] Login successfully
- [ ] Add a transaction
- [ ] Create a budget
- [ ] Test AI assistant
- [ ] Check all pages load correctly
- [ ] Test on mobile device

---

## 🎯 Quick Commands

### Generate Strong Secret Key (Python)
```python
import secrets
print(secrets.token_urlsafe(32))
```

### Test Backend Locally Before Deploy
```bash
cd backend
uvicorn app.main:app --reload
```

### Test Frontend Build
```bash
cd frontend
npm run build
npm run preview
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Module not found" in Backend
**Solution**: 
- Check `requirements.txt` has all packages
- Redeploy

### Issue 2: "CORS Error" in Frontend
**Solution**:
- Verify `FRONTEND_URL` in backend matches frontend URL exactly
- Include `https://` protocol
- Redeploy backend

### Issue 3: "Database Connection Failed"
**Solution**:
- Check Railway database is running
- Verify `DATABASE_URL` is correct
- Ensure Railway allows external connections

### Issue 4: "Build Failed"
**Solution**:
- Check Vercel build logs
- Verify all dependencies are installed
- Check for syntax errors

### Issue 5: "AI Assistant Not Working"
**Solution**:
- Verify `GEMINI_API_KEY` is set
- Check API key is valid
- Test with `backend/test_ai_studio_key.py` locally first

---

## 📊 Monitoring

### Vercel Analytics (Optional)
1. Go to Project Settings
2. Enable "Analytics"
3. View traffic and performance

### Error Tracking
- Check Vercel Function Logs for backend errors
- Use browser console for frontend errors

---

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ Frontend loads at your Vercel URL
- ✅ Can register and login
- ✅ Can add transactions
- ✅ Can create budgets
- ✅ AI assistant responds
- ✅ No CORS errors
- ✅ All pages are accessible
- ✅ Mobile responsive works

---

## 📱 Share Your App

Once deployed, share your app:
- Frontend URL: `https://your-app.vercel.app`
- Create demo account for testing
- Share with friends and colleagues!

---

## 🔄 Update Deployed App

To update your live app:

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build both projects
3. Deploy updates
4. Go live in 2-3 minutes

---

**Congratulations! Your Finance Tracker is now live! 🎊**