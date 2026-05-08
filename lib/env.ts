export function getEnvVar(key: string): string {
  if (typeof window !== 'undefined') {
    return process.env[key] || '';
  }
  
  const value = process.env[key];
  if (!value) {
    console.warn(`Missing environment variable: ${key}`);
    return '';
  }
  return value;
}

export function getEnvVarOptional(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  supabaseUrl: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
};