# AutoCross Championship - Deployment Guide

## 🚀 Netlify Deployment Instructions

### Prerequisites
- GitHub account
- Netlify account (free tier available)
- Google Cloud Console account (for API keys)

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository** for your deployment:
   - Go to GitHub.com
   - Click "New repository"
   - Name it something like `autocross-championship` or `autocross-website`
   - Make it public
   - Don't initialize with README (we already have files)

2. **Push your current code to the new repository**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up Google API Keys

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable the following APIs**:
   - YouTube Data API v3
   - Google Calendar API
   - Google Maps JavaScript API
   - Google Places API

4. **Create API Key**:
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - **IMPORTANT**: Restrict your API key:
     - Go to your API key settings
     - Under "Application restrictions", select "HTTP referrers"
     - Add your Netlify domain: `https://your-site-name.netlify.app/*`
     - Add localhost for testing: `http://localhost:8888/*`

### Step 3: Deploy to Netlify

#### Option A: Connect GitHub Repository (Recommended)

1. **Go to Netlify**: https://app.netlify.com/
2. **Click "New site from Git"**
3. **Choose GitHub** and authorize Netlify
4. **Select your repository**
5. **Configure build settings**:
   - Build command: Leave empty (static site)
   - Publish directory: `.` (root directory)
6. **Click "Deploy site"**

#### Option B: Manual Deploy

1. **Zip your project folder**
2. **Go to Netlify** → "New site from ZIP"
3. **Upload your ZIP file**

### Step 4: Configure Environment Variables

1. **In Netlify Dashboard**:
   - Go to your site → "Site settings" → "Environment variables"
   - Click "Add variable"

2. **Add these environment variables**:
   ```
   GOOGLE_API_KEY = your_actual_google_api_key
   YT_PLAYLIST_ID = your_youtube_playlist_id
   GCAL_CALENDAR_ID = your_google_calendar_id
   VENUE_PLACE_ID = your_venue_place_id (optional)
   ```

3. **Redeploy your site** after adding environment variables

### Step 5: Custom Domain (Optional)

1. **In Netlify Dashboard**:
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow the DNS configuration instructions

## 🔒 Security Best Practices

### API Key Security
- ✅ Never commit API keys to GitHub
- ✅ Use environment variables in production
- ✅ Restrict API keys to specific domains
- ✅ Regularly rotate API keys
- ✅ Monitor API usage in Google Cloud Console

### Google API Restrictions
1. **HTTP Referrers**: Restrict to your Netlify domain
2. **API Restrictions**: Enable only required APIs
3. **Quotas**: Set reasonable daily limits

## 🛠️ Local Development

### For local testing with environment variables:

1. **Create a `.env` file** (copy from `env.example`):
   ```bash
   cp env.example .env
   ```

2. **Add your actual API keys to `.env`**:
   ```
   GOOGLE_API_KEY=your_actual_key_here
   YT_PLAYLIST_ID=your_playlist_id_here
   GCAL_CALENDAR_ID=your_calendar_id_here
   ```

3. **Use a local server** (the .env file won't work with file:// protocol):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have it)
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📋 Pre-Deployment Checklist

- [ ] Remove hardcoded API keys from code
- [ ] Create environment variables in Netlify
- [ ] Test API key restrictions
- [ ] Verify all links work correctly
- [ ] Check responsive design on mobile
- [ ] Test video loading and performance
- [ ] Verify Google APIs integration works

## 🚨 Troubleshooting

### Common Issues:

1. **API Key Not Working**:
   - Check if API key is correctly set in Netlify environment variables
   - Verify API restrictions allow your Netlify domain
   - Check browser console for errors

2. **Videos Not Loading**:
   - Ensure video files are in the correct directory
   - Check file paths in HTML
   - Verify video formats are web-compatible

3. **Google Maps Not Showing**:
   - Verify Google Maps API is enabled
   - Check if API key has Maps JavaScript API permission
   - Ensure domain is added to API key restrictions

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Check browser console for JavaScript errors
3. Verify all environment variables are set correctly
4. Test API keys in Google Cloud Console

---

**Happy Deploying! 🎉**
