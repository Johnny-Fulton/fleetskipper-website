# Technical Stack & Configuration

## Core Technologies
- **Framework**: Next.js 15.4.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel
- **Version Control**: Git/GitHub

## Key Dependencies
```json
{
  "next": "15.4.4",
  "react": "^19",
  "tailwindcss": "^4.1.11",
  "@headlessui/react": "^2.2.6",
  "@heroicons/react": "^2.2.0",
  "framer-motion": "^12.23.11"
}
```

## Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Git Configuration
- **Remote**: https://github.com/Johnny-Fulton/seaready-website.git
- **Default Branch**: main
- **Deploy on Push**: Yes (via Vercel)

## Environment
- Node.js version: 18+ recommended
- Package manager: npm
- OS: macOS (development)

## File Naming Conventions
- Components: PascalCase (e.g., `NavBar.tsx`)
- Pages: kebab-case folders (e.g., `/pricing/page.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)

## Important Notes
- Uses Next.js App Router (not Pages Router)
- Tailwind CSS v4 (latest alpha)
- All images in `/public` folder
- Components are client/server mixed