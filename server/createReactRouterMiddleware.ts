import type { Context } from "hono"
import { createMiddleware } from "hono/factory"
import type { AppLoadContext, ServerBuild } from "react-router"
import { createRequestHandler } from "react-router"

export interface ReactRouterMiddlewareOptions {
  build: ServerBuild
  mode?: "development" | "production"
  getLoadContext?(c: Context): Promise<AppLoadContext> | AppLoadContext
}

/**
 * this middleware must be the last
 * refer: https://github.com/sergiodxa/remix-hono/blob/main/src/handler.ts
 */
export function createReactRouterMiddleware({
  mode,
  build,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  getLoadContext = (c) => c.env as unknown as AppLoadContext,
}: ReactRouterMiddlewareOptions) {
  return createMiddleware(async (c) => {
    const requestHandler = createRequestHandler(build, mode)
    const loadContext = getLoadContext(c)
    return await requestHandler(
      c.req.raw,
      loadContext instanceof Promise ? await loadContext : loadContext
    )
  })
}
