import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isSupabaseConfigured = supabaseUrl && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

if (!isSupabaseConfigured) {
  console.warn('Supabase credentials missing or using placeholders. Please check your .env file.');
}

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co', 
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder'
);
