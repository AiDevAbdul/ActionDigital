# Project Context: techAI.pk

## Project Overview
This is a Next.js portfolio website for Abdul Wahab, an AI Engineer, Digital Marketing Strategist, and Skills Development Expert. The site showcases expertise in AI engineering, digital marketing strategy, and skills development while demonstrating modern web development practices.

The project uses:
- Next.js 14 (with App Router)
- React 18
- TypeScript
- Tailwind CSS for styling
- Prisma ORM for database operations
- Framer Motion for animations
- Lucide React icons
- EmailJS for contact forms
- Context API for state management

## Directory Structure
```
techAI.pk/
├── .env.example          # Environment variables template
├── .gitignore
├── eslint.config.mjs
├── LICENSE
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── prisma/               # Prisma database schema
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── about/        # About page
│   │   ├── admin/        # Admin panel pages
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog-related pages
│   │   ├── contact/      # Contact page
│   │   ├── courses/      # Courses section
│   │   ├── projects/     # Projects section
│   │   ├── services/     # Services section
│   │   ├── team/         # Team section
│   │   ├── favicon.ico
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── admin/        # Admin components
│   │   ├── blog/         # Blog components
│   │   ├── About.tsx     # About section
│   │   ├── AnimatedHomePage.tsx # Animated homepage
│   │   ├── AnimatedLogo.tsx # Animated logo component
│   │   ├── AnimatedPageWrapper.tsx # Animation wrapper
│   │   ├── BlogCard.tsx  # Blog card component
│   │   ├── Contact.tsx   # Contact form
│   │   ├── ContactSection.tsx # Contact section
│   │   ├── Courses.tsx   # Courses section
│   │   ├── CoursesPage.tsx # Courses page
│   │   ├── CoursesSection.tsx # Courses section
│   │   ├── Footer.tsx    # Site footer
│   │   ├── Header.tsx    # Site header
│   │   ├── Hero.tsx      # Hero section
│   │   ├── LatestBlogs.tsx # Latest blogs component
│   │   ├── ProjectsSection.tsx # Projects section
│   │   ├── RevolvingSkills.tsx # Skills visualization
│   │   ├── Services.tsx  # Services section
│   │   ├── StudentSuccessStories.tsx # Success stories
│   │   ├── Team.tsx      # Team section
│   │   ├── Testimonials.tsx # Testimonials section
│   │   ├── ThemeToggle.tsx # Theme toggle component
│   │   └── WhatsAppButton.tsx # WhatsApp button
│   ├── context/          # React Context providers
│   ├── data/             # Static data files
│   └── lib/              # Utility functions/libraries
│       └── db.ts         # Prisma database client
```

## Key Features
- **Dark/Light Theme**: Dynamic theme switching with localStorage persistence
- **Animations**: Smooth transitions and animated components using Framer Motion
- **Responsive Design**: Mobile-first responsive layout
- **Admin Panel**: Backend management functionality with authentication
- **Blog Section**: Content management for blog posts
- **Contact Form**: EmailJS integration for contact submissions
- **Projects Showcase**: Project display with tech stack and links
- **Courses Section**: Educational content display
- **SEO Optimized**: Proper metadata and structured data

## Prisma Schema
The project uses a PostgreSQL database with the following models:
- Project: Contains project information (title, description, tech stack, link, icon)
- User: Contains user information (email, password, name) for admin authentication

## Building and Running

### Development
```bash
# Navigate to the project directory
cd techAI.pk

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Update .env.local with your actual values

# Generate Prisma client
npx prisma generate

# Run the development server
npm run dev
```
The development server runs on http://localhost:3000.

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
# or
npm run lint:check

# Automatically fix linting errors
npm run lint:fix
```

## Development Conventions

### File Structure
- Components are organized in the `src/components/` directory
- Pages are structured using the Next.js App Router in `src/app/`
- Reusable utilities are placed in `src/lib/`
- Data files are stored in `src/data/`
- Context providers manage state in `src/context/`

### Styling
- Tailwind CSS is used for styling with custom configuration in `postcss.config.mjs`
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
- Admin authentication
- Project management
- Blog data management
- Any other server-side operations

## Environment Variables
Environment variables are managed through `.env.local` file with sensitive data:
- DATABASE_URL: PostgreSQL database connection string
- ADMIN_EMAIL: Admin email for login
- ADMIN_PASSWORD: Admin password for login
- ADMIN_API_KEY: Secret key for admin API access
- NEXT_PUBLIC_ADMIN_API_KEY: Public key corresponding to admin API key
- NEXT_PUBLIC_EMAILJS_SERVICE_ID: EmailJS service ID
- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: EmailJS template ID
- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: EmailJS public key