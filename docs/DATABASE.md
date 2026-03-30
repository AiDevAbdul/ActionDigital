# Database

## Schema Overview

The Prisma schema includes two main domains:

1. **Portfolio/Projects**: `Project` model for showcasing work
2. **LMS (Learning Management System)**: Full course platform with:
   - `User` (with roles: ADMIN, INSTRUCTOR, STUDENT)
   - `Course` → `Module` → `Lesson` hierarchy
   - `Enrollment`, `LessonProgress`, `Certificate` for student tracking
   - `Payment` and `Coupon` for monetization
   - Support for different lesson types: VIDEO, TEXT, PDF, QUIZ, ASSIGNMENT
   - Course access types: FREE, PAID, SUBSCRIPTION

## Prisma Setup

- **Version**: Prisma 6.19.2 (not 7.x - breaking changes in v7)
- **Location**: `prisma/schema.prisma`
- **Migrations**: Stored in `prisma/migrations/`

## Common Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create and apply migrations in development
npx prisma migrate dev

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio GUI
npx prisma studio
```

## Important Notes

- Always run `npx prisma generate` after schema changes
- Always run `npx prisma migrate dev` after modifying the schema
- Database connection via `DATABASE_URL` environment variable
- Prisma client singleton available at `src/lib/db.ts`
