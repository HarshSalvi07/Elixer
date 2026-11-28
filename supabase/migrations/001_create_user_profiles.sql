-- Elixer: Initial user profile table

CREATE TABLE public.user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    preferred_name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 13 AND age <= 120),

    gender TEXT CHECK (
        gender IN (
            'Male',
            'Female',
            'Non-binary',
            'Other',
            'Prefer not to say'
        )
    ),

    height_cm NUMERIC(5, 2)
        CHECK (height_cm IS NULL OR (height_cm >= 50 AND height_cm <= 300)),

    weight_kg NUMERIC(6, 2)
        NOT NULL CHECK (weight_kg >= 20 AND weight_kg <= 500),

    completed_stage INTEGER NOT NULL DEFAULT 0
        CHECK (completed_stage >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read only their own profile
CREATE POLICY "Users can read their own profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert only their own profile
CREATE POLICY "Users can insert their own profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update only their own profile
CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Grant access through RLS to authenticated users
GRANT SELECT, INSERT, UPDATE
ON public.user_profiles
TO authenticated;