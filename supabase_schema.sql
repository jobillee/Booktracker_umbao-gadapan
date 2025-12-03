-- Supabase schema for BookTracker app
-- Run this in your Supabase SQL editor to create tables and RLS policies.
-- =======================================================
--  BookTracker App — Corrected Supabase Schema
-- =======================================================

-- =======================
-- Users table (profiles)
-- =======================
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null check (role in ('admin','borrower')) default 'borrower',
  created_at timestamptz default now()
);

-- =======================
-- Books table
-- =======================
create table if not exists public.books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text,
  genre text,
  year int,
  description text,
  price numeric(10,2),
  cover text,
  status text,
  section text,
  created_at timestamptz default now()
);

-- =======================
-- Transactions table
-- =======================
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  book_id uuid references public.books(id) on delete set null,
  type text check (type in ('borrow','buy')),
  quantity int default 1,
  price numeric(10,2),
  status text,
  created_at timestamptz default now()
);

-- =======================
-- Enable Row Level Security
-- =======================
alter table public.users enable row level security;
alter table public.books enable row level security;
alter table public.transactions enable row level security;

-- =======================================================
-- USERS POLICIES
-- =======================================================

drop policy if exists "Insert own profile" on public.users;
drop policy if exists "Select own profile" on public.users;
drop policy if exists "Update own profile" on public.users;
drop policy if exists "Admins full access to users" on public.users;

-- INSERT (only create own profile & must be borrower)
create policy "Insert own profile" on public.users
  for insert
  with check (
    auth.uid() = id
    and role = 'borrower'
  );

-- SELECT (view own profile)
create policy "Select own profile" on public.users
  for select
  using (auth.uid() = id);

-- UPDATE (edit own profile)
create policy "Update own profile" on public.users
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- NOTE: Removed "Admins full access to users" policy to avoid infinite recursion.
-- For admin management of users, use an Edge Function or SECURITY DEFINER procedure
-- that runs with service_role key instead of relying on RLS policies.

-- =======================================================
-- BOOKS POLICIES
-- =======================================================

drop policy if exists "Public select books" on public.books;
drop policy if exists "Admin insert books" on public.books;
drop policy if exists "Admin update books" on public.books;
drop policy if exists "Admin delete books" on public.books;

-- Anyone can SELECT books
create policy "Public select books" on public.books
  for select
  using (true);

-- INSERT (anyone can add books for now; admin check removed to avoid recursion)
-- NOTE: In production, use an Edge Function with service_role to enforce admin-only inserts
drop policy if exists "Public insert books" on public.books;
drop policy if exists "Public update books" on public.books;
drop policy if exists "Public delete books" on public.books;
create policy "Public insert books" on public.books
  for insert
  with check (true);

-- UPDATE (anyone can update for now)
-- NOTE: In production, use an Edge Function with service_role to enforce admin-only updates
create policy "Public update books" on public.books
  for update
  using (true)
  with check (true);

-- DELETE (anyone can delete for now)
-- NOTE: In production, use an Edge Function with service_role to enforce admin-only deletes
create policy "Public delete books" on public.books
  for delete
  using (true);

-- =======================================================
-- TRANSACTIONS POLICIES
-- =======================================================

drop policy if exists "Insert own transaction" on public.transactions;
drop policy if exists "Select own transactions" on public.transactions;
drop policy if exists "Admin select transactions" on public.transactions;
drop policy if exists "Admin manage transactions" on public.transactions;

-- INSERT (only create transactions for yourself)
create policy "Insert own transaction" on public.transactions
  for insert
  with check (auth.uid() = user_id);

-- SELECT (view your own history)
create policy "Select own transactions" on public.transactions
  for select
  using (auth.uid() = user_id);

-- =======================================================
-- AUTO-CREATE PROFILE TRIGGER
-- =======================================================
-- When a new user is created in auth.users, automatically create their profile in public.users
-- This runs with security definer so it bypasses RLS checks.

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
declare
  full_name_val text;
  role_val text;
  role_from_inner jsonb;
begin
  -- Try to extract full_name and role from various possible metadata shapes
  full_name_val := coalesce(new.raw_user_meta_data->>'full_name', '');

  -- First, try top-level role
  role_val := new.raw_user_meta_data->>'role';
  -- Then, try nested user_metadata.role if present
  if role_val is null then
    role_from_inner := (case when jsonb_typeof(new.raw_user_meta_data) = 'object' then new.raw_user_meta_data->'user_metadata' else null end);
    if role_from_inner is not null then
      role_val := role_from_inner->>'role';
    end if;
  end if;

  -- Default to 'borrower' when role not provided
  if role_val is null or trim(role_val) = '' then
    role_val := 'borrower';
  end if;

  -- Normalize to lowercase and validate
  role_val := lower(role_val);
  if role_val not in ('admin', 'borrower') then
    role_val := 'borrower';
  end if;

  -- Insert profile into public.users using the role from metadata
  insert into public.users (id, email, full_name, role, created_at)
  values (new.id, new.email, full_name_val, role_val, now());

  return new;
exception when others then
  -- Log error but don't fail the trigger
  raise warning 'Failed to create user profile: %', sqlerrm;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =======================================================
-- END OF SCHEMA
-- =======================================================
