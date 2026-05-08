import { supabase } from '@/supabase/client';

let lastCheck = 0;
let cachedStatus: 'online' | 'offline' | 'unknown' = 'unknown';

export async function checkSupabaseStatus(): Promise<'online' | 'offline'> {
  const now = Date.now();
  
  if (now - lastCheck < 30000 && cachedStatus !== 'unknown') {
    return cachedStatus;
  }

  lastCheck = now;

  try {
    const { error } = await supabase.from('_health').select('id').limit(1).single();
    
    if (error && error.message.includes('404')) {
      cachedStatus = 'online';
      return 'online';
    }
    
    if (!error) {
      cachedStatus = 'online';
      return 'online';
    }

    const { error: authError } = await supabase.auth.getSession();
    
    if (!authError) {
      cachedStatus = 'online';
      return 'online';
    }

    if (authError.message.includes('429') || authError.message.includes('Too Many')) {
      cachedStatus = 'offline';
      return 'offline';
    }

    cachedStatus = 'online';
    return 'online';
  } catch {
    cachedStatus = 'offline';
    return 'offline';
  }
}

export function getSupabaseStatus(): 'online' | 'offline' | 'unknown' {
  return cachedStatus;
}