import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"

import type { User } from "~server/db/schema"
import type { AuthAppType } from "~server/type/hono-app"

import { redisClient } from "../redis"

export const authMiddleware = createMiddleware<AuthAppType>(async (c, next) => {
  const sessionId = getCookie(c, "sessionId")

  if (!sessionId) {
    return c.json({ message: "Unauthorized" }, 401)
  }

  const cache = await redisClient.get(`session:${sessionId}`)
  if (!cache) {
    return c.json({ message: "Unauthorized" }, 401)
  }

  const userInfo = JSON.parse(cache) as User
  c.set("userInfo", userInfo)
  await next()
})
