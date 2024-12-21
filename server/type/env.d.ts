declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      REDIS_URL: string
      PORT: string
      SESSION_SECRET: string
      SESSION_EXPIRES: string
      NODE_ENV: "development" | "production"
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
