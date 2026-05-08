'use client';

import { useState } from 'react';
import { supabase } from '@/supabase/client';

export function useDatabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = async <T>(table: string, filter?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    
    let query = supabase.from(table).select('*');
    
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    const { data, error } = await query;
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
      return { data: null, error };
    }
    
    return { data: data as T[], error: null };
  };

  const insert = async <T>(table: string, data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
      return { data: null, error };
    }
    
    return { data: result as T, error: null };
  };

  const update = async <T>(table: string, id: string, data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
      return { data: null, error };
    }
    
    return { data: result as T, error: null };
  };

  const remove = async (table: string, id: string) => {
    setLoading(true);
    setError(null);
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    setLoading(false);
    
    if (error) {
      setError(error.message);
      return { error };
    }
    
    return { error: null };
  };

  return { query, insert, update, remove, loading, error };
}