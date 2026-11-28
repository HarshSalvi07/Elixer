
import { supabase } from '@/lib/supabase/client';

export type PersonalFoundationData = {
  preferred_name: string;
  age: number;
  gender: string | null;
  height_cm: number | null;
  weight_kg: number;
  completed_stage: number;
};

export async function savePersonalFoundation(
  userId: string,
  profileData: PersonalFoundationData,
) {
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert(
      {
        user_id: userId,
        ...profileData,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      },
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}