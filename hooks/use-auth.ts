'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase/client';
import { FallbackAuth, type FallbackUser } from '@/lib/fallback-auth';
import type { User } from '@/types';

function createFallbackUser(username: string): User {
  const fallbackUser: FallbackUser = FallbackAuth.createUser(username, '');
  return fallbackUser as User;
}

function getFallbackUsers(): FallbackUser[] {
  return FallbackAuth.getUsers();
}

function findFallbackUser(username: string): FallbackUser | undefined {
  return FallbackAuth.getUsers().find(u => 
    u.email.startsWith(`${username}@`)
  );
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [fallbackPasswords, setFallbackPasswords] = useState<Record<string, string>>({});

  useEffect(() => {
    checkAndSetUser();
  }, []);

  const checkAndSetUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        setUsingFallback(false);
      } else {
        const stored = sessionStorage.getItem('nexus_fallback_session');
        if (stored) {
          const fallbackSession = JSON.parse(stored);
          const foundUser = findFallbackUser(fallbackSession.username);
          if (foundUser) {
            setUser(foundUser);
            setUsingFallback(true);
          }
        }
      }
    } catch {
      const stored = sessionStorage.getItem('nexus_fallback_session');
      if (stored) {
        const fallbackSession = JSON.parse(stored);
        const foundUser = findFallbackUser(fallbackSession.username);
        if (foundUser) {
          setUser(foundUser);
          setUsingFallback(true);
        }
      }
    } finally {
      setLoading(false);
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setUsingFallback(false);
    });
  };

  const signIn = useCallback(async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${username}@placeholder.local`,
        password,
      });

      if (!error && data.user) {
        return { data, error };
      }

      const foundUser = findFallbackUser(username);
      const storedPassword = fallbackPasswords[username];

      if (foundUser && storedPassword === FallbackAuth.hashPassword(password)) {
        sessionStorage.setItem('nexus_fallback_session', JSON.stringify({ username }));
        setUser(foundUser);
        setUsingFallback(true);
        return { data: { user: foundUser }, error: null };
      }

      return { data: null, error: error || { message: 'Credenciais inválidas' } };
    } catch (err: unknown) {
      const foundUser = findFallbackUser(username);
      const storedPassword = fallbackPasswords[username];

      if (foundUser && storedPassword === FallbackAuth.hashPassword(password)) {
        sessionStorage.setItem('nexus_fallback_session', JSON.stringify({ username }));
        setUser(foundUser);
        setUsingFallback(true);
        return { data: { user: foundUser }, error: null };
      }

      return { data: null, error: { message: 'Credenciais inválidas' } };
    }
  }, [fallbackPasswords]);

  const signUp = useCallback(async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email: `${username}@placeholder.local`,
        password,
      });

      if (!error && data.user) {
        return { data, error };
      }

      const existing = findFallbackUser(username);
      if (existing) {
        return { data: null, error: { message: 'Usuário já cadastrado' } };
      }

      const newUser = FallbackAuth.createUser(username, password);
      const hashedPwd = FallbackAuth.hashPassword(password);
      
      const users = FallbackAuth.getUsers();
      const userWithPassword: FallbackUser = { ...newUser, passwordHash: hashedPwd };
      FallbackAuth.saveUsers([...users, userWithPassword]);
      
      setFallbackPasswords(prev => ({ ...prev, [username]: hashedPwd }));
      
      sessionStorage.setItem('nexus_fallback_session', JSON.stringify({ username }));
      setUser(newUser);
      setUsingFallback(true);
      
      return { data: { user: newUser }, error: null };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      if (errorMessage.includes('429') || errorMessage.includes('Too Many')) {
        const existing = findFallbackUser(username);
        if (existing) {
          return { data: null, error: { message: 'Usuário já cadastrado' } };
        }

        const newUser = FallbackAuth.createUser(username, password);
        const hashedPwd = FallbackAuth.hashPassword(password);
        
        const users = FallbackAuth.getUsers();
        const userWithPassword: FallbackUser = { ...newUser, passwordHash: hashedPwd };
        FallbackAuth.saveUsers([...users, userWithPassword]);
        
        setFallbackPasswords(prev => ({ ...prev, [username]: hashedPwd }));
        
        sessionStorage.setItem('nexus_fallback_session', JSON.stringify({ username }));
        setUser(newUser);
        setUsingFallback(true);
        
        return { data: { user: newUser }, error: null };
      }
      
      return { data: null, error: { message: errorMessage } };
    }
  }, []);

  const signOut = useCallback(async () => {
    if (usingFallback) {
      sessionStorage.removeItem('nexus_fallback_session');
      setUser(null);
      setUsingFallback(false);
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  }, [usingFallback]);

  return { 
    user, 
    loading, 
    signIn, 
    signUp, 
    signOut,
    usingFallback 
  };
}

export type useAuthReturn = ReturnType<typeof useAuth>;