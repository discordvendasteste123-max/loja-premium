export const appConfig = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  
  apiTimeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  
  features: {
    enableGoogleAuth: true,
    enableGitHubAuth: true,
    enableMagicLink: false,
    enable2FA: false,
  },
  
  ui: {
    theme: 'dark' as const,
    primaryColor: '#89CFF0',
    maxInputLength: 255,
    minPasswordLength: 8,
  },
};