# Sanmitr Sociocare

Prototype web platform for Sanmitr Sociocare, following the supplied clean three-domain visual direction.

## Current prototype
- Home page with EdTech, Agri and Health domains
- Separate interactive domain pages
- Video library UI
- Browser video playback
- Local video upload from admin dashboard
- Super Admin / Content Editor prototype roles
- Free and paid content model
- Demo checkout flow separated for future Razorpay integration
- About and Contact placeholders
- Responsive mobile layout

## Demo admin accounts
- Super Admin: `superadmin` / `1234`
- Content Editor: `editor` / `1234`

## Important
This branch is a frontend/prototype implementation. Authentication, video storage, database persistence and payments currently use browser-local/demo mechanisms. Before production, these must be replaced with secure backend services, role-based authorization, object storage and Razorpay server-side order/signature verification/webhooks.

## Next build phase
1. React/Next.js application structure
2. Supabase/PostgreSQL database
3. Secure authentication and role permissions
4. Video object storage + thumbnails
5. Course/content management
6. Razorpay Orders + payment verification/webhooks
7. User dashboard and purchase history
8. Production deployment and CI/CD
