// src/lib/utils/debug.ts - Production Safe Debug Logger

// Enable debug logging in development only
export const isDev = process.env.NODE_ENV === 'development';

// Debug verbosity levels
type DebugLevel = 'info' | 'warn' | 'error';

// Optional categories to organize logs
type DebugCategory = 'image' | 'video' | 'pdf' | 'general';

// Debug configuration interface
type DebugConfig = {
  enabled: boolean;
  level: DebugLevel;
  category?: DebugCategory;
};

// Default config — can be customized per use
const defaultConfig: DebugConfig = {
  enabled: isDev,
  level: 'info',
};

// Core logger
const debug = {
  info: (msg: string, data?: unknown, config: DebugConfig = defaultConfig) => {
    if (isDev && config.enabled && (config.level === 'info')) {
      console.info(`[INFO] ${config.category || 'app'}: ${msg}`, data ?? '');
    }
  },

  warn: (msg: string, data?: unknown, config: DebugConfig = defaultConfig) => {
    if (isDev && config.enabled && ['info', 'warn'].includes(config.level)) {
      console.warn(`[WARN] ${config.category || 'app'}: ${msg}`, data ?? '');
    }
  },

  error: (msg: string, data?: unknown, config: DebugConfig = defaultConfig) => {
    if (isDev && config.enabled) {
      console.error(`[ERROR] ${config.category || 'app'}: ${msg}`, data ?? '');
    }
  },
};

export default debug;
export type { DebugLevel, DebugCategory, DebugConfig };
