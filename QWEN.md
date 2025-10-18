# Project Context: techAI.pk

## Project Overview
This is a Next.js 15.5.4 application designed as a personal portfolio website for Abdul Wahab, an AI Engineer, Digital Marketing Strategist, and Skills Development Expert. The site is built with TypeScript, React, and incorporates modern UI/UX features with dark/light theme support, animations, and responsive design.

The project uses:
- Next.js 15 (with Turbopack)
- React 19.1.0
- TypeScript
- Tailwind CSS for styling
- Prisma ORM for database operations
- Framer Motion for animations
- Lucide React icons
- EmailJS for contact forms
- Context API for state management
- Geist font from Vercel

## Directory Structure
```
techai.pk/
├── .env.local          # Environment variables
├── .gitignore
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── admin/      # Admin panel pages
│   │   ├── api/        # API routes
│   │   ├── blog/       # Blog-related pages
│   │   ├── favicon.ico
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── admin/      # Admin components
│   │   ├── blog/       # Blog components
│   │   ├── Header.tsx  # Site header
│   │   ├── Footer.tsx  # Site footer
│   │   ├── Hero.tsx    # Hero section
│   │   ├── Projects.tsx # Projects section
│   │   ├── Experience.tsx # Experience section
│   │   ├── Contact.tsx # Contact form
│   │   ├── Expertise.tsx # Expertise section
│   │   ├── RevolvingSkills.tsx # Skills visualization
│   │   ├── AnimatedPageWrapper.tsx # Animation wrapper
│   │   └── ...         # Other UI components
│   ├── context/        # React Context providers
│   │   └── ThemeProvider.tsx # Theme management context
│   ├── data/           # Static data files
│   │   └── blogData.ts # Blog-related data
│   └── lib/            # Utility functions/libraries
│       └── db.ts       # Prisma database client
```

## Key Features
- **Dark/Light Theme**: Dynamic theme switching with localStorage persistence
- **Animations**: Smooth transitions and animated components using Framer Motion
- **Responsive Design**: Mobile-first responsive layout
- **Blog Section**: Content management for blog posts
- **Contact Form**: EmailJS integration for contact submissions
- **Admin Panel**: Backend management functionality
- **SEO Optimized**: Proper metadata and structured data

## Building and Running

### Development
```bash
# Navigate to the project directory
cd techai.pk

# Install dependencies
npm install

# Run the development server
npm run dev
# or with bun
bun dev
```
The development server runs with Turbopack enabled on http://localhost:3000.

### Production Build
```bash
# Build the application for production
npm run build

# Start the production server
npm run start
```

### Linting
```bash
# Run ESLint to check for code issues
npm run lint
```

## Development Conventions

### File Structure
- Components are organized in the `src/components/` directory
- Pages are structured using the Next.js App Router in `src/app/`
- Reusable utilities are placed in `src/lib/`
- Data files are stored in `src/data/`
- Context providers manage state in `src/context/`

### Styling
- Tailwind CSS is used for styling with custom configuration in `tailwind.config.js`
- Global styles are defined in `src/app/globals.css`
- CSS variables and custom classes follow the BEM methodology

### TypeScript
- Strict TypeScript configuration is enforced
- Type definitions for global variables are allowed in specific cases
- Component props are typed using interfaces

### Component Organization
- Components are organized by feature in subdirectories within `src/components/`
- Reusable UI elements are kept in the main `src/components/` directory
- Page-specific components are kept in their respective directories

### Database
- Prisma ORM is used for database operations
- Database client is configured in `src/lib/db.ts` with global instance handling
- Database connection follows Next.js best practices for avoiding multiple instances

## API Routes
The project includes API routes in `src/app/api/` for:
- Contact form submissions
- Blog data management
- Admin functionality
- Any other server-side operations

## Environment Variables
Environment variables are managed through `.env.local` file with sensitive data stored in the version control system's secrets.