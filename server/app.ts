import { type Context, Hono } from "hono"
import { getCookie } from "hono/cookie"
// import { logger } from "hono/logger"
import { requestId } from "hono/request-id"
import type { RequestIdVariables } from "hono/request-id"

// import { authMiddleware } from "~server/middleware/auth"

import { createReactRouterMiddleware } from "./createReactRouterMiddleware"
import auth from "./routes/auth"
import authors from "./routes/authors"
import books from "./routes/books"
import user from "./routes/user"

declare module "react-router" {
  interface AppLoadContext {
    requestId: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Bindings = {}

type Variables = {} & RequestIdVariables

const app = new Hono<{
  Bindings: Bindings
  Variables: Variables
}>()

app.use("*", requestId())
// app.use(logger())

// access the url directly will receive 401, but click the menu can access
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

export type AppType = typeof routes

const reactRouterMiddleware = createReactRouterMiddleware({
  // @ts-expect-error - virtual module provided by React Router at build time
  build: () => import("virtual:react-router/server-build"),
  mode: process.env.NODE_ENV,
  getLoadContext(c: Context<{ Bindings: Bindings; Variables: Variables }>) {
    const sessionId = getCookie(c, "sessionId")
    console.log(121)
    console.log(sessionId)
    return {
      requestId: c.get("requestId"),
    }
  },
})

export { app, reactRouterMiddleware }
