export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      BACKEND_URI: string;
      BACKEND_PORT: string;
    }
  }
}
