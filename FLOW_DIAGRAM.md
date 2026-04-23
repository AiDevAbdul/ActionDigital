# Complete Flow Diagram

## User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ User visits: /aidev                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ LANDING PAGE DISPLAYS:                                          │
│ • Session Card (Date, Time, Live Counter)                       │
│ • What You'll Learn (6 topics)                                  │
│ • Why This Matters (motivational section)                       │
│ • Prerequisites (what you need)                                 │
│ • About Instructor (Abdul Wahab)                               │
│ • FAQ (5 common questions)                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ User scrolls down to REGISTRATION FORM                          │
│ Fields:                                                         │
│ • Full Name                                                     │
│ • Email Address                                                 │
│ • WhatsApp Number                                               │
│ • Experience Level (dropdown)                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ User clicks "Register Now"                                      │
│ ↓                                                               │
│ POST /api/session-registrations                                 │
│ ↓                                                               │
│ Data saved to SessionRegistration table                         │
│ ↓                                                               │
│ Counter increments                                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ SUCCESS SCREEN SHOWS:                                           │
│ ✓ Registration Successful! 🎉                                   │
│ • 📱 Join WhatsApp Group button                                 │
│ • 👥 Join Facebook Community button                             │
│ • 💡 Tip: Join WhatsApp first for Meet link                     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ User joins WhatsApp & Facebook groups                           │
│ Gets Google Meet link from WhatsApp                             │
│ Joins session on April 24 at 9:00 PM PKT                        │
└─────────────────────────────────────────────────────────────────┘
```

## Admin Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ Admin visits: /admin/login                                      │
│ Logs in with credentials                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Admin Dashboard                                                 │
│ Clicks "Session Registrations" tab                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ SESSION REGISTRATIONS PAGE SHOWS:                               │
│                                                                 │
│ STATS CARDS:                                                    │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐ │
│ │ Total: 42    │ │ Beginners: 28│ │ Some Exp: 10 │ │ Exp: 4  │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘ │
│                                                                 │
│ TOOLBAR:                                                        │
│ • Search box (name, email, phone)                               │
│ • Experience filter dropdown                                    │
│ • Export CSV button                                             │
│ • Send Emails button                                            │
│                                                                 │
│ TABLE:                                                          │
│ Name | Email | Phone | Experience | Registered                 │
│ ──────────────────────────────────────────────────────          │
│ Abdul | abdul@... | +92... | Beginner | Apr 23, 10:30 AM       │
│ Fatima | fatima@... | +92... | Some Exp | Apr 23, 10:45 AM     │
│ ... (more rows)                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Admin can:                                                      │
│ • Search for specific registrations                             │
│ • Filter by experience level                                    │
│ • Export all data as CSV                                        │
│ • Send bulk emails to registrants                               │
│ • Track attendance (mark attended)                              │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    REGISTRATION FORM                             │
│              (RegistrationForm.tsx)                              │
└──────────────────────────────────────────────────────────────────┘
                              ↓
                    Form Validation
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│              POST /api/session-registrations                     │
│                  (route.ts)                                      │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                   PRISMA ORM                                     │
│         prisma.sessionRegistration.create()                      │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│              PostgreSQL DATABASE                                 │
│          SessionRegistration Table                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ id | name | email | phone | experience | registeredAt  │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │ 1  | Abdul| a@... | +92.. | beginner   | 2026-04-23... │    │
│  │ 2  | Fati| f@... | +92.. | some-exp   | 2026-04-23... │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                              ↓
                    GET /api/session-registrations
                    Returns: { count: 42 }
                              ↓
                    Live Counter Updates
                    on Landing Page
```

## File Structure

```
src/
├── app/
│   ├── aidev/
│   │   └── page.tsx                    ← Landing page route
│   ├── api/
│   │   ├── session-registrations/
│   │   │   └── route.ts                ← POST & GET registrations
│   │   └── admin/
│   │       └── session-registrations/
│   │           └── export/
│   │               └── route.ts        ← CSV export endpoint
│   └── admin/
│       ├── layout.tsx                  ← Updated with nav
│       └── session-registrations/
│           └── page.tsx                ← Admin registrations page
├── components/
│   ├── DevSetupSessionPage.tsx         ← Main landing component
│   ├── RegistrationForm.tsx            ← Form component
│   ├── RegistrationSuccess.tsx         ← Success screen
│   ├── SessionBanner.tsx               ← Session banner popup
│   └── admin/
│       └── SessionRegistrationsTable.tsx ← Admin table
└── lib/
    └── db.ts                           ← Prisma client

prisma/
├── schema.prisma                       ← Added SessionRegistration model
└── migrations/
    └── 20260423050845_add_session_registration/
        └── migration.sql               ← Database migration
```

## Key Statistics

- **Total Files Created**: 8
- **API Endpoints**: 3
- **Database Tables**: 1 (SessionRegistration)
- **Admin Features**: 3 (View, Export, Email)
- **Form Fields**: 4 (Name, Email, Phone, Experience)
- **Experience Levels**: 3 (Beginner, Some Experience, Experienced)

## Session Information

| Detail | Value |
|--------|-------|
| **Date** | Friday, April 24, 2026 |
| **Time** | 9:00 PM - 11:00 PM PKT |
| **Duration** | 2 hours |
| **Instructor** | Abdul Wahab (Academia Incharge, ADI) |
| **Format** | Live Interactive Online Session |
| **Platform** | Google Meet (link in WhatsApp) |
| **WhatsApp Group** | https://chat.whatsapp.com/GuKcrD22NuS3Fm9bkcL6ep |
| **Facebook Group** | https://www.facebook.com/groups/899448225084834 |

## Topics Covered

1. 📦 Node.js Installation
2. 🔧 Git Setup & Configuration
3. 👤 GitHub Account Creation
4. 💻 VSCode Installation & Setup
5. 🤖 Claude Code Setup
6. 🚀 First Steps with AI Assistance
