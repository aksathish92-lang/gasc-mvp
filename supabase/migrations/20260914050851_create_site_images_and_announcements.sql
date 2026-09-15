/*
# Create site_images and announcements tables

## Purpose
This migration creates two tables for the Government Arts and Science College website:
1. `site_images` - stores image URLs that the admin can manage (hero, gallery, about, campus sections)
2. `announcements` - stores important announcements shown on the home page

## New Tables

### site_images
- id (uuid, primary key)
- category (text) - which section the image belongs to: 'hero', 'gallery', 'about', 'campus'
- image_url (text) - the image source URL
- title (text) - optional caption or title for the image
- display_order (integer) - controls ordering within a category
- created_at (timestamptz) - when the image was added

### announcements
- id (uuid, primary key)
- title (text) - announcement headline
- content (text) - announcement body text
- date (date) - announcement date
- is_active (boolean) - whether to show on the site
- created_at (timestamptz) - when created

## Security
- Both tables use RLS with anon+authenticated access since this is a no-auth single-tenant app.
- All CRUD operations are open to anon and authenticated roles.
*/

CREATE TABLE IF NOT EXISTS site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT 'gallery',
  image_url text NOT NULL,
  title text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_site_images" ON site_images;
CREATE POLICY "anon_select_site_images" ON site_images FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_site_images" ON site_images;
CREATE POLICY "anon_insert_site_images" ON site_images FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_site_images" ON site_images;
CREATE POLICY "anon_update_site_images" ON site_images FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_site_images" ON site_images;
CREATE POLICY "anon_delete_site_images" ON site_images FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  date date DEFAULT CURRENT_DATE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_announcements" ON announcements;
CREATE POLICY "anon_select_announcements" ON announcements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_announcements" ON announcements;
CREATE POLICY "anon_insert_announcements" ON announcements FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_announcements" ON announcements;
CREATE POLICY "anon_update_announcements" ON announcements FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_announcements" ON announcements;
CREATE POLICY "anon_delete_announcements" ON announcements FOR DELETE
  TO anon, authenticated USING (true);
