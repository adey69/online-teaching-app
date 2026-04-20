import { createClient } from '@supabase/supabase-js';
import { Config } from '../config';

export const supabase = createClient(
  Config.supabase.url,
  Config.supabase.anonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);
