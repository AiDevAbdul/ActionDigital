# Quick Start Guide - Session Landing Page

## Test the Landing Page Locally

```bash
npm run dev
```

Then visit: `http://localhost:3000/aidev`

## What You Can Do Right Now

### 1. View the Landing Page
- See all session details, what students will learn, FAQ
- Live counter showing how many registered
- Beautiful animations and responsive design

### 2. Test Registration
- Fill the form with test data
- Submit and see success screen with group links
- Counter increments in real-time

### 3. Access Admin Dashboard
- Login at: `http://localhost:3000/admin/login`
- Go to "Session Registrations" tab
- View all registrations with stats
- Search, filter, export as CSV
- Send bulk emails to registrants

## Files Created

**Landing Page:**
- `src/app/ai-driven-development-setup-for-beginners/page.tsx`
- `src/components/DevSetupSessionPage.tsx`
- `src/components/RegistrationForm.tsx`
- `src/components/RegistrationSuccess.tsx`

**Admin:**
- `src/app/admin/session-registrations/page.tsx`
- `src/components/admin/SessionRegistrationsTable.tsx`
- `src/app/admin/layout.tsx` (updated with nav)

**API:**
- `src/app/api/session-registrations/route.ts` (POST & GET)
- `src/app/api/admin/session-registrations/export/route.ts`

**Database:**
- `prisma/schema.prisma` (added SessionRegistration model)
- Migration applied: `20260423050845_add_session_registration`

## Key Information

**Session Details:**
- Date: Friday, April 24, 2026
- Time: 9:00 PM - 11:00 PM PKT
- WhatsApp: https://chat.whatsapp.com/GuKcrD22NuS3Fm9bkcL6ep
- Facebook: https://www.facebook.com/groups/899448225084834

**Admin Access:**
- Route: `/admin/session-registrations`
- Requires: Admin login (adi_admin cookie)
- Features: View, search, filter, export, email

**Registration Data:**
- Stored in: `SessionRegistration` table
- Fields: name, email, phone, experience, registeredAt, attended
- Access: Admin dashboard or CSV export

## Next Steps (Optional)

1. **Customize Instructor Image**
   - Replace "AW" avatar in DevSetupSessionPage.tsx with actual image
   - Update instructor bio if needed

2. **Add to Navigation**
   - Add link to session page in main navigation menu

3. **Email Reminders**
   - Use CSV export to send reminders before session
   - Use "Send Emails" button in admin dashboard

4. **Post-Session**
   - Mark attendance in admin dashboard
   - Export final list for certificates/follow-ups

## Testing Checklist

- [ ] Landing page loads and looks good
- [ ] Live counter shows registration count
- [ ] Form validation works (try submitting empty)
- [ ] Registration successful shows group links
- [ ] Admin page shows registrations
- [ ] Search/filter works
- [ ] CSV export downloads file
- [ ] Dark mode works (toggle in your browser)
- [ ] Mobile responsive (test on phone/tablet)
