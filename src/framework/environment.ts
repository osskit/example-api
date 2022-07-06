import env from 'env-var';

export const nodeEnv = env.get('NODE_ENV').required().asString();
export const serviceName = env.get('SERVICE_NAME').required().asString();
export const port = env.get('PORT').default(3000).asPortNumber();
export const mongoUri = env.get('MONGO_URI').required().asString();
export const mongoDb = env.get('MONGO_DB_NAME').required().asString();
