# API Routes

## RESTful Conventions

API routes follow standard REST patterns:

### Admin Routes
- `POST /api/admin/login` - Authenticate admin user
- `POST /api/admin/logout` - Clear admin session

### Contact Route
- `POST /api/contact` - Submit contact form message (saves to DB, sends email notification if SMTP is configured)

### Projects Routes
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (requires auth)
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project (requires auth)
- `DELETE /api/projects/[id]` - Delete project (requires auth)

### LMS Routes
- `GET /api/lms/courses` - List courses
- `POST /api/lms/courses` - Create course (requires auth)
- `GET /api/lms/modules` - List modules
- `GET /api/lms/lessons` - List lessons
- `GET /api/lms/enrollments` - Get enrollments
- `POST /api/lms/enrollments` - Create enrollment
- `GET /api/lms/progress` - Get lesson progress
- `POST /api/lms/progress` - Update progress
- `GET /api/lms/certificates` - Get certificates
- `POST /api/lms/payments` - Process payment

### Payments Routes
- `POST /api/payments/stripe/intent` - Create payment intent
- `POST /api/payments/stripe/webhook` - Handle Stripe webhooks

## Authentication

All write operations (POST/PUT/PATCH/DELETE) to protected routes require admin authentication via JWT cookie (`adi_admin`).

## Response Format

All endpoints return JSON responses with appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## Dynamic Route Parameters

Remember: In Next.js 16, dynamic params are Promises. See `NEXT_JS_16.md` for details.
