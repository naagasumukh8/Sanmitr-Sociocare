# Sanmitr admin setup

The website uses Supabase Auth plus the `profiles.role` field for admin access.

## First admin

1. Create the first staff account in Supabase Authentication.
2. Copy that user's UUID from Authentication > Users.
3. Run this SQL once in the Supabase SQL editor:

```sql
insert into public.profiles (id, role, full_name)
values ('PASTE_AUTH_USER_UUID_HERE', 'superadmin', 'Sanmitr Admin')
on conflict (id) do update set role = 'superadmin';
```

After that, the account can sign in at `/admin.html`.

## Roles

- `user`: normal account, no operational dashboard access.
- `editor`: manage showcase content, agriculture services and operational statuses.
- `superadmin`: same operational access, intended for the primary administrator.

The actual database boundary is Supabase RLS; hiding the admin page alone is not considered security.

## Content workflow

Use verified Sanmitr material only. A showcase item can contain a domain, title, description, media URL/type and project URL. Upload production images/videos to the Supabase Storage showcase buckets and publish their public URLs through the CMS.

Do not publish unverified impact numbers, partner names, project claims or professional credentials.
