'use client';

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types';

interface AuthUser {
  id: string;
  username: string;
}

const SESSION_KEY = 'nexus_session';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      const session = JSON.parse(stored);
      setUser({
        id: session.id,
        email: `${session.username}@nexus.local`,
        user_metadata: { username: session.username }
      });
    }
    setLoading(false);
  };

  const signIn = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data.error } };
      }

      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        id: data.user.id,
        username: data.user.username,
        token: data.token
      }));

      setUser({
        id: data.user.id,
        email: `${data.user.username}@nexus.local`,
        user_metadata: { username: data.user.username }
      });

      return { data: { user: data.user }, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Erro de conexão' } };
    }
  }, []);

  const signUp = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: data.error } };
      }

      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        id: data.user.id,
        username: data.user.username,
        token: data.token
      }));

      setUser({
        id: data.user.id,
        email: `${data.user.username}@nexus.local`,
        user_metadata: { username: data.user.username }
      });

      return { data: { user: data.user }, error: null };
    } catch (error) {
      return { data: null, error: { message: 'Erro de conexão' } };
    }
  }, []);

  const signOut = useCallback(async () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
    return { error: null };
  }, []);

  return { user, loading, signIn, signUp, signOut };
}

export type useAuthReturn = ReturnType<typeof useAuth>;