import { supabase } from '@/lib/supabase/client';

export async function signInWithEmail(
  email: string,
  password: string,
) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUpWithEmail(
  email: string,
  password: string,
) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}