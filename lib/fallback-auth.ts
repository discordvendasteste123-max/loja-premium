import type { User } from '@/types';

export interface FallbackUser extends User {
  createdAt: number;
}

export class FallbackAuth {
  private static STORAGE_KEY = 'nexus_fallback_users';

  static getUsers(): FallbackUser[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveUsers(users: FallbackUser[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  static createUser(username: string, password: string): FallbackUser {
    return {
      id: crypto.randomUUID(),
      email: `${username}@nexus.local`,
      createdAt: Date.now(),
      user_metadata: { username },
    };
  }

  static hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return btoa(hash.toString() + password.split('').reverse().join(''));
  }

  static findUser(username: string): FallbackUser | undefined {
    return this.getUsers().find(u => 
      u.email.startsWith(`${username}@`)
    );
  }

  static verifyPassword(storedHash: string, password: string): boolean {
    const testHash = this.hashPassword(password);
    return storedHash === testHash;
  }
}

export function exportFallbackUsers(): string {
  const users = FallbackAuth.getUsers();
  return JSON.stringify(users, null, 2);
}

export function importFallbackUsers(jsonData: string): number {
  try {
    const users = JSON.parse(jsonData) as FallbackUser[];
    const current = FallbackAuth.getUsers();
    const existingIds = new Set(current.map(u => u.id));
    const newUsers = users.filter(u => !existingIds.has(u.id));
    
    FallbackAuth.saveUsers([...current, ...newUsers]);
    return newUsers.length;
  } catch {
    return 0;
  }
}