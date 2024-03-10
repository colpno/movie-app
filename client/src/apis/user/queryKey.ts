export const userKeys = {
  detail: ['user'] as const,
  tokens: ['token'] as const,
  apiToken: () => [...userKeys.tokens, 'api'] as const,
};
