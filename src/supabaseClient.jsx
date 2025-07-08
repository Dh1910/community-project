import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpsshgisxvnwlumqwaga.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwc3NoZ2lzeHZud2x1bXF3YWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzAyNTYsImV4cCI6MjA2NzQ0NjI1Nn0.roM5iUuAoZtX4ttZWnybDJIjcCk6cIUQvJNjtmoWl80';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
