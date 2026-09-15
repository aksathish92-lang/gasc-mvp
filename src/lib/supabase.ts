import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SiteImage = {
  id: string;
  category: 'hero' | 'gallery' | 'about' | 'campus';
  image_url: string;
  title: string | null;
  display_order: number;
  created_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string | null;
  date: string;
  is_active: boolean;
  created_at: string;
};
