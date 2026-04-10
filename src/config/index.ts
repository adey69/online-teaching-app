import { AGORA_APP_ID, AGORA_APP_CERTIFICATE, APP_ENV, APP_NAME } from '@env';

export const Config = {
  agora: {
    appId: AGORA_APP_ID,
    appCertificate: AGORA_APP_CERTIFICATE,
  },
  app: {
    env: APP_ENV,
    name: APP_NAME,
    isDevelopment: APP_ENV === 'development',
    isProduction: APP_ENV === 'production',
  },
} as const;
