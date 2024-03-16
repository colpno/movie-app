export const userKeys = {
  detail: ['user'] as const,
  tokens: () => [...userKeys.detail, 'token'] as const,
  apiToken: () => [...userKeys.tokens(), 'api'] as const,
  update: () => [...userKeys.detail, 'create'] as const,
  delete: () => [...userKeys.detail, 'delete'] as const,
};
