import { Hono } from "hono"
import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"
import { logger } from "hono/logger"
import { requestId } from "hono/request-id"
import type { ServerBuild } from "react-router"
import { createRequestHandler } from "react-router"

import type { User } from "~server/db/schema"
import { redisClient } from "~server/redis"
import type { AppType } from "~server/type/hono-app"

// import { authMiddleware } from "~server/middleware/auth"

import auth from "./routes/auth"
import authors from "./routes/authors"
import books from "./routes/books"
import user from "./routes/user"

const app = new Hono<AppType>()

app.use("*", requestId())
app.use("/api", logger())

// access the url directly will receive 401, but click the Menu on page, it can access
// app.use("/about", authMiddleware)

// refer: https://hono.dev/docs/guides/rpc#using-rpc-with-larger-applications
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .basePath("/api")
  .route("/auth", auth)
  .route("/user", user)
  .route("/authors", authors)
  .route("/books", books)
  .get("/randomnumberapi", async (c) => {
    const res = await fetch(
      "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5"
    )
    const data = (await res.json()) as number[]
    return c.json(data)
  })

declare module "react-router" {
  interface AppLoadContext {
    requestId: string
    userInfo: Omit<User, "passwordHash"> | null
  }
}

const reactRouterMiddleware = createMiddleware<AppType>(async (c) => {
  // @ts-expect-error - virtual module provided by React Router at build time
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const build: ServerBuild = await import("virtual:react-router/server-build")
  const requestHandler = createRequestHandler(build, process.env.NODE_ENV)

  const sessionId = getCookie(c, "sessionId")

  let userInfo: Omit<User, "passwordHash"> | null = null

  if (sessionId) {
    const cacheStr = await redisClient.get(`session:${sessionId}`)

    if (cacheStr) {
      try {
        userInfo = JSON.parse(cacheStr) as User
      } catch (e) {
        console.error(e)
      }
    }
  }
  return await requestHandler(c.req.raw, {
    requestId: c.get("requestId"),
    userInfo,
  })
})

export { app, reactRouterMiddleware }

export type AppClientType = typeof routes
