import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
    }),
    JWT_SECRET: str(),
    PORT: port({ default: 8000 }),
    MONGO_URI: str(),
    // FRONTEND_URL: str(),
  });
}

export default validateEnv;
