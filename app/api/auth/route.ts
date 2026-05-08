'use server';

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

interface User {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: number;
}

interface DataStore {
  users: User[];
}

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const store: DataStore = JSON.parse(data);
    return store.users;
  } catch {
    return [];
  }
}

async function saveUsers(users: User[]): Promise<void> {
  const store: DataStore = { users };
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2));
}

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return btoa(hash.toString() + password.split('').reverse().join(''));
}

function generateId(): string {
  return crypto.randomUUID();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuário e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Usuário deve ter pelo menos 3 caracteres' },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { error: 'Senha deve ter pelo menos 4 caracteres' },
        { status: 400 }
      );
    }

    const users = await readUsers();
    const existingUser = users.find(u => u.username === username);

    if (action === 'login') {
      if (!existingUser) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }

      const inputHash = hashPassword(password);
      if (inputHash !== existingUser.passwordHash) {
        return NextResponse.json(
          { error: 'Senha incorreta' },
          { status: 401 }
        );
      }

      const token = generateId();
      return NextResponse.json({
        success: true,
        user: { id: existingUser.id, username: existingUser.username },
        token
      });
    }

    if (action === 'register') {
      if (existingUser) {
        return NextResponse.json(
          { error: 'Usuário já existe' },
          { status: 409 }
        );
      }

      const newUser: User = {
        id: generateId(),
        username,
        passwordHash: hashPassword(password),
        createdAt: Date.now()
      };

      users.push(newUser);
      await saveUsers(users);

      const token = generateId();
      return NextResponse.json({
        success: true,
        user: { id: newUser.id, username: newUser.username },
        token
      });
    }

    return NextResponse.json(
      { error: 'Ação inválida' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}