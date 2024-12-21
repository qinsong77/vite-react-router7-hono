import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"

import { redisClient } from "../redis"

export type AuthVariables = {
  Variables: {
    userId: string
  }
}

export const authMiddleware = createMiddleware<AuthVariables>(
  async (c, next) => {
    const sessionId = getCookie(c, "sessionId")

    if (!sessionId) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    const userId = await redisClient.get(`session:${sessionId}`)
    if (!userId) {
      return c.json({ message: "Unauthorized" }, 401)
    }

    c.set("userId", userId)
    await next()
  }
)
