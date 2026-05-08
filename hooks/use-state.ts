'use client';

import { useState, useCallback } from 'react';
import type { LoadingState } from '@/types/app';

interface UseAsyncStateReturn<T> {
  data: T | null;
  error: string | null;
  status: LoadingState;
  execute: () => Promise<void>;
  reset: () => void;
}

export function useAsyncState<T>(
  asyncFn: () => Promise<T>,
  initialValue: T | null = null
): UseAsyncStateReturn<T> {
  const [data, setData] = useState<T | null>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');

  const execute = useCallback(async () => {
    setStatus('pending');
    setError(null);

    try {
      const result = await asyncFn();
      setData(result);
      setStatus('succeeded');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus('failed');
    }
  }, [asyncFn]);

  const reset = useCallback(() => {
    setData(initialValue);
    setError(null);
    setStatus('idle');
  }, [initialValue]);

  return { data, error, status, execute, reset };
}