# SeaReady Website - Claude Context

This folder contains all context needed for Claude to understand and work on the SeaReady website.

## Quick Access
- **Live Site**: https://seaready-website.vercel.app
- **GitHub Repo**: https://github.com/Johnny-Fulton/seaready-website
- **Vercel Dashboard**: https://vercel.com/johnny-fultons-projects/seaready-website

## Project Structure
```
seaready-website-new/
├── src/
│   ├── app/           # Next.js pages
│   ├── components/    # React components
│   └── styles/        # CSS files
├── public/            # Static assets (images, etc)
├── CLAUDE_CONTEXT/    # AI context files
└── package.json       # Dependencies
```

## Key Files to Edit
- `src/app/page.tsx` - Homepage content
- `src/components/logo.tsx` - Logo component
- `src/components/navbar.tsx` - Navigation bar
- `src/components/gradient.tsx` - Color gradients
- `src/app/layout.tsx` - Site metadata/title

## How to Deploy Changes
1. Make edits to files
2. In Terminal: `git add -A`
3. `git commit -m "Your message"`
4. `git push origin main`
5. Vercel auto-deploys in 1-2 minutes

## Current Status
- ✅ Website live on Vercel
- ✅ Custom domain ready (not configured)
- ✅ SeaReady logo implemented
- ✅ Maritime blue color scheme
- ✅ WBC3 compliance messaging

## Next Steps
- [ ] Add real screenshots from app
- [ ] Complete pricing page
- [ ] Add contact form
- [ ] Configure custom domain
- [ ] Add more content sections