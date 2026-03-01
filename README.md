# Action Digital Institute - Portfolio & Learning Management System

This is a Next.js portfolio and Learning Management System (LMS) for Action Digital Institute, showcasing AI Engineering, Digital Marketing, and Skills Development services.

## Project Overview

This portfolio showcases expertise in:
- AI Engineering
- Digital Marketing Strategy  
- Skills Development
- Next.js, TypeScript, and Tailwind CSS
- Database integration with Prisma

## Features

- Modern UI with dark/light theme support
- Motion shim for SSR-compatible animations
- Admin panel for managing projects
- Full Learning Management System (LMS) with courses, modules, and lessons
- Student dashboard with progress tracking
- Certificate generation
- Stripe payment integration
- Responsive design
- Blog section for content

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with PostCSS)
- **Animations**: Framer Motion (via motion shim)
- **Icons**: Lucide React
- **Database**: PostgreSQL (with Prisma ORM)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ActionDigitalinstitute
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Then update the values in `.env.local` with your actual values.

4. Generate Prisma client
```bash
npx prisma generate
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/actiondigitalinstitute"

# Admin credentials
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="your-secure-password"
ADMIN_JWT_SECRET="your-strong-random-secret"

# Payments (Stripe)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Webhooks
Set the `STRIPE_WEBHOOK_SECRET` value and configure Stripe to call `https://your-domain/api/payments/stripe/webhook` for `payment_intent.succeeded`.

# EmailJS configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your-service-id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your-template-id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your-public-key"
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linter
- `npm run lint:check` - Check for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run typecheck` - Run TypeScript type checks
- `npm run test` - Run unit tests (Vitest)

## Deployment

This project is optimized for deployment on Vercel:

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ActionDigitalinstitute&env=DATABASE_URL,ADMIN_EMAIL,ADMIN_PASSWORD,ADMIN_API_KEY,NEXT_PUBLIC_ADMIN_API_KEY,NEXT_PUBLIC_EMAILJS_SERVICE_ID,NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,NEXT_PUBLIC_EMAILJS_PUBLIC_KEY&envDescription=Environment%20variables%20required%20for%20deployment)

### Environment Variables for Vercel

When deploying to Vercel, make sure to set the following environment variables in your project settings:

- `DATABASE_URL` - Your PostgreSQL database URL
- `ADMIN_EMAIL` - Admin email for login
- `ADMIN_PASSWORD` - Admin password for login
- `ADMIN_JWT_SECRET` - Secret used to sign admin session tokens
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - EmailJS public key

## Admin Panel

The admin panel is accessible at `/admin` but requires authentication. First, navigate to `/admin/login` to authenticate.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Abdul Wahab - [ActionDigitalinstitute](https://ActionDigitalinstitute)
