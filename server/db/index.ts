import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"

import { env } from "../config/env"
import logger from "../utils/logger"
import * as schema from "./schema"

const { Pool } = pg

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })

const result = await db.execute("select 1")

logger.info("pg connected")
