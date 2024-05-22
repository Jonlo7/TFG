
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    PORT: string;
    LOG_LEVEL: string;
    API_SESSION_SECRET: string;
    MYSQL_HOST: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_PORT: string;

    ENCRYPT_SALT_ROUNDS: string;
    PLC_LOGIN_USER: string
    PLC_LOGIN_PASSWORD: string;
  }
}