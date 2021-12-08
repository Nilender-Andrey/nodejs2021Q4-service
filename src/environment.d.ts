declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      AUTH_MODE: boolean;
      JWT_SECRET_KEY?: 'string';
      MONGO_CONNECTION_STRING?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
