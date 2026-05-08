export const authConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  fallback: {
    enabled: true,
    storageKey: 'nexus_fallback_users',
    checkInterval: 120000,
  },
};

export function isSupabaseConfigured(): boolean {
  return Boolean(authConfig.supabase.url && authConfig.supabase.anonKey);
}