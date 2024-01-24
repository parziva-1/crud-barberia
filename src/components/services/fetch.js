import { createClient } from '@supabase/supabase-js'

// eslint-disable-next-line no-undef
const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL
// eslint-disable-next-line no-undef
const EXPO_PUBLIC_ANON_PUBLIC = process.env.EXPO_PUBLIC_ANON_PUBLIC

export const supabase = createClient(
  EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_ANON_PUBLIC,
)
