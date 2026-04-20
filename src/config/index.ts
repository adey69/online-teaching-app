import {
  AGORA_APP_ID,
  AGORA_APP_CERTIFICATE,
  WHITEBOARD_APP_IDENTIFIER,
  WHITEBOARD_SDK_TOKEN,
  WHITEBOARD_REGION,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  APP_ENV,
  APP_NAME,
} from '@env';

export const Config = {
  agora: {
    appId: AGORA_APP_ID,
    appCertificate: AGORA_APP_CERTIFICATE,
  },
  whiteboard: {
    appIdentifier: WHITEBOARD_APP_IDENTIFIER,
    sdkToken: WHITEBOARD_SDK_TOKEN,
    region: WHITEBOARD_REGION,
  },
  supabase: {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
  },
  app: {
    env: APP_ENV,
    name: APP_NAME,
    isDevelopment: APP_ENV === 'development',
    isProduction: APP_ENV === 'production',
  },
} as const;
