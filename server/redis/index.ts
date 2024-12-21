import { env } from '../config/env';
import { createClient } from 'redis';

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.connect().catch(console.error);

export { redisClient };
