# Prototype demo accounts

Use these three accounts for testing the multi-role login screen:

| Role | Email | Password |
|---|---|---|
| Superadmin | `demo.superadmin@sanmitr.test` | `SanmitrDemo#2026` |
| Admin | `demo.admin@sanmitr.test` | `SanmitrDemo#2026` |
| General user | `demo.user@sanmitr.test` | `SanmitrDemo#2026` |

## One-time Supabase setup

Create the three users in **Supabase Authentication → Users → Add user** with the exact emails/password above. Then copy each user's UUID and run:

```sql
insert into public.profiles (id, role, full_name) values
('SUPERADMIN_UUID', 'superadmin', 'Demo Superadmin'),
('ADMIN_UUID', 'editor', 'Demo Admin'),
('USER_UUID', 'user', 'Demo User')
on conflict (id) do update set role=excluded.role, full_name=excluded.full_name;
```

The UI displays the existing `editor` database role as **Admin** conceptually. Authorization remains enforced by Supabase Auth + RLS; the login page never lets a visitor select a privileged role.

These credentials are for prototype/demo use only. Replace them before production and never commit real production passwords to GitHub.