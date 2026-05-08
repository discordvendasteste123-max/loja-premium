export interface User {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
    [key: string]: unknown;
  };
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface AsyncState<T> {
  data: T | null;
  error: string | null;
  status: LoadingState;
}