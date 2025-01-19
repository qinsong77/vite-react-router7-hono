import { createClient } from 'redis'

import { env } from '../config/env'

const redisClient = createClient({
  url: env.REDIS_URL,
})

redisClient.connect().catch(console.error)

export { redisClient }
