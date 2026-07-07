/*
# Create contact_messages table

## Purpose
Store contact form submissions from portfolio visitors.

## Changes
1. New Tables
   - `contact_messages`
     - `id` (uuid, primary key)
     - `name` (text, not null) — visitor's name
     - `email` (text, not null) — visitor's email
     - `message` (text, not null) — the message body
     - `created_at` (timestamptz) — submission timestamp

2. Security
   - Enable RLS on `contact_messages`
   - Allow anon + authenticated INSERT (public form submissions)
   - Allow anon + authenticated SELECT (single-tenant, no auth required)
   - No UPDATE or DELETE policies (submissions are immutable)

## Notes
- This is a single-tenant portfolio app with no login.
- All write access is intentionally open so anyone can submit a message.
- Using anon + authenticated roles so the anon-key client can write.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact_messages" ON contact_messages;
CREATE POLICY "anon_select_contact_messages" ON contact_messages FOR SELECT
TO anon, authenticated USING (true);
