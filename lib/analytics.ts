// lib/analytics.ts
// Sistema de analytics respeitando privacidade (GDPR compliant)

import posthog from 'posthog-js';

// Inicializar apenas no cliente
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    
    // Configurações de privacidade
    autocapture: false, // Não capturar clicks automaticamente
    capture_pageview: false, // Vamos capturar manualmente
    disable_session_recording: false,
    
    // Configurações técnicas
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        posthog.debug(); // Debug apenas em dev
      }
    },
  });
}

export const analytics = {
  // Identificar usuário
  identify: (userId: string, traits?: Record<string, any>) => {
    if (typeof window === 'undefined') return;
    posthog.identify(userId, traits);
  },

  // Rastrear evento
  track: (eventName: string, properties?: Record<string, any>) => {
    if (typeof window === 'undefined') return;
    posthog.capture(eventName, properties);
  },

  // Eventos específicos da aplicação
  page: {
    view: (pageName: string, properties?: Record<string, any>) => {
      analytics.track('Page Viewed', { page: pageName, ...properties });
    },
  },

  auth: {
    login: (userId: string, method: 'email' | 'social') => {
      analytics.identify(userId);
      analytics.track('User Logged In', { method });
    },

    register: (userId: string) => {
      analytics.identify(userId);
      analytics.track('User Registered');
    },

    logout: () => {
      analytics.track('User Logged Out');
      posthog.reset(); // Limpar identificação
    },
  },

  payment: {
    initiated: (amount: number, plan: string) => {
      analytics.track('Payment Initiated', { amount, plan });
    },

    completed: (amount: number, plan: string, paymentId: string) => {
      analytics.track('Payment Completed', { amount, plan, paymentId });
    },

    failed: (reason: string) => {
      analytics.track('Payment Failed', { reason });
    },
  },

  content: {
    videoStarted: (videoId: string, videoTitle: string) => {
      analytics.track('Video Started', { videoId, videoTitle });
    },

    videoCompleted: (videoId: string, videoTitle: string, duration: number) => {
      analytics.track('Video Completed', { videoId, videoTitle, duration });
    },

    videoProgress: (videoId: string, progress: number) => {
      // Rastrear marcos: 25%, 50%, 75%
      if ([25, 50, 75].includes(progress)) {
        analytics.track('Video Progress', { videoId, progress });
      }
    },
  },

  // Desligar tracking (GDPR)
  optOut: () => {
    if (typeof window === 'undefined') return;
    posthog.opt_out_capturing();
  },

  // Religar tracking
  optIn: () => {
    if (typeof window === 'undefined') return;
    posthog.opt_in_capturing();
  },
};

export default analytics;