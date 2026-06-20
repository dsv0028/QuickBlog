# QuickBlog Deployment Guide

## Deployment Architecture

- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Database**: MongoDB Atlas (external)

---

## STEP 1: Prepare MongoDB Atlas

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create a free cluster
3. Create a database user and get connection string
4. Whitelist your Render IP (or use 0.0.0.0/0 for testing)
5. Copy the connection string (you'll need this for Render)

---

## STEP 2: Deploy Backend to Render

### Prerequisites

- GitHub account with your repository pushed
- All environment variables ready

### Steps:

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the form:
   - **Name**: `quickblog-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Paid for production)

5. Click **"Advanced"** and add environment variables:
   - `JWT_SECRET`: Your secret key (generate one with: `openssl rand -base64 32`)
   - `ADMIN_EMAIL`: Your admin email
   - `ADMIN_PASSWORD`: Your admin password
   - `MONGODB_URI`: Your MongoDB connection string
   - `IMAGEKIT_PUBLIC_KEY`: Your ImageKit public key
   - `IMAGEKIT_PRIVATE_KEY`: Your ImageKit private key
   - `IMAGEKIT_URL_ENDPOINT`: Your ImageKit URL endpoint
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: `10000` (Render requires this)

6. Click **"Create Web Service"**
7. Wait for deployment (~2-3 minutes)
8. Once deployed, copy your backend URL: `https://quickblog-api.onrender.com`

### Note on Free Plan

- Free tier will go to sleep after 15 minutes of inactivity
- Upgrade to Paid ($7/month) for always-on service

---

## STEP 3: Deploy Frontend to Vercel

### Prerequisites

- Vercel account (free, integrates with GitHub)
- Backend URL from Render (from Step 2)

### Steps:

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework**: Vite
   - **Root Directory**: `./client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: Paste your Render backend URL
     Example: `https://quickblog-api.onrender.com`

6. Click **"Deploy"**
7. Wait for deployment (~1-2 minutes)
8. Your frontend is now live at the Vercel URL!

---

## STEP 4: Update Frontend Environment

After getting your Render backend URL, update the client environment:

1. In [client/.env.example](../client/.env.example):

   ```
   VITE_API_URL = "https://your-render-url.onrender.com"
   ```

2. In Vercel dashboard:
   - Go to Settings → Environment Variables
   - Set `VITE_API_URL` to your Render backend URL
   - Redeploy

---

## Updating After Deployment

### Frontend (Vercel)

- Simply push to GitHub → Vercel auto-deploys
- Or manually trigger in Vercel dashboard

### Backend (Render)

- Push to GitHub → Render auto-deploys
- Or manually trigger in Render dashboard

---

## Troubleshooting

### CORS Errors

- Check `server.js` has `app.use(cors())` enabled
- If issues persist, add specific origin in Render:
  ```javascript
  app.use(
    cors({
      origin: "https://your-vercel-url.vercel.app",
    }),
  );
  ```

### MongoDB Connection Issues

- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas settings
- Ensure database exists in MongoDB Atlas

### Vercel Build Fails

- Check build logs in Vercel dashboard
- Verify `vite.config.js` is correct
- Ensure all dependencies are in `package.json`

### Render Build Fails

- Check build logs in Render dashboard
- Verify `server.js` starts correctly
- Ensure all dependencies are in `server/package.json`

---

## Cost Summary

- **MongoDB Atlas**: Free tier available
- **Vercel**: Free tier for frontend
- **Render**: Free tier for backend (sleeps after 15 min) or $7/month paid

**Total**: $0/month (free) or $7+/month (production-ready)

---

## Production Checklist

- [ ] JWT_SECRET is strong and secure
- [ ] Admin credentials are set and changed from example
- [ ] Database backups are configured in MongoDB Atlas
- [ ] All API keys (ImageKit, Gemini) are valid and active
- [ ] VITE_API_URL points to production backend
- [ ] CORS is properly configured
- [ ] Test login/signup functionality after deployment
- [ ] Test blog creation, comments, and image uploads
- [ ] Monitor error logs in Render and Vercel dashboards
