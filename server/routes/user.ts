import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { getCookie } from "hono/cookie"

import { db } from "../db"
import { users } from "../db/schema"
import { authMiddleware } from "../middleware/auth"
import type { AuthVariables } from "../middleware/auth"
import { redisClient } from "../redis"

const app = new Hono<AuthVariables>()
  .use("/*", authMiddleware)
  .get("/profile", async (c) => {
    const userId = c.get("userId")
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, Number.parseInt(userId)),
      columns: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    })

    if (!user) {
      return c.json({ message: "User not found" }, 404)
    }

    return c.json(user)
  })
  .delete("/account", async (c) => {
    const userId = c.get("userId")

    await db.delete(users).where(eq(users.id, Number.parseInt(userId)))

    const sessionId = getCookie(c, "sessionId")
    if (sessionId) {
      await redisClient.del(`session:${sessionId}`)
    }

    return c.json({ message: "Account deleted successfully" })
  })

export default app
