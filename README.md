# Interactive 3D Portfolio

This project is an interactive personal website built with React, TypeScript, and Three.js using React Three Fiber. It features a real-time animated 3D avatar with responsive layout, cinematic camera composition, and smooth UI transitions.

The site is designed as an exploratory experience: users are introduced to the avatar in a main view and can interact with it to reveal deeper content and details.

## ✨ Features

- Real-time 3D avatar rendered with Three.js
- Character animations powered by Blender + Mixamo
- Responsive composition that adapts to viewport size
- Smooth transitions and spring-based motion using @react-spring/three
- Clean scene architecture with camera & interaction separation
- Built with Vite for fast development and hot module reloading

## 🧱 Tech Stack

- React + TypeScript
- Three.js
- React Three Fiber
- @react-three/drei
- @react-spring/three
- Vite
- Tailwind CSS

## 🧍 Avatar & Animation Pipeline

The avatar model was generated using Ready Player Me and animated using Mixamo, with processing and export handled in Blender.

Animation workflow reference:  
Robes Antoro — "Three.js + Blender + Mixamo"  
https://robesantoro.medium.com/three-js-blender-mixamo-52304823046

Full credits and attributions are listed in CREDITS.md.

## 🧪 Development

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] Test the production build locally: `npm run build && npm run preview`
- [ ] Verify all assets (images, PDFs, 3D models) load correctly
- [ ] Check that all external links work
- [ ] Test on mobile devices
- [ ] Update `index.html` title and meta tags if needed
- [ ] Ensure `.gitignore` includes `dist/` and `node_modules/`

### Free Hosting Options (MIT Students)

As an MIT student, you have access to several free hosting options:

#### 1. **Vercel** (Recommended) ⭐
- **Free tier**: Unlimited personal projects, automatic HTTPS, global CDN
- **Best for**: React/Vite apps (perfect for this project)
- **Setup**:
  1. Push your code to GitHub
  2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
  3. Click "New Project" and import your repository
  4. Vercel will auto-detect Vite settings:
     - **Install Command**: `npm install` (automatic, no need to specify)
     - **Build Command**: `npm run build` (auto-detected)
     - **Output Directory**: `dist` (auto-detected)
  5. Click "Deploy"! Your site will be live at `your-project-name.vercel.app`
  6. (Optional) Add a custom domain later

#### 2. **Netlify**
- **Free tier**: 300 build minutes/month, 100GB bandwidth/month
- **Setup**:
  1. Push code to GitHub
  2. Go to [netlify.com](https://netlify.com) and sign in with GitHub
  3. Click "Add new site" → "Import an existing project"
  4. Select your repository
  5. Configure build settings:
     - **Base directory**: (leave empty)
     - **Build command**: `npm run build` (Netlify automatically runs `npm install` first)
     - **Publish directory**: `dist`
  6. Click "Deploy site"!

#### 3. **GitHub Pages**
- **Free**: Included with GitHub (requires public repo or GitHub Pro)
- **Setup**:
  1. Install `gh-pages`: `npm install --save-dev gh-pages`
  2. Add to `package.json` scripts: `"deploy": "npm run build && gh-pages -d dist"`
  3. Run: `npm run deploy`
  4. Enable in repo Settings → Pages → Source: `gh-pages` branch

#### 4. **Cloudflare Pages**
- **Free tier**: Unlimited builds, unlimited bandwidth
- **Setup**: Similar to Vercel/Netlify, connect GitHub repo

### Website Naming Suggestions

Choose a professional domain/subdomain name:
- `kayli-portfolio`
- `kayli-dev`
- `kayli-website`
- `portfolio-kayli`
- Or use your full name if preferred

### Environment Variables

If you need environment variables (API keys, etc.):
- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Build & Deploy → Environment

### Custom Domain (Optional)

After deployment, you can add a custom domain:
- Purchase from Namecheap, Google Domains, or Cloudflare
- Add DNS records in your hosting platform's settings
- Vercel/Netlify provide free SSL certificates automatically

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
├── views/          # Page-level views (MainLanding, CharacterDetail, etc.)
├── avatar/         # 3D avatar components and camera logic
├── hooks/          # Custom React hooks
├── data/           # Profile data and content
├── types/          # TypeScript type definitions
├── styles/         # Global styles and CSS
└── assets/         # 3D models, images, and static files
```

## 📜 Attribution

3D avatar assets, animation workflow, and library attributions are listed in CREDITS.md.
