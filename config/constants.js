import path from 'app-root-path';
import dotEnv from 'dotenv';
dotEnv.config();

const DEFAULT_PORT = 4000;

export const PORT = Number(process.env.PORT) || DEFAULT_PORT;

export const PROJECT_DIRECTORY = path.path;
